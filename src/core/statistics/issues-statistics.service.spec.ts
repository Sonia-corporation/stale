import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import faker from 'faker';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssuesStatisticsService`, (): void => {
  let service: IssuesStatisticsService;

  beforeEach((): void => {
    service = IssuesStatisticsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesStatisticsService`, (): void => {
      expect.assertions(1);

      service = IssuesStatisticsService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesStatisticsService));
    });

    it(`should return the created IssuesStatisticsService`, (): void => {
      expect.assertions(1);

      const result = IssuesStatisticsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`get issuesLabelsCount`, (): void => {
    beforeEach((): void => {
      service.addedIssuesLabelsCount = faker.datatype.number();
      service.removedIssuesLabelsCount = faker.datatype.number();
    });

    it(`should return the sum of the extra added and removed issues labels`, (): void => {
      expect.assertions(1);

      const result = service.issuesLabelsCount;

      expect(result).toBe(service.addedIssuesLabelsCount + service.removedIssuesLabelsCount);
    });
  });

  describe(`get calledApiIssuesCount`, (): void => {
    beforeEach((): void => {
      service.calledApiIssuesQueriesCount = faker.datatype.number();
      service.calledApiIssuesMutationsCount = faker.datatype.number();
    });

    it(`should return the sum of the called API issues mutations and queries`, (): void => {
      expect.assertions(1);

      const result = service.calledApiIssuesCount;

      expect(result).toBe(service.calledApiIssuesQueriesCount + service.calledApiIssuesMutationsCount);
    });
  });

  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(12);
      service.processedIssuesCount = 1;
      service.ignoredIssuesCount = 1;
      service.unalteredIssuesCount = 1;
      service.staleIssuesCount = 1;
      service.alreadyStaleIssuesCount = 1;
      service.removeStaleIssuesCount = 1;
      service.closedIssuesCount = 1;
      service.addedIssuesCommentsCount = 1;
      service.addedIssuesLabelsCount = 1;
      service.removedIssuesLabelsCount = 1;
      service.calledApiIssuesQueriesCount = 1;
      service.calledApiIssuesMutationsCount = 1;

      service.initialize();

      expect(service.processedIssuesCount).toBe(0);
      expect(service.ignoredIssuesCount).toBe(0);
      expect(service.unalteredIssuesCount).toBe(0);
      expect(service.staleIssuesCount).toBe(0);
      expect(service.alreadyStaleIssuesCount).toBe(0);
      expect(service.removeStaleIssuesCount).toBe(0);
      expect(service.closedIssuesCount).toBe(0);
      expect(service.addedIssuesCommentsCount).toBe(0);
      expect(service.addedIssuesLabelsCount).toBe(0);
      expect(service.removedIssuesLabelsCount).toBe(0);
      expect(service.calledApiIssuesQueriesCount).toBe(0);
      expect(service.calledApiIssuesMutationsCount).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.initialize();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseProcessedIssuesCount()`, (): void => {
    it(`should increase the processed issues count`, (): void => {
      expect.assertions(1);
      service.processedIssuesCount = 0;

      service.increaseProcessedIssuesCount();

      expect(service.processedIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseProcessedIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseIgnoredIssuesCount()`, (): void => {
    it(`should increase the ignored issues count`, (): void => {
      expect.assertions(1);
      service.ignoredIssuesCount = 0;

      service.increaseIgnoredIssuesCount();

      expect(service.ignoredIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseIgnoredIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseUnalteredIssuesCount()`, (): void => {
    it(`should increase the unaltered issues count`, (): void => {
      expect.assertions(1);
      service.unalteredIssuesCount = 0;

      service.increaseUnalteredIssuesCount();

      expect(service.unalteredIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseUnalteredIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      service.staleIssuesCount = 0;

      service.increaseStaleIssuesCount();

      expect(service.staleIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseStaleIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAlreadyStaleIssuesCount()`, (): void => {
    it(`should increase the already stale issues count`, (): void => {
      expect.assertions(1);
      service.alreadyStaleIssuesCount = 0;

      service.increaseAlreadyStaleIssuesCount();

      expect(service.alreadyStaleIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAlreadyStaleIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseRemoveStaleIssuesCount()`, (): void => {
    it(`should increase the stale issues count`, (): void => {
      expect.assertions(1);
      service.removeStaleIssuesCount = 0;

      service.increaseRemoveStaleIssuesCount();

      expect(service.removeStaleIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseRemoveStaleIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseClosedIssuesCount()`, (): void => {
    it(`should increase the close issues count`, (): void => {
      expect.assertions(1);
      service.closedIssuesCount = 0;

      service.increaseClosedIssuesCount();

      expect(service.closedIssuesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseClosedIssuesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAddedIssuesCommentsCount()`, (): void => {
    it(`should increase the added issues comments count`, (): void => {
      expect.assertions(1);
      service.closedIssuesCount = 0;

      service.increaseAddedIssuesCommentsCount();

      expect(service.addedIssuesCommentsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAddedIssuesCommentsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAddedIssuesLabelsCount()`, (): void => {
    it(`should increase the added issues labels count`, (): void => {
      expect.assertions(1);
      service.addedIssuesLabelsCount = 0;

      service.increaseAddedIssuesLabelsCount();

      expect(service.addedIssuesLabelsCount).toBe(1);
    });

    describe.each([0, 1, 2])(`when a specific count is given`, (count: number): void => {
      it(`should increase the added issues labels count by the given count`, (): void => {
        expect.assertions(1);
        service.addedIssuesLabelsCount = 0;

        service.increaseAddedIssuesLabelsCount(count);

        expect(service.addedIssuesLabelsCount).toBe(count);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAddedIssuesLabelsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseRemovedIssuesLabelsCount()`, (): void => {
    it(`should increase the removed issues labels count`, (): void => {
      expect.assertions(1);
      service.removedIssuesLabelsCount = 0;

      service.increaseRemovedIssuesLabelsCount();

      expect(service.removedIssuesLabelsCount).toBe(1);
    });

    describe.each([0, 1, 2])(`when a specific count is given`, (count: number): void => {
      it(`should increase the removed issues labels count by the given count`, (): void => {
        expect.assertions(1);
        service.removedIssuesLabelsCount = 0;

        service.increaseRemovedIssuesLabelsCount(count);

        expect(service.removedIssuesLabelsCount).toBe(count);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseRemovedIssuesLabelsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseCalledApiIssuesQueriesCount()`, (): void => {
    it(`should increase the called API issues queries count`, (): void => {
      expect.assertions(1);
      service.calledApiIssuesQueriesCount = 0;

      service.increaseCalledApiIssuesQueriesCount();

      expect(service.calledApiIssuesQueriesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseCalledApiIssuesQueriesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseCalledApiIssuesMutationsCount()`, (): void => {
    it(`should increase the called API issues mutations count`, (): void => {
      expect.assertions(1);
      service.calledApiIssuesMutationsCount = 0;

      service.increaseCalledApiIssuesMutationsCount();

      expect(service.calledApiIssuesMutationsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseCalledApiIssuesMutationsCount();

      expect(result).toStrictEqual(service);
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

      service.logsAllStatistics();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Issues statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        service.processedIssuesCount = 0;
        service.ignoredIssuesCount = 0;
        service.unalteredIssuesCount = 0;
        service.staleIssuesCount = 0;
        service.alreadyStaleIssuesCount = 0;
        service.removeStaleIssuesCount = 0;
        service.closedIssuesCount = 0;
        service.addedIssuesCommentsCount = 0;
        service.addedIssuesLabelsCount = 0;
        service.removedIssuesLabelsCount = 0;
        service.calledApiIssuesQueriesCount = 0;
        service.calledApiIssuesMutationsCount = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        service.processedIssuesCount = 1;
        service.ignoredIssuesCount = 0;
        service.unalteredIssuesCount = 0;
        service.staleIssuesCount = 0;
        service.removeStaleIssuesCount = 0;
        service.alreadyStaleIssuesCount = 0;
        service.closedIssuesCount = 0;
        service.addedIssuesCommentsCount = 0;
        service.addedIssuesLabelsCount = 0;
        service.removedIssuesLabelsCount = 0;
        service.calledApiIssuesQueriesCount = 0;
        service.calledApiIssuesMutationsCount = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`white-└──`, `whiteBright-Processed issues`, `value-1`);
      });
    });

    describe(`when there is a bunch of statistics with a count more to 0`, (): void => {
      beforeEach((): void => {
        service.processedIssuesCount = 1;
        service.ignoredIssuesCount = 2;
        service.unalteredIssuesCount = 0;
        service.staleIssuesCount = 3;
        service.alreadyStaleIssuesCount = 4;
        service.removeStaleIssuesCount = 5;
        service.closedIssuesCount = 6;
        service.addedIssuesCommentsCount = 7;
        service.addedIssuesLabelsCount = 8;
        service.removedIssuesLabelsCount = 9;
        service.calledApiIssuesQueriesCount = 10;
        service.calledApiIssuesMutationsCount = 11;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(14);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
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
          `white-├──`,
          `whiteBright-Added issues comments`,
          `value-7`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `whiteBright-Issues labels        `,
          `value-17`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-│   ├──`,
          `whiteBright-Added issues labels  `,
          `value-8`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-│   └──`,
          `whiteBright-Removed issues labels`,
          `value-9`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-└──`,
          `whiteBright-Called API issues    `,
          `value-21`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          12,
          `white-    ├──`,
          `whiteBright-Called API issues queries  `,
          `value-10`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          13,
          `white-    └──`,
          `whiteBright-Called API issues mutations`,
          `value-11`
        );
      });
    });

    describe(`when there is one added issues labels count statistic`, (): void => {
      beforeEach((): void => {
        service.processedIssuesCount = 0;
        service.ignoredIssuesCount = 0;
        service.unalteredIssuesCount = 0;
        service.staleIssuesCount = 0;
        service.removeStaleIssuesCount = 0;
        service.alreadyStaleIssuesCount = 0;
        service.closedIssuesCount = 0;
        service.addedIssuesCommentsCount = 0;
        service.addedIssuesLabelsCount = 1;
        service.removedIssuesLabelsCount = 0;
        service.calledApiIssuesQueriesCount = 0;
        service.calledApiIssuesMutationsCount = 0;
      });

      it(`should log the added issues labels count statistic but not the removed issues labels count statistic`, (): void => {
        expect.assertions(3);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-└──`, `whiteBright-Issues labels`, `value-1`);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-    └──`,
          `whiteBright-Added issues labels`,
          `value-1`
        );
      });
    });

    describe(`when there is one called api issues queries count statistic`, (): void => {
      beforeEach((): void => {
        service.processedIssuesCount = 0;
        service.ignoredIssuesCount = 0;
        service.unalteredIssuesCount = 0;
        service.staleIssuesCount = 0;
        service.removeStaleIssuesCount = 0;
        service.alreadyStaleIssuesCount = 0;
        service.closedIssuesCount = 0;
        service.addedIssuesCommentsCount = 0;
        service.addedIssuesLabelsCount = 0;
        service.removedIssuesLabelsCount = 0;
        service.calledApiIssuesQueriesCount = 1;
        service.calledApiIssuesMutationsCount = 0;
      });

      it(`should log the called api issues queries count statistic but not the called api issues mutations count statistic`, (): void => {
        expect.assertions(3);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-└──`,
          `whiteBright-Called API issues`,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-    └──`,
          `whiteBright-Called API issues queries`,
          `value-1`
        );
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      service.logsAllStatistics();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.logsAllStatistics();

      expect(result).toStrictEqual(service);
    });
  });
});
