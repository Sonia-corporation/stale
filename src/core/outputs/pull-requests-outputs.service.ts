import { EPullRequestsOutputs } from '@core/outputs/enums/pull-requests-outputs.enum';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class PullRequestsOutputsService {
  public static setOutputs(): PullRequestsOutputsService {
    LoggerService.info(`Creating the pull requests outputs...`);

    core.setOutput(
      EPullRequestsOutputs.ALREADY_STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.alreadyStalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.IGNORED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.ignoredPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.UNALTERED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.unalteredPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.stalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.PROCESSED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.processedPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.REMOVE_STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.removeStalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.CLOSE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.closedPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.ADDED_PULL_REQUESTS_COMMENTS_COUNT,
      PullRequestsStatisticsService.addedPullRequestsCommentsCount$$
    );

    LoggerService.info(`Pull requests outputs created`);

    return PullRequestsOutputsService;
  }
}
