import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
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

    await this._processStaleComment();

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

  protected abstract _getDaysBeforeStale(): number;

  protected abstract _getStaleLabel(): string;

  protected abstract _getItemId(): IUuid;

  protected abstract _addLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void>;

  protected abstract _processStaleComment(): Promise<void>;

  protected abstract _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null>;
}
