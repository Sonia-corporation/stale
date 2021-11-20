import { StatisticsService } from '@core/statistics/statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`StatisticsService`, (): void => {
  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(7);
      StatisticsService.processedIssuesCount$$ = 1;
      StatisticsService.ignoredIssuesCount$$ = 1;
      StatisticsService.unalteredIssuesCount$$ = 1;
      StatisticsService.staleIssuesCount$$ = 1;
      StatisticsService.alreadyStaleIssuesCount$$ = 1;
      StatisticsService.removeStaleIssuesCount$$ = 1;
      StatisticsService.closeIssuesCount$$ = 1;

      StatisticsService.initialize();

      expect(StatisticsService.processedIssuesCount$$).toBe(0);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.initialize();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseProcessedIssuesCount()`, (): void => {
    it(`should increase the processed issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.processedIssuesCount$$ = 0;

      StatisticsService.increaseProcessedIssuesCount();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseProcessedIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseIgnoredIssuesCount()`, (): void => {
    it(`should increase the ignored issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.ignoredIssuesCount$$ = 0;

      StatisticsService.increaseIgnoredIssuesCount();

      expect(StatisticsService.ignoredIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseIgnoredIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseUnalteredIssuesCount()`, (): void => {
    it(`should increase the unaltered issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.unalteredIssuesCount$$ = 0;

      StatisticsService.increaseUnalteredIssuesCount();

      expect(StatisticsService.unalteredIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseUnalteredIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.staleIssuesCount$$ = 0;

      StatisticsService.increaseStaleIssuesCount();

      expect(StatisticsService.staleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseStaleIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseAlreadyStaleIssuesCount()`, (): void => {
    it(`should increase the already stale issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.alreadyStaleIssuesCount$$ = 0;

      StatisticsService.increaseAlreadyStaleIssuesCount();

      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseAlreadyStaleIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseRemoveStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.removeStaleIssuesCount$$ = 0;

      StatisticsService.increaseRemoveStaleIssuesCount();

      expect(StatisticsService.removeStaleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseRemoveStaleIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
    });
  });

  describe(`increaseCloseIssuesCount()`, (): void => {
    it(`should increase the close issues count`, (): void => {
      expect.assertions(1);
      StatisticsService.closeIssuesCount$$ = 0;

      StatisticsService.increaseCloseIssuesCount();

      expect(StatisticsService.closeIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.increaseCloseIssuesCount();

      expect(result).toStrictEqual(StatisticsService);
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

      StatisticsService.logsAllStatistics();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        StatisticsService.processedIssuesCount$$ = 0;
        StatisticsService.ignoredIssuesCount$$ = 0;
        StatisticsService.unalteredIssuesCount$$ = 0;
        StatisticsService.staleIssuesCount$$ = 0;
        StatisticsService.alreadyStaleIssuesCount$$ = 0;
        StatisticsService.removeStaleIssuesCount$$ = 0;
        StatisticsService.closeIssuesCount$$ = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        StatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        StatisticsService.processedIssuesCount$$ = 1;
        StatisticsService.ignoredIssuesCount$$ = 0;
        StatisticsService.unalteredIssuesCount$$ = 0;
        StatisticsService.staleIssuesCount$$ = 0;
        StatisticsService.removeStaleIssuesCount$$ = 0;
        StatisticsService.alreadyStaleIssuesCount$$ = 0;
        StatisticsService.closeIssuesCount$$ = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        StatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`white-└──`, `whiteBright-Processed issues`, `value-1`);
      });
    });

    describe(`when there is a bunch of statistics with a count more to 0`, (): void => {
      beforeEach((): void => {
        StatisticsService.processedIssuesCount$$ = 1;
        StatisticsService.ignoredIssuesCount$$ = 2;
        StatisticsService.unalteredIssuesCount$$ = 0;
        StatisticsService.staleIssuesCount$$ = 3;
        StatisticsService.alreadyStaleIssuesCount$$ = 4;
        StatisticsService.removeStaleIssuesCount$$ = 5;
        StatisticsService.closeIssuesCount$$ = 6;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(7);

        StatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(6);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `whiteBright-Processed issues    `,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `whiteBright-Ignored issues      `,
          `value-2`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `whiteBright-Stale issues        `,
          `value-3`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `whiteBright-Already stale issues`,
          `value-4`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `whiteBright-Remove stale issues `,
          `value-5`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-└──`,
          `whiteBright-Close issues        `,
          `value-6`
        );
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      StatisticsService.logsAllStatistics();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StatisticsService.logsAllStatistics();

      expect(result).toStrictEqual(StatisticsService);
    });
  });
});
