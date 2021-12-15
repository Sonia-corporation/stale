import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssuesStatisticsService`, (): void => {
  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(8);
      IssuesStatisticsService.processedIssuesCount$$ = 1;
      IssuesStatisticsService.ignoredIssuesCount$$ = 1;
      IssuesStatisticsService.unalteredIssuesCount$$ = 1;
      IssuesStatisticsService.staleIssuesCount$$ = 1;
      IssuesStatisticsService.alreadyStaleIssuesCount$$ = 1;
      IssuesStatisticsService.removeStaleIssuesCount$$ = 1;
      IssuesStatisticsService.closedIssuesCount$$ = 1;
      IssuesStatisticsService.addedIssuesCommentsCount$$ = 1;

      IssuesStatisticsService.initialize();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.initialize();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseProcessedIssuesCount()`, (): void => {
    it(`should increase the processed issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.processedIssuesCount$$ = 0;

      IssuesStatisticsService.increaseProcessedIssuesCount();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseProcessedIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseIgnoredIssuesCount()`, (): void => {
    it(`should increase the ignored issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.ignoredIssuesCount$$ = 0;

      IssuesStatisticsService.increaseIgnoredIssuesCount();

      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseIgnoredIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseUnalteredIssuesCount()`, (): void => {
    it(`should increase the unaltered issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.unalteredIssuesCount$$ = 0;

      IssuesStatisticsService.increaseUnalteredIssuesCount();

      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseUnalteredIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.staleIssuesCount$$ = 0;

      IssuesStatisticsService.increaseStaleIssuesCount();

      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseStaleIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseAlreadyStaleIssuesCount()`, (): void => {
    it(`should increase the already stale issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.alreadyStaleIssuesCount$$ = 0;

      IssuesStatisticsService.increaseAlreadyStaleIssuesCount();

      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseAlreadyStaleIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseRemoveStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.removeStaleIssuesCount$$ = 0;

      IssuesStatisticsService.increaseRemoveStaleIssuesCount();

      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseRemoveStaleIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseClosedIssuesCount()`, (): void => {
    it(`should increase the close issues count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.closedIssuesCount$$ = 0;

      IssuesStatisticsService.increaseClosedIssuesCount();

      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseClosedIssuesCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });

  describe(`increaseAddedIssuesCommentsCount()`, (): void => {
    it(`should increase the added issues comments count`, (): void => {
      expect.assertions(1);
      IssuesStatisticsService.closedIssuesCount$$ = 0;

      IssuesStatisticsService.increaseAddedIssuesCommentsCount();

      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.increaseAddedIssuesCommentsCount();

      expect(result).toStrictEqual(IssuesStatisticsService);
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

      IssuesStatisticsService.logsAllStatistics();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        IssuesStatisticsService.processedIssuesCount$$ = 0;
        IssuesStatisticsService.ignoredIssuesCount$$ = 0;
        IssuesStatisticsService.unalteredIssuesCount$$ = 0;
        IssuesStatisticsService.staleIssuesCount$$ = 0;
        IssuesStatisticsService.alreadyStaleIssuesCount$$ = 0;
        IssuesStatisticsService.removeStaleIssuesCount$$ = 0;
        IssuesStatisticsService.closedIssuesCount$$ = 0;
        IssuesStatisticsService.addedIssuesCommentsCount$$ = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        IssuesStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        IssuesStatisticsService.processedIssuesCount$$ = 1;
        IssuesStatisticsService.ignoredIssuesCount$$ = 0;
        IssuesStatisticsService.unalteredIssuesCount$$ = 0;
        IssuesStatisticsService.staleIssuesCount$$ = 0;
        IssuesStatisticsService.removeStaleIssuesCount$$ = 0;
        IssuesStatisticsService.alreadyStaleIssuesCount$$ = 0;
        IssuesStatisticsService.closedIssuesCount$$ = 0;
        IssuesStatisticsService.addedIssuesCommentsCount$$ = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        IssuesStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`white-└──`, `whiteBright-Processed issues`, `value-1`);
      });
    });

    describe(`when there is a bunch of statistics with a count more to 0`, (): void => {
      beforeEach((): void => {
        IssuesStatisticsService.processedIssuesCount$$ = 1;
        IssuesStatisticsService.ignoredIssuesCount$$ = 2;
        IssuesStatisticsService.unalteredIssuesCount$$ = 0;
        IssuesStatisticsService.staleIssuesCount$$ = 3;
        IssuesStatisticsService.alreadyStaleIssuesCount$$ = 4;
        IssuesStatisticsService.removeStaleIssuesCount$$ = 5;
        IssuesStatisticsService.closedIssuesCount$$ = 6;
        IssuesStatisticsService.addedIssuesCommentsCount$$ = 7;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(8);

        IssuesStatisticsService.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(7);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `whiteBright-Processed issues     `,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `whiteBright-Ignored issues       `,
          `value-2`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `whiteBright-Stale issues         `,
          `value-3`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `whiteBright-Already stale issues `,
          `value-4`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `whiteBright-Remove stale issues  `,
          `value-5`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `whiteBright-Closed issues        `,
          `value-6`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-└──`,
          `whiteBright-Added issues comments`,
          `value-7`
        );
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      IssuesStatisticsService.logsAllStatistics();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.logsAllStatistics();

      expect(result).toStrictEqual(IssuesStatisticsService);
    });
  });
});
