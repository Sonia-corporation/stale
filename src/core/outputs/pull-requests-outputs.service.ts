import { AbstractOutputsService } from '@core/outputs/abstract-outputs.service';
import { EPullRequestsOutputs } from '@core/outputs/enums/pull-requests-outputs.enum';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { getEnumKeys } from '@utils/enums/get-enum-keys';
import * as core from '@actions/core';
import _ from 'lodash';

const OUTPUTS_MAP: { [key in keyof typeof EPullRequestsOutputs]: () => number } = {
  ADDED_PULL_REQUESTS_COMMENTS_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount,
  ADDED_PULL_REQUESTS_LABELS_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount,
  ALREADY_STALE_PULL_REQUESTS_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount,
  CALLED_API_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().calledApiPullRequestsCount,
  CALLED_API_PULL_REQUESTS_MUTATIONS_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount,
  CALLED_API_PULL_REQUESTS_QUERIES_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount,
  CLOSE_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().closedPullRequestsCount,
  DELETED_PULL_REQUESTS_BRANCHES_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount,
  DRAFT_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().draftPullRequestsCount,
  IGNORED_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount,
  PROCESSED_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().processedPullRequestsCount,
  REMOVE_STALE_PULL_REQUESTS_COUNT: (): number =>
    PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount,
  STALE_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().stalePullRequestsCount,
  UNALTERED_PULL_REQUESTS_COUNT: (): number => PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount,
};

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
    getEnumKeys(EPullRequestsOutputs).forEach((key): void => {
      core.setOutput(EPullRequestsOutputs[key], OUTPUTS_MAP[key]());
    });
  }
}
