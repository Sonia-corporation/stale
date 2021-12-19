import { IssueProcessor } from '@core/issues/issue-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';

export abstract class AbstractGithubApiTimelineItemsService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }
}
