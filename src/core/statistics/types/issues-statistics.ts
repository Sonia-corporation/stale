import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';

export type IIssuesStatistics = Pick<
  IssuesStatisticsService,
  | 'calledApiIssuesQueriesCount'
  | 'addedIssuesLabelsCount'
  | 'removedIssuesLabelsCount'
  | 'closedIssuesCount'
  | 'addedIssuesCommentsCount'
  | 'processedIssuesCount'
  | 'removeStaleIssuesCount'
  | 'staleIssuesCount'
  | 'unalteredIssuesCount'
  | 'increaseCalledApiIssuesMutationsCount'
  | 'alreadyStaleIssuesCount'
  | 'calledApiIssuesMutationsCount'
  | 'ignoredIssuesCount'
>;
