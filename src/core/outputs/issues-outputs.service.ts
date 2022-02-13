import { AbstractOutputsService } from '@core/outputs/abstract-outputs.service';
import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { getEnumKeys } from '@utils/enums/get-enum-keys';
import * as core from '@actions/core';
import _ from 'lodash';

const MAP: { [key in keyof typeof EIssuesOutputs]: () => number } = {
  ADDED_ISSUES_COMMENTS_COUNT: (): number => IssuesStatisticsService.getInstance().addedIssuesCommentsCount,
  ADDED_ISSUES_LABELS_COUNT: (): number => IssuesStatisticsService.getInstance().addedIssuesLabelsCount,
  ALREADY_STALE_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().alreadyStaleIssuesCount,
  CALLED_API_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().calledApiIssuesCount,
  CALLED_API_ISSUES_MUTATIONS_COUNT: (): number => IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount,
  CALLED_API_ISSUES_QUERIES_COUNT: (): number => IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount,
  CLOSE_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().closedIssuesCount,
  IGNORED_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().ignoredIssuesCount,
  PROCESSED_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().processedIssuesCount,
  REMOVE_STALE_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().removeStaleIssuesCount,
  STALE_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().staleIssuesCount,
  UNALTERED_ISSUES_COUNT: (): number => IssuesStatisticsService.getInstance().unalteredIssuesCount,
};

export class IssuesOutputsService extends AbstractOutputsService {
  private static _instance: IssuesOutputsService;

  public static getInstance(): IssuesOutputsService {
    if (_.isNil(IssuesOutputsService._instance)) {
      IssuesOutputsService._instance = new IssuesOutputsService();
    }

    return IssuesOutputsService._instance;
  }

  protected readonly _outputsName: 'issues' = `issues`;

  protected _setOutputs(): void {
    getEnumKeys(EIssuesOutputs).forEach((key): void => {
      core.setOutput(EIssuesOutputs[key], MAP[key]());
    });
  }
}
