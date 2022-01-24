import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { LoggerService } from '@utils/loggers/logger.service';
import { AbstractProcessor } from '@utils/processors/abstract-processor';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export abstract class AbstractCommentsProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  public async processStaleComment(): Promise<void> {
    this.processor.logger.info(`Checking if a stale comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const staleComment: IComment | '' = this._getStaleComment();

    if (staleComment === ``) {
      this.processor.logger.info(`The stale comment is unset. Continuing...`);

      return;
    }

    this.processor.logger.info(`The stale comment is set to`, LoggerService.value(staleComment));

    if (!commonInputs.dryRun) {
      this.processor.logger.info(`Adding the stale comment...`);

      await this._addComment(this._getItemId(), staleComment);
    }

    this._increaseAddedCommentsCountStatistic();
    this.processor.logger.notice(`Stale comment added`);
  }

  public async processCloseComment(): Promise<void> {
    this.processor.logger.info(`Checking if a close comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const closeComment: IComment | '' = this._getCloseComment();

    if (closeComment === ``) {
      this.processor.logger.info(`The close comment is unset. Continuing...`);

      return;
    }

    this.processor.logger.info(`The close comment is set to`, LoggerService.value(closeComment));

    if (!commonInputs.dryRun) {
      this.processor.logger.info(`Adding the close comment...`);

      await this._addComment(this._getItemId(), closeComment);
    }

    this._increaseAddedCommentsCountStatistic();
    this.processor.logger.notice(`Close comment added`);
  }

  protected abstract _getItemId(): IUuid;

  protected abstract _addComment(itemId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void>;

  protected abstract _getCloseComment(): IComment | '';

  protected abstract _getStaleComment(): IComment | '';

  protected abstract _increaseAddedCommentsCountStatistic(): void;
}
