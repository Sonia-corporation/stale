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

export abstract class AbstractExtraLabelsProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  public async processToAddExtraLabels$$(): Promise<void> {
    this.processor.logger.info(`Checking if more labels should be added...`);

    const labelsToAdd: string[] = this._getExtraLabelsToAddName();

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

      this.processor.logger.info(
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

  public async processToRemoveExtraLabels$$(): Promise<void> {
    this.processor.logger.info(`Checking if more labels should be removed...`);

    const labelsToRemove: string[] = this._getExtraLabelsToRemoveName();

    if (labelsToRemove.length === 0) {
      this.processor.logger.info(`No extra label to remove. Continuing...`);

      return;
    }

    this.processor.logger.info(
      LoggerService.value(labelsToRemove.length),
      LoggerFormatService.whiteBright(`label${labelsToRemove.length > 1 ? `s` : ``} should be removed`)
    );
    this.processor.logger.info(
      `Fetching the extra label${labelsToRemove.length > 1 ? `s` : ``}`,
      LoggerService.value(_.join(labelsToRemove, `, `)),
      LoggerFormatService.whiteBright(`to remove on this ${this.type}...`)
    );

    const labels: IGithubApiLabel[] = await this._fetchLabels(labelsToRemove);
    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();

    if (!commonInputs.dryRun) {
      await this._removeExtraLabels(this._getItemId(), this._getLabelsId(labels));

      this.processor.logger.info(
        LoggerService.value(labelsToRemove.length),
        LoggerFormatService.whiteBright(`extra label${labelsToRemove.length > 1 ? `s` : ``} removed`)
      );
    } else {
      this.processor.logger.info(
        `The extra label${labelsToRemove.length > 1 ? `s were` : ` was`} not removed due to the dry-run mode`
      );
    }

    this._increaseRemovedLabelsCountStatistic(labels.length);
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
      AnnotationsService.error(EAnnotationError.NOT_FOUND_LABEL, {
        file: `abstract-extra-labels-processor.ts`,
        startLine: 72,
        title: `Error`,
      });

      throw new Error(`Could not find the label ${labelName}`);
    }

    this.processor.logger.info(
      `The label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`was fetched`)
    );

    return label;
  }

  protected abstract _getItemId(): IUuid;

  protected abstract _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null>;

  protected abstract _getExtraLabelsToAddName(): string[];

  protected abstract _getExtraLabelsToRemoveName(): string[];

  protected abstract _addExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void>;

  protected abstract _removeExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void>;

  protected abstract _increaseAddedLabelsCountStatistic(count: Readonly<number>): void;

  protected abstract _increaseRemovedLabelsCountStatistic(count: Readonly<number>): void;
}
