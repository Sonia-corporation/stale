import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsStatisticsService`, (): void => {
  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(8);
      PullRequestsStatisticsService.processedPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.stalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.closedPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.addedPullRequestsCommentsCount$$ = 1;

      PullRequestsStatisticsService.initialize();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.initialize();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseProcessedPullRequestsCount()`, (): void => {
    it(`should increase the processed pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.processedPullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseProcessedPullRequestsCount();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseProcessedPullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseIgnoredPullRequestsCount()`, (): void => {
    it(`should increase the ignored pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseIgnoredPullRequestsCount();

      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseIgnoredPullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseUnalteredPullRequestsCount()`, (): void => {
    it(`should increase the unaltered pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseUnalteredPullRequestsCount();

      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseUnalteredPullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.stalePullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseStalePullRequestsCount();

      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseStalePullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseAlreadyStalePullRequestsCount()`, (): void => {
    it(`should increase the already stale pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseAlreadyStalePullRequestsCount();

      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseAlreadyStalePullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseRemoveStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseRemoveStalePullRequestsCount();

      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseRemoveStalePullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseClosedPullRequestsCount()`, (): void => {
    it(`should increase the close pull requests count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.closedPullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseClosedPullRequestsCount();

      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseClosedPullRequestsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`increaseAddedPullRequestsCommentsCount()`, (): void => {
    it(`should increase the added pull requests comments count`, (): void => {
      expect.assertions(1);
      PullRequestsStatisticsService.closedPullRequestsCount$$ = 0;

      PullRequestsStatisticsService.increaseAddedPullRequestsCommentsCount();

      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.increaseAddedPullRequestsCommentsCount();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });

  describe(`logsAllStatistics()`, (): void => {
    let loggerServiceStartGroupSpy: jest.SpyInstance;
    let loggerServiceEndGroupSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should create a group of logs`, (): void => {
      expect.assertions(2);

      PullRequestsStatisticsService.logsAllStatistics();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        PullRequestsStatisticsService.processedPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.stalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.closedPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.addedPullRequestsCommentsCount$$ = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        PullRequestsStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        PullRequestsStatisticsService.processedPullRequestsCount$$ = 1;
        PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.stalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 0;
        PullRequestsStatisticsService.closedPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.addedPullRequestsCommentsCount$$ = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        PullRequestsStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `white-└──`,
          `whiteBright-Processed pull requests`,
          `value-1`
        );
      });
    });

    describe(`when there is a bunch of statistics with a count more to 0`, (): void => {
      beforeEach((): void => {
        PullRequestsStatisticsService.processedPullRequestsCount$$ = 1;
        PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 2;
        PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 0;
        PullRequestsStatisticsService.stalePullRequestsCount$$ = 3;
        PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 4;
        PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 5;
        PullRequestsStatisticsService.closedPullRequestsCount$$ = 6;
        PullRequestsStatisticsService.addedPullRequestsCommentsCount$$ = 7;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(8);

        PullRequestsStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(7);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `whiteBright-Processed pull requests     `,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `whiteBright-Ignored pull requests       `,
          `value-2`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `whiteBright-Stale pull requests         `,
          `value-3`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `whiteBright-Already stale pull requests `,
          `value-4`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `whiteBright-Remove stale pull requests  `,
          `value-5`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `whiteBright-Closed pull requests        `,
          `value-6`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-└──`,
          `whiteBright-Added pull requests comments`,
          `value-7`
        );
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      PullRequestsStatisticsService.logsAllStatistics();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.logsAllStatistics();

      expect(result).toStrictEqual(PullRequestsStatisticsService);
    });
  });
});
