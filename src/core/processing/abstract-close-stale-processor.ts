import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IUuid } from '@utils/types/uuid';

export abstract class AbstractCloseStaleProcessor<TProcessor extends IssueProcessor | PullRequestProcessor> {
  public readonly processor: TProcessor;
  public readonly type: 'issue' | 'pull request';

  protected constructor(processor: Readonly<TProcessor>) {
    this.processor = processor;
    this.type = this.processor.type;
  }

  public async close(): Promise<void> {
    this.processor.logger.info(`Closing this ${this.type}...`);

    if (!CommonInputsService.getInstance().getInputs().dryRun) {
      await this._closeItem(this._getItemId());
      this.processor.logger.info(`The ${this.type} was closed`);
    } else {
      this.processor.logger.info(`The ${this.type} was not closed due to the dry-run mode`);
    }

    await this._processCloseComment();

    this.processor.logger.notice(`The ${this.type} is now closed`);
  }

  protected abstract _closeItem(itemId: Readonly<IUuid>): Promise<void>;

  protected abstract _getItemId(): IUuid;

  protected abstract _processCloseComment(): Promise<void>;
}
