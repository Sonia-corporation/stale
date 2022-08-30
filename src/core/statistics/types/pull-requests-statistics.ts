import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';

export type IPullRequestsStatistics = Pick<
  PullRequestsStatisticsService,
  | 'processedPullRequestsCount'
  | 'ignoredPullRequestsCount'
  | 'unalteredPullRequestsCount'
  | 'stalePullRequestsCount'
  | 'alreadyStalePullRequestsCount'
  | 'removeStalePullRequestsCount'
  | 'closedPullRequestsCount'
  | 'addedPullRequestsCommentsCount'
  | 'deletedPullRequestsBranchesCount'
  | 'addedPullRequestsLabelsCount'
  | 'removedPullRequestsLabelsCount'
  | 'draftPullRequestsCount'
  | 'calledApiPullRequestsMutationsCount'
  | 'calledApiPullRequestsQueriesCount'
>;
