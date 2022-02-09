import { AbstractOutputsAnnotationsService } from '@core/outputs/annotations/abstract-outputs-annotations.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import * as core from '@actions/core';
import _ from 'lodash';

export class PullRequestsOutputsAnnotationsService extends AbstractOutputsAnnotationsService {
  private static _instance: PullRequestsOutputsAnnotationsService;

  public static getInstance(): PullRequestsOutputsAnnotationsService {
    if (_.isNil(PullRequestsOutputsAnnotationsService._instance)) {
      PullRequestsOutputsAnnotationsService._instance = new PullRequestsOutputsAnnotationsService();
    }

    return PullRequestsOutputsAnnotationsService._instance;
  }

  protected readonly _outputsName: 'pull requests' = `pull requests`;

  protected _noticeAllOutputs(): void {
    if (PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount > 0) {
      core.notice(
        `Already stale pull requests: ${PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount}`
      );
    }

    if (PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount > 0) {
      core.notice(`Ignored pull requests: ${PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount > 0) {
      core.notice(`Unaltered pull requests: ${PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().stalePullRequestsCount > 0) {
      core.notice(`Stale pull requests: ${PullRequestsStatisticsService.getInstance().stalePullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().processedPullRequestsCount > 0) {
      core.notice(`Processed pull requests: ${PullRequestsStatisticsService.getInstance().processedPullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount > 0) {
      core.notice(
        `Remove stale pull requests: ${PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount}`
      );
    }

    if (PullRequestsStatisticsService.getInstance().closedPullRequestsCount > 0) {
      core.notice(`Close pull requests: ${PullRequestsStatisticsService.getInstance().closedPullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount > 0) {
      core.notice(
        `Deleted pull requests branches: ${
          PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount
        }`
      );
    }

    if (PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount > 0) {
      core.notice(
        `Added pull requests comments: ${PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount}`
      );
    }

    if (PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount > 0) {
      core.notice(
        `Added pull requests labels: ${PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount}`
      );
    }

    if (PullRequestsStatisticsService.getInstance().draftPullRequestsCount > 0) {
      core.notice(`Draft pull requests: ${PullRequestsStatisticsService.getInstance().draftPullRequestsCount}`);
    }

    if (PullRequestsStatisticsService.getInstance().calledApiPullRequestsCount > 0) {
      core.notice(
        `Called api pull requests: ${PullRequestsStatisticsService.getInstance().calledApiPullRequestsCount}`
      );
    }

    if (PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount > 0) {
      core.notice(
        `Called api pull requests queries: ${
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount
        }`
      );
    }

    if (PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount > 0) {
      core.notice(
        `Called api pull requests mutations: ${
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount
        }`
      );
    }
  }
}
