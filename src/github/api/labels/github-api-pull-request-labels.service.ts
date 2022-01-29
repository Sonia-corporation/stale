import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { AbstractGithubApiLabelsService } from '@github/api/labels/abstract-github-api-labels.service';

export class GithubApiPullRequestLabelsService extends AbstractGithubApiLabelsService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  protected _increaseCalledApiMutationsCount(): void {
    PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsMutationsCount();
  }

  protected _increaseCalledApiQueriesCount(): void {
    PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsQueriesCount();
  }
}
