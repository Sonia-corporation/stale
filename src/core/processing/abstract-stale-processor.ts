import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { AbstractProcessor } from '@utils/processors/abstract-processor';
import { IUuid } from '@utils/types/uuid';
import _ from 'lodash';
import { DateTime } from 'luxon';

export abstract class AbstractStaleProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  public shouldStale(): boolean {
    this.processor.logger.info(`Checking if the ${this.type} should be stale...`);

    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    // This is important to add the extra information
    // Like comments and labels
    // Before adding the stale label
    // Because the stale label will be used as a reference in comparison with the update date
    // If an alteration is added after being labeled as stale, the update date will be more recent
    // And the next run will consider the item as no longer stale
    await this._processStaleComment();
    await this.processToAddExtraLabels$$();

    this.processor.logger.info(`Adding the stale state to this ${this.type}...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const staleLabel: string = this._getStaleLabel();

    this.processor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(staleLabel),
      LoggerFormatService.whiteBright(`to add on this ${this.type}...`)
    );

    const label: IGithubApiLabel | null = await this._fetchLabelByName(staleLabel);

    if (!label) {
      this.processor.logger.error(`Could not find the stale label`, LoggerService.value(staleLabel));
      AnnotationsService.error(EAnnotationError.NOT_FOUND_STALE_LABEL);

      throw new Error(`Could not find the stale label ${staleLabel}`);
    }

    this.processor.logger.info(`The stale label was fetched`);
    this.processor.logger.info(`Adding the stale label to this ${this.type}...`);

    if (!commonInputs.dryRun) {
      await this._addLabel(this._getItemId(), label.id);

      this.processor.logger.info(`The stale label was added`);
    } else {
      this.processor.logger.info(`The stale label was not added due to the dry-run mode`);
    }

    this._increaseAddedLabelsCountStatistic();
    this.processor.logger.notice(`The ${this.type} is now stale`);
  }

  public isStaleByUpdateDate$$(): boolean {
    this.processor.logger.info(`Checking if the ${this.type} should be stale based on the update date...`);

    const updatedAt: DateTime = this.processor.getUpdatedAt();
    const numberOfDaysBeforeStale: number = this._getDaysBeforeStale();

    this.processor.logger.info(`The ${this.type} was updated for the last time the`, LoggerService.date(updatedAt));

    const daysDifference: number = _.round(
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days,
      1
    );
    const isStale: boolean = daysDifference > numberOfDaysBeforeStale;

    if (isStale) {
      this.processor.logger.info(
        `The ${this.type} should be stale since it was not updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    } else {
      this.processor.logger.info(
        `The ${this.type} should not be stale since it was updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    }

    this.processor.logger.debug(
      `The difference is`,
      LoggerService.value(_.toString(daysDifference)),
      LoggerFormatService.whiteBright(`day${daysDifference > 1 ? `s` : ``}`)
    );

    return isStale;
  }

  public async processToAddExtraLabels$$(): Promise<void> {
    this.processor.logger.info(`Checking if more labels should be added...`);

    const labelsToAdd: string[] = this._getExtraLabelsName();

    if (labelsToAdd.length === 0) {
      this.processor.logger.info(`No extra label to add. Continuing...`);

      return;
    }

    this.processor.logger.info(
      LoggerService.value(labelsToAdd.length),
      LoggerFormatService.whiteBright(`label${labelsToAdd.length > 1 ? `s` : ``} should be added`)
    );
    this.processor.logger.info(
      `Fetching the extra label${labelsToAdd.length > 1 ? `s` : ``}`,
      LoggerService.value(_.join(labelsToAdd, `, `)),
      LoggerFormatService.whiteBright(`to add on this ${this.type}...`)
    );

    const labels: IGithubApiLabel[] = await this._fetchLabels(labelsToAdd);
    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();

    if (!commonInputs.dryRun) {
      await this._addExtraLabels(this._getItemId(), this._getLabelsId(labels));

      this.processor.logger.notice(
        LoggerService.value(labelsToAdd.length),
        LoggerFormatService.whiteBright(`extra label${labelsToAdd.length > 1 ? `s` : ``} added`)
      );
    } else {
      this.processor.logger.info(
        `The extra label${labelsToAdd.length > 1 ? `s were` : ` was`} not added due to the dry-run mode`
      );
    }

    this._increaseAddedLabelsCountStatistic(labels.length);
  }

  private _fetchLabels(labelsName: ReadonlyArray<string>): Promise<IGithubApiLabel[]> {
    return Promise.all(
      labelsName.map(async (labelName: Readonly<string>): Promise<IGithubApiLabel> => await this._fetchLabel(labelName))
    );
  }

  private _getLabelsId(labels: ReadonlyArray<IGithubApiLabel>): IUuid[] {
    return labels.map((label: Readonly<IGithubApiLabel>): IUuid => label.id);
  }

  private async _fetchLabel(labelName: Readonly<string>): Promise<IGithubApiLabel> | never {
    const label: IGithubApiLabel | null = await this._fetchLabelByName(labelName);

    if (!label) {
      this.processor.logger.error(`Could not find the label`, LoggerService.value(labelName));
      AnnotationsService.error(EAnnotationError.NOT_FOUND_LABEL);

      throw new Error(`Could not find the label ${labelName}`);
    }

    this.processor.logger.info(
      `The label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`was fetched`)
    );

    return label;
  }

  protected abstract _getDaysBeforeStale(): number;

  protected abstract _getStaleLabel(): string;

  protected abstract _getItemId(): IUuid;

  protected abstract _addLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void>;

  protected abstract _processStaleComment(): Promise<void>;

  protected abstract _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null>;

  protected abstract _getExtraLabelsName(): string[];

  protected abstract _addExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void>;

  protected abstract _increaseAddedLabelsCountStatistic(count?: Readonly<number>): void;
}
