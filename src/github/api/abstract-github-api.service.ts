import { IssueProcessor } from '@core/issues/issue-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';

export class AbstractGithubApiService<TProcessor extends IssueProcessor | PullRequestProcessor> {
  public readonly processor: TProcessor;
  protected readonly _targetType: 'issue' | 'pull request';

  protected constructor(processor: Readonly<TProcessor>) {
    this.processor = processor;
    this._targetType = this.processor.type;
  }
}
