import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { AbstractGithubApiCommentsService } from '@github/api/comments/abstract-github-api-comments.service';

export class GithubApiPullRequestCommentsService extends AbstractGithubApiCommentsService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  protected _increaseCalledApiMutationsCount(): void {
    PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsMutationsCount();
  }
}
