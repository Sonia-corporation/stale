import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { StatisticsService } from '@core/statistics/statistics.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`StatisticsService`, (): void => {
  describe(`initialize()`, (): void => {
    let issuesStatisticsServiceInitializeSpy: jest.SpyInstance;
    let pullRequestsStatisticsServiceInitializeSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesStatisticsServiceInitializeSpy = jest
        .spyOn(IssuesStatisticsService.getInstance(), `initialize`)
        .mockImplementation();
      pullRequestsStatisticsServiceInitializeSpy = jest
        .spyOn(PullRequestsStatisticsService.getInstance(), `initialize`)
        .mockImplementation();
    });

    it(`should initialize the issues statistics service`, (): void => {
      expect.assertions(2);

      StatisticsService.initialize();

      expect(issuesStatisticsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(issuesStatisticsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should initialize the pull requests statistics service`, (): void => {
      expect.assertions(2);

      StatisticsService.initialize();

      expect(pullRequestsStatisticsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsStatisticsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.initialize();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`logsAllStatistics()`, (): void => {
    let issuesStatisticsServiceLogsAllStatisticsSpy: jest.SpyInstance;
    let pullRequestsStatisticsServiceLogsAllStatisticsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesStatisticsServiceLogsAllStatisticsSpy = jest
        .spyOn(IssuesStatisticsService.getInstance(), `logsAllStatistics`)
        .mockImplementation();
      pullRequestsStatisticsServiceLogsAllStatisticsSpy = jest
        .spyOn(IssuesStatisticsService.getInstance(), `logsAllStatistics`)
        .mockImplementation();
    });

    it(`should log the issues statistics`, (): void => {
      expect.assertions(2);

      StatisticsService.logsAllStatistics();

      expect(issuesStatisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledTimes(1);
      expect(issuesStatisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledWith();
    });

    it(`should log the pull requests statistics`, (): void => {
      expect.assertions(2);

      StatisticsService.logsAllStatistics();

      expect(pullRequestsStatisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsStatisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.logsAllStatistics();

      expect(result).toStrictEqual(StatisticsService);
    });
  });
});
