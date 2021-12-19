import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';

export abstract class AbstractGithubApiService<TProcessor extends IssueProcessor | PullRequestProcessor> {
  public readonly processor: TProcessor;
  protected readonly _targetType: 'issue' | 'pull request';

  protected constructor(processor: Readonly<TProcessor>) {
    this.processor = processor;
    this._targetType = this.processor.type;
  }
}
