import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import faker from 'faker';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsStatisticsService`, (): void => {
  let service: PullRequestsStatisticsService;

  beforeEach((): void => {
    service = PullRequestsStatisticsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a PullRequestsStatisticsService`, (): void => {
      expect.assertions(1);

      service = PullRequestsStatisticsService.getInstance();

      expect(service).toStrictEqual(expect.any(PullRequestsStatisticsService));
    });

    it(`should return the created PullRequestsStatisticsService`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`get pullRequestsLabelsCount`, (): void => {
    beforeEach((): void => {
      service.addedPullRequestsLabelsCount = faker.datatype.number();
      service.removedPullRequestsLabelsCount = faker.datatype.number();
    });

    it(`should return the sum of the extra added and removed pull requests labels`, (): void => {
      expect.assertions(1);

      const result = service.pullRequestsLabelsCount;

      expect(result).toBe(service.addedPullRequestsLabelsCount + service.removedPullRequestsLabelsCount);
    });
  });

  describe(`get calledApiPullRequestsCount`, (): void => {
    beforeEach((): void => {
      service.calledApiPullRequestsQueriesCount = faker.datatype.number();
      service.calledApiPullRequestsMutationsCount = faker.datatype.number();
    });

    it(`should return the sum of the called API pull requests mutations and queries`, (): void => {
      expect.assertions(1);

      const result = service.calledApiPullRequestsCount;

      expect(result).toBe(service.calledApiPullRequestsQueriesCount + service.calledApiPullRequestsMutationsCount);
    });
  });

  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(14);
      service.processedPullRequestsCount = 1;
      service.ignoredPullRequestsCount = 1;
      service.unalteredPullRequestsCount = 1;
      service.stalePullRequestsCount = 1;
      service.alreadyStalePullRequestsCount = 1;
      service.removeStalePullRequestsCount = 1;
      service.closedPullRequestsCount = 1;
      service.deletedPullRequestsBranchesCount = 1;
      service.addedPullRequestsCommentsCount = 1;
      service.addedPullRequestsLabelsCount = 1;
      service.removedPullRequestsLabelsCount = 1;
      service.draftPullRequestsCount = 1;
      service.calledApiPullRequestsQueriesCount = 1;
      service.calledApiPullRequestsMutationsCount = 1;

      service.initialize();

      expect(service.processedPullRequestsCount).toBe(0);
      expect(service.ignoredPullRequestsCount).toBe(0);
      expect(service.unalteredPullRequestsCount).toBe(0);
      expect(service.stalePullRequestsCount).toBe(0);
      expect(service.alreadyStalePullRequestsCount).toBe(0);
      expect(service.removeStalePullRequestsCount).toBe(0);
      expect(service.closedPullRequestsCount).toBe(0);
      expect(service.deletedPullRequestsBranchesCount).toBe(0);
      expect(service.addedPullRequestsCommentsCount).toBe(0);
      expect(service.addedPullRequestsLabelsCount).toBe(0);
      expect(service.removedPullRequestsLabelsCount).toBe(0);
      expect(service.draftPullRequestsCount).toBe(0);
      expect(service.calledApiPullRequestsQueriesCount).toBe(0);
      expect(service.calledApiPullRequestsMutationsCount).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.initialize();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseProcessedPullRequestsCount()`, (): void => {
    it(`should increase the processed pull requests count`, (): void => {
      expect.assertions(1);
      service.processedPullRequestsCount = 0;

      service.increaseProcessedPullRequestsCount();

      expect(service.processedPullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseProcessedPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseIgnoredPullRequestsCount()`, (): void => {
    it(`should increase the ignored pull requests count`, (): void => {
      expect.assertions(1);
      service.ignoredPullRequestsCount = 0;

      service.increaseIgnoredPullRequestsCount();

      expect(service.ignoredPullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseIgnoredPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseUnalteredPullRequestsCount()`, (): void => {
    it(`should increase the unaltered pull requests count`, (): void => {
      expect.assertions(1);
      service.unalteredPullRequestsCount = 0;

      service.increaseUnalteredPullRequestsCount();

      expect(service.unalteredPullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseUnalteredPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      service.stalePullRequestsCount = 0;

      service.increaseStalePullRequestsCount();

      expect(service.stalePullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAlreadyStalePullRequestsCount()`, (): void => {
    it(`should increase the already stale pull requests count`, (): void => {
      expect.assertions(1);
      service.alreadyStalePullRequestsCount = 0;

      service.increaseAlreadyStalePullRequestsCount();

      expect(service.alreadyStalePullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAlreadyStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseRemoveStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      service.removeStalePullRequestsCount = 0;

      service.increaseRemoveStalePullRequestsCount();

      expect(service.removeStalePullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseRemoveStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseClosedPullRequestsCount()`, (): void => {
    it(`should increase the close pull requests count`, (): void => {
      expect.assertions(1);
      service.closedPullRequestsCount = 0;

      service.increaseClosedPullRequestsCount();

      expect(service.closedPullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseClosedPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseDeletedPullRequestsBranchesCount()`, (): void => {
    it(`should increase the deleted pull requests branches count`, (): void => {
      expect.assertions(1);
      service.deletedPullRequestsBranchesCount = 0;

      service.increaseDeletedPullRequestsBranchesCount();

      expect(service.deletedPullRequestsBranchesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseDeletedPullRequestsBranchesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAddedPullRequestsCommentsCount()`, (): void => {
    it(`should increase the added pull requests comments count`, (): void => {
      expect.assertions(1);
      service.addedPullRequestsCommentsCount = 0;

      service.increaseAddedPullRequestsCommentsCount();

      expect(service.addedPullRequestsCommentsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAddedPullRequestsCommentsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAddedPullRequestsLabelsCount()`, (): void => {
    it(`should increase the added pull requests labels count`, (): void => {
      expect.assertions(1);
      service.addedPullRequestsLabelsCount = 0;

      service.increaseAddedPullRequestsLabelsCount();

      expect(service.addedPullRequestsLabelsCount).toBe(1);
    });

    describe.each([0, 1, 2])(`when a specific count is given`, (count: number): void => {
      it(`should increase the added pull requests labels count by the given count`, (): void => {
        expect.assertions(1);
        service.addedPullRequestsLabelsCount = 0;

        service.increaseAddedPullRequestsLabelsCount(count);

        expect(service.addedPullRequestsLabelsCount).toBe(count);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAddedPullRequestsLabelsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseRemovedPullRequestsLabelsCount()`, (): void => {
    it(`should increase the removed pull requests labels count`, (): void => {
      expect.assertions(1);
      service.removedPullRequestsLabelsCount = 0;

      service.increaseRemovedPullRequestsLabelsCount();

      expect(service.removedPullRequestsLabelsCount).toBe(1);
    });

    describe.each([0, 1, 2])(`when a specific count is given`, (count: number): void => {
      it(`should increase the removed pull requests labels count by the given count`, (): void => {
        expect.assertions(1);
        service.removedPullRequestsLabelsCount = 0;

        service.increaseRemovedPullRequestsLabelsCount(count);

        expect(service.removedPullRequestsLabelsCount).toBe(count);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseRemovedPullRequestsLabelsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseDraftPullRequestsCount()`, (): void => {
    it(`should increase the draft pull requests count`, (): void => {
      expect.assertions(1);
      service.draftPullRequestsCount = 0;

      service.increaseDraftPullRequestsCount();

      expect(service.draftPullRequestsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseDraftPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseCalledApiPullRequestsQueriesCount()`, (): void => {
    it(`should increase the called API pull requests queries count`, (): void => {
      expect.assertions(1);
      service.calledApiPullRequestsQueriesCount = 0;

      service.increaseCalledApiPullRequestsQueriesCount();

      expect(service.calledApiPullRequestsQueriesCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseCalledApiPullRequestsQueriesCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseCalledApiPullRequestsMutationsCount()`, (): void => {
    it(`should increase the called API pull requests mutations count`, (): void => {
      expect.assertions(1);
      service.calledApiPullRequestsMutationsCount = 0;

      service.increaseCalledApiPullRequestsMutationsCount();

      expect(service.calledApiPullRequestsMutationsCount).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseCalledApiPullRequestsMutationsCount();

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
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Pull requests statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount = 0;
        service.ignoredPullRequestsCount = 0;
        service.unalteredPullRequestsCount = 0;
        service.stalePullRequestsCount = 0;
        service.alreadyStalePullRequestsCount = 0;
        service.removeStalePullRequestsCount = 0;
        service.closedPullRequestsCount = 0;
        service.deletedPullRequestsBranchesCount = 0;
        service.addedPullRequestsCommentsCount = 0;
        service.addedPullRequestsLabelsCount = 0;
        service.removedPullRequestsLabelsCount = 0;
        service.draftPullRequestsCount = 0;
        service.calledApiPullRequestsQueriesCount = 0;
        service.calledApiPullRequestsMutationsCount = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount = 1;
        service.ignoredPullRequestsCount = 0;
        service.unalteredPullRequestsCount = 0;
        service.stalePullRequestsCount = 0;
        service.removeStalePullRequestsCount = 0;
        service.alreadyStalePullRequestsCount = 0;
        service.closedPullRequestsCount = 0;
        service.deletedPullRequestsBranchesCount = 0;
        service.addedPullRequestsCommentsCount = 0;
        service.addedPullRequestsLabelsCount = 0;
        service.removedPullRequestsLabelsCount = 0;
        service.draftPullRequestsCount = 0;
        service.calledApiPullRequestsQueriesCount = 0;
        service.calledApiPullRequestsMutationsCount = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        service.logsAllStatistics();

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
        service.processedPullRequestsCount = 1;
        service.ignoredPullRequestsCount = 2;
        service.unalteredPullRequestsCount = 0;
        service.stalePullRequestsCount = 3;
        service.alreadyStalePullRequestsCount = 4;
        service.removeStalePullRequestsCount = 5;
        service.closedPullRequestsCount = 6;
        service.deletedPullRequestsBranchesCount = 7;
        service.addedPullRequestsCommentsCount = 8;
        service.addedPullRequestsLabelsCount = 9;
        service.removedPullRequestsLabelsCount = 10;
        service.draftPullRequestsCount = 11;
        service.calledApiPullRequestsQueriesCount = 12;
        service.calledApiPullRequestsMutationsCount = 13;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(16);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(15);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `whiteBright-Processed pull requests       `,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `whiteBright-Ignored pull requests         `,
          `value-2`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `whiteBright-Stale pull requests           `,
          `value-3`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `whiteBright-Already stale pull requests   `,
          `value-4`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `whiteBright-Remove stale pull requests    `,
          `value-5`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `whiteBright-Closed pull requests          `,
          `value-6`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `whiteBright-Deleted pull requests branches`,
          `value-7`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `whiteBright-Added pull requests comments  `,
          `value-8`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-├──`,
          `whiteBright-Pull requests labels          `,
          `value-19`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-│   ├──`,
          `whiteBright-Added pull requests labels  `,
          `value-9`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-│   └──`,
          `whiteBright-Removed pull requests labels`,
          `value-10`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          12,
          `white-├──`,
          `whiteBright-Draft pull requests           `,
          `value-11`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          13,
          `white-└──`,
          `whiteBright-Called API pull requests      `,
          `value-25`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          14,
          `white-    ├──`,
          `whiteBright-Called API pull requests queries  `,
          `value-12`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          15,
          `white-    └──`,
          `whiteBright-Called API pull requests mutations`,
          `value-13`
        );
      });
    });

    describe(`when there is one added extra pull requests label count statistic`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount = 0;
        service.ignoredPullRequestsCount = 0;
        service.unalteredPullRequestsCount = 0;
        service.stalePullRequestsCount = 0;
        service.alreadyStalePullRequestsCount = 0;
        service.removeStalePullRequestsCount = 0;
        service.closedPullRequestsCount = 0;
        service.deletedPullRequestsBranchesCount = 0;
        service.addedPullRequestsCommentsCount = 0;
        service.addedPullRequestsLabelsCount = 1;
        service.removedPullRequestsLabelsCount = 0;
        service.draftPullRequestsCount = 0;
        service.calledApiPullRequestsQueriesCount = 0;
        service.calledApiPullRequestsMutationsCount = 0;
      });

      it(`should log the called added extra pull requests labels count statistic but not the remove extra pull requests labels count statistic`, (): void => {
        expect.assertions(3);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-└──`,
          `whiteBright-Pull requests labels`,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-    └──`,
          `whiteBright-Added pull requests labels`,
          `value-1`
        );
      });
    });

    describe(`when there is one called api pull requests queries count statistic`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount = 0;
        service.ignoredPullRequestsCount = 0;
        service.unalteredPullRequestsCount = 0;
        service.stalePullRequestsCount = 0;
        service.alreadyStalePullRequestsCount = 0;
        service.removeStalePullRequestsCount = 0;
        service.closedPullRequestsCount = 0;
        service.deletedPullRequestsBranchesCount = 0;
        service.addedPullRequestsCommentsCount = 0;
        service.addedPullRequestsLabelsCount = 0;
        service.removedPullRequestsLabelsCount = 0;
        service.draftPullRequestsCount = 0;
        service.calledApiPullRequestsQueriesCount = 1;
        service.calledApiPullRequestsMutationsCount = 0;
      });

      it(`should log the called api pull requests queries count statistic but not the called api pull requests mutations count statistic`, (): void => {
        expect.assertions(3);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-└──`,
          `whiteBright-Called API pull requests`,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-    └──`,
          `whiteBright-Called API pull requests queries`,
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
