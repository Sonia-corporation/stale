import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractProcessingService } from '@core/processing/abstract-processing.service';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
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

  public isProcessingEnabled$$(): boolean {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestProcessing) {
      LoggerService.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_PROCESSING),
        LoggerFormatService.whiteBright(`is disabled. Skipping the processing of pull requests...`)
      );

      return false;
    }

    LoggerService.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_PROCESSING),
      LoggerFormatService.whiteBright(`is enabled. Continuing...`)
    );

    return true;
  }

  public hasReachedQueriesLimit$$(): boolean {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    // If the option is above or equal to 0
    // Negative number is equivalent of disabling this feature
    if (pullRequestsInputs.pullRequestLimitApiQueriesCount >= 0) {
      return (
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount >
        pullRequestsInputs.pullRequestLimitApiQueriesCount
      );
    }

    return false;
  }

  protected _increaseProcessedItemsCount(): void {
    PullRequestsStatisticsService.getInstance().increaseProcessedPullRequestsCount();
  }

  protected _process(pullRequest: Readonly<IGithubApiPullRequest>): Promise<void> {
    return new PullRequestProcessor(pullRequest, new PullRequestLogger(pullRequest.number)).process();
  }

  protected _getItems(fromPageId: Readonly<string | undefined>): Promise<IGithubApiGetPullRequests> {
    return GithubApiPullRequestsService.fetchPullRequests(fromPageId);
  }
}
