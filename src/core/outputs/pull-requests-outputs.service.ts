import { AbstractOutputsService } from '@core/outputs/abstract-outputs.service';
import { EPullRequestsOutputs } from '@core/outputs/enums/pull-requests-outputs.enum';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import * as core from '@actions/core';
import _ from 'lodash';

export class PullRequestsOutputsService extends AbstractOutputsService {
  private static _instance: PullRequestsOutputsService;

  public static getInstance(): PullRequestsOutputsService {
    if (_.isNil(PullRequestsOutputsService._instance)) {
      PullRequestsOutputsService._instance = new PullRequestsOutputsService();
    }

    return PullRequestsOutputsService._instance;
  }

  protected readonly _outputsName: 'pull requests' = `pull requests`;

  protected _setOutputs(): void {
    core.setOutput(
      EPullRequestsOutputs.ALREADY_STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.IGNORED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.UNALTERED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.PROCESSED_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.REMOVE_STALE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.CLOSE_PULL_REQUESTS_COUNT,
      PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.DELETED_PULL_REQUESTS_BRANCHES_COUNT,
      PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount$$
    );
    core.setOutput(
      EPullRequestsOutputs.ADDED_PULL_REQUESTS_COMMENTS_COUNT,
      PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$
    );
  }
}
