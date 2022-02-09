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
        PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().stalePullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().closedPullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount = 1;
        PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount = 1;
        PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount = 1;
        PullRequestsStatisticsService.getInstance().draftPullRequestsCount = 1;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 1;
        PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount = 1;
      });

      it(`should log the pull requests outputs annotations`, (): void => {
        expect.assertions(15);

        service.noticeAllOutputs();

        expect(coreNoticeSpy).toHaveBeenCalledTimes(14);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(1, `Already stale pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(2, `Ignored pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(3, `Unaltered pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(4, `Stale pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(5, `Processed pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(6, `Remove stale pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(7, `Close pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(8, `Deleted pull requests branches: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(9, `Added pull requests comments: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(10, `Added pull requests labels: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(11, `Draft pull requests: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(12, `Called api pull requests: 2`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(13, `Called api pull requests queries: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(14, `Called api pull requests mutations: 1`);
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
