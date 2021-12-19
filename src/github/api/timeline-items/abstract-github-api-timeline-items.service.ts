import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';

export abstract class AbstractGithubApiTimelineItemsService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }
}
