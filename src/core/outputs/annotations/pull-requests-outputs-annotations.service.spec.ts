import { PullRequestsOutputsAnnotationsService } from '@core/outputs/annotations/pull-requests-outputs-annotations.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsOutputsAnnotationsService`, (): void => {
  let service: PullRequestsOutputsAnnotationsService;

  beforeEach((): void => {
    service = PullRequestsOutputsAnnotationsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a PullRequestsOutputsAnnotationsService`, (): void => {
      expect.assertions(1);

      service = PullRequestsOutputsAnnotationsService.getInstance();

      expect(service).toStrictEqual(expect.any(PullRequestsOutputsAnnotationsService));
    });

    it(`should return the created PullRequestsOutputsAnnotationsService`, (): void => {
      expect.assertions(1);

      const result = PullRequestsOutputsAnnotationsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`noticeAllOutputs()`, (): void => {
    let loggerServiceInfoSpy: jest.SpyInstance;
    let coreNoticeSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      coreNoticeSpy = jest.spyOn(core, `notice`).mockImplementation();
    });

    it(`should log about the logging the pull requests outputs annotations`, (): void => {
      expect.assertions(2);

      service.noticeAllOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Logging the pull requests outputs annotations as notices...`
      );
    });

    describe(`when all the pull requests statistics are greater than 0`, (): void => {
      beforeEach((): void => {
        PullRequestsStatisticsService.getInstance().processedPullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount = 2;
        PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount = 3;
        PullRequestsStatisticsService.getInstance().stalePullRequestsCount = 4;
        PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount = 5;
        PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount = 6;
        PullRequestsStatisticsService.getInstance().closedPullRequestsCount = 7;
        PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount = 8;
        PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount = 9;
        PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount = 10;
        PullRequestsStatisticsService.getInstance().removedPullRequestsLabelsCount = 11;
        PullRequestsStatisticsService.getInstance().draftPullRequestsCount = 12;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 13;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount = 14;
      });

      it(`should log the pull requests outputs annotations`, (): void => {
        expect.assertions(17);

        service.noticeAllOutputs();

        expect(coreNoticeSpy).toHaveBeenCalledTimes(16);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(1, `Already stale pull requests: 5`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(2, `Ignored pull requests: 2`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(3, `Unaltered pull requests: 3`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(4, `Stale pull requests: 4`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(5, `Processed pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(6, `Remove stale pull requests: 6`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(7, `Closed pull requests: 7`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(8, `Deleted pull requests branches: 8`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(9, `Added pull requests comments: 9`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(10, `Pull requests labels: 21`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(11, `Added pull requests labels: 10`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(12, `Removed pull requests labels: 11`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(13, `Draft pull requests: 12`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(14, `Called api pull requests: 27`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(15, `Called api pull requests queries: 13`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(16, `Called api pull requests mutations: 14`);
      });
    });

    describe(`when all the pull requests statistics are equal to 0`, (): void => {
      beforeEach((): void => {
        PullRequestsStatisticsService.getInstance().processedPullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().stalePullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().closedPullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount = 0;
        PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount = 0;
        PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount = 0;
        PullRequestsStatisticsService.getInstance().removedPullRequestsLabelsCount = 0;
        PullRequestsStatisticsService.getInstance().draftPullRequestsCount = 0;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 0;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount = 0;
      });

      it(`should not log the pull requests outputs annotations`, (): void => {
        expect.assertions(1);

        service.noticeAllOutputs();

        expect(coreNoticeSpy).not.toHaveBeenCalled();
      });
    });

    it(`should log about the end of the pull requests output annotations logs`, (): void => {
      expect.assertions(2);

      service.noticeAllOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `Pull requests outputs annotations logged`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.noticeAllOutputs();

      expect(result).toStrictEqual(service);
    });
  });
});
