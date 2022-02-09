import { AbstractOutputsAnnotationsService } from '@core/outputs/annotations/abstract-outputs-annotations.service';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import * as core from '@actions/core';
import _ from 'lodash';

export class IssuesOutputsAnnotationsService extends AbstractOutputsAnnotationsService {
  private static _instance: IssuesOutputsAnnotationsService;

  public static getInstance(): IssuesOutputsAnnotationsService {
    if (_.isNil(IssuesOutputsAnnotationsService._instance)) {
      IssuesOutputsAnnotationsService._instance = new IssuesOutputsAnnotationsService();
    }

    return IssuesOutputsAnnotationsService._instance;
  }

  protected readonly _outputsName: 'issues' = `issues`;

  protected _noticeAllOutputs(): void {
    if (IssuesStatisticsService.getInstance().alreadyStaleIssuesCount > 0) {
      core.notice(`Already stale issues: ${IssuesStatisticsService.getInstance().alreadyStaleIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().ignoredIssuesCount > 0) {
      core.notice(`Ignored issues: ${IssuesStatisticsService.getInstance().ignoredIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().unalteredIssuesCount > 0) {
      core.notice(`Unaltered issues: ${IssuesStatisticsService.getInstance().unalteredIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().staleIssuesCount > 0) {
      core.notice(`Stale issues: ${IssuesStatisticsService.getInstance().staleIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().processedIssuesCount > 0) {
      core.notice(`Processed issues: ${IssuesStatisticsService.getInstance().processedIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().removeStaleIssuesCount > 0) {
      core.notice(`Remove stale issues: ${IssuesStatisticsService.getInstance().removeStaleIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().closedIssuesCount > 0) {
      core.notice(`Close issues: ${IssuesStatisticsService.getInstance().closedIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().addedIssuesCommentsCount > 0) {
      core.notice(`Added issues comments: ${IssuesStatisticsService.getInstance().addedIssuesCommentsCount}`);
    }

    if (IssuesStatisticsService.getInstance().addedIssuesLabelsCount > 0) {
      core.notice(`Added issues labels: ${IssuesStatisticsService.getInstance().addedIssuesLabelsCount}`);
    }

    if (IssuesStatisticsService.getInstance().calledApiIssuesCount > 0) {
      core.notice(`Called api issues: ${IssuesStatisticsService.getInstance().calledApiIssuesCount}`);
    }

    if (IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount > 0) {
      core.notice(`Called api issues queries: ${IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount}`);
    }

    if (IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount > 0) {
      core.notice(
        `Called api issues mutations: ${IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount}`
      );
    }
  }
}
