import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { AbstractGithubApiReferencesService } from '@github/api/references/abstract-github-api-references.service';

export class GithubApiPullRequestReferencesService extends AbstractGithubApiReferencesService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  protected _increaseCalledApiMutationsCount(): void {
    PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsMutationsCount();
  }
}
