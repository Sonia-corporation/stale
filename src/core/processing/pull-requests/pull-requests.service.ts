import { AbstractProcessingService } from '@core/processing/abstract-processing.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import _ from 'lodash';

export class PullRequestsService extends AbstractProcessingService<IGithubApiGetPullRequests> {
  private static _instance: PullRequestsService;

  public static getInstance(): PullRequestsService {
    if (_.isNil(PullRequestsService._instance)) {
      PullRequestsService._instance = new PullRequestsService();
    }

    return PullRequestsService._instance;
  }

  protected readonly _itemType: 'pull request' = `pull request`;

  protected _increaseProcessedItemsCount(): void {
    PullRequestsStatisticsService.getInstance().increaseProcessedPullRequestsCount();
  }

  protected _process(pullRequest: Readonly<IGithubApiPullRequest>): Promise<void> {
    return new PullRequestProcessor(pullRequest).process();
  }

  protected _getItems(fromPageId: Readonly<string | undefined>): Promise<IGithubApiGetPullRequests> {
    return GithubApiPullRequestsService.fetchPullRequests(fromPageId);
  }
}
