import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';

export abstract class AbstractProcessor<TProcessor extends IssueProcessor | PullRequestProcessor> {
  public readonly processor: TProcessor;
  public readonly type: 'issue' | 'pull request';

  protected constructor(processor: Readonly<TProcessor>) {
    this.processor = processor;
    this.type = this.processor.type;
  }
}
