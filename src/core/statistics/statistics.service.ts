import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';

export class StatisticsService {
  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {StatisticsService} The service
   */
  public static initialize(): StatisticsService {
    IssuesStatisticsService.getInstance().initialize();
    PullRequestsStatisticsService.initialize();

    return StatisticsService;
  }

  public static logsAllStatistics(): StatisticsService {
    IssuesStatisticsService.getInstance().logsAllStatistics();
    PullRequestsStatisticsService.logsAllStatistics();

    return StatisticsService;
  }
}
