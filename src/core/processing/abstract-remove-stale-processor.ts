import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractProcessor } from '@utils/processors/abstract-processor';

export abstract class AbstractRemoveStaleProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor,
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }
}
