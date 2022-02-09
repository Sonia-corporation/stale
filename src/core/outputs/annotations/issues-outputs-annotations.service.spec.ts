import { IssuesOutputsAnnotationsService } from '@core/outputs/annotations/issues-outputs-annotations.service';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssuesOutputsAnnotationsService`, (): void => {
  let service: IssuesOutputsAnnotationsService;

  beforeEach((): void => {
    service = IssuesOutputsAnnotationsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesOutputsAnnotationsService`, (): void => {
      expect.assertions(1);

      service = IssuesOutputsAnnotationsService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesOutputsAnnotationsService));
    });

    it(`should return the created IssuesOutputsAnnotationsService`, (): void => {
      expect.assertions(1);

      const result = IssuesOutputsAnnotationsService.getInstance();

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

    it(`should log about the logging the issues outputs annotations`, (): void => {
      expect.assertions(2);

      service.noticeAllOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Logging the issues outputs annotations as notices...`);
    });

    describe(`when all the issues statistics are greater than 0`, (): void => {
      beforeEach((): void => {
        IssuesStatisticsService.getInstance().processedIssuesCount = 1;
        IssuesStatisticsService.getInstance().ignoredIssuesCount = 1;
        IssuesStatisticsService.getInstance().unalteredIssuesCount = 1;
        IssuesStatisticsService.getInstance().staleIssuesCount = 1;
        IssuesStatisticsService.getInstance().alreadyStaleIssuesCount = 1;
        IssuesStatisticsService.getInstance().removeStaleIssuesCount = 1;
        IssuesStatisticsService.getInstance().closedIssuesCount = 1;
        IssuesStatisticsService.getInstance().addedIssuesCommentsCount = 1;
        IssuesStatisticsService.getInstance().addedIssuesLabelsCount = 1;
        IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 1;
        IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 1;
      });

      it(`should log the issues outputs annotations`, (): void => {
        expect.assertions(13);

        service.noticeAllOutputs();

        expect(coreNoticeSpy).toHaveBeenCalledTimes(12);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(1, `Already stale issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(2, `Ignored issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(3, `Unaltered issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(4, `Stale issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(5, `Processed issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(6, `Remove stale issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(7, `Close issues: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(8, `Added issues comments: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(9, `Added issues labels: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(10, `Called api issues: 2`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(11, `Called api issues queries: 1`);
        expect(coreNoticeSpy).toHaveBeenNthCalledWith(12, `Called api issues mutations: 1`);
      });
    });

    describe(`when all the issues statistics are equal to 0`, (): void => {
      beforeEach((): void => {
        IssuesStatisticsService.getInstance().processedIssuesCount = 0;
        IssuesStatisticsService.getInstance().ignoredIssuesCount = 0;
        IssuesStatisticsService.getInstance().unalteredIssuesCount = 0;
        IssuesStatisticsService.getInstance().staleIssuesCount = 0;
        IssuesStatisticsService.getInstance().alreadyStaleIssuesCount = 0;
        IssuesStatisticsService.getInstance().removeStaleIssuesCount = 0;
        IssuesStatisticsService.getInstance().closedIssuesCount = 0;
        IssuesStatisticsService.getInstance().addedIssuesCommentsCount = 0;
        IssuesStatisticsService.getInstance().addedIssuesLabelsCount = 0;
        IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 0;
        IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 0;
      });

      it(`should not log the issues outputs annotations`, (): void => {
        expect.assertions(1);

        service.noticeAllOutputs();

        expect(coreNoticeSpy).not.toHaveBeenCalled();
      });
    });

    it(`should log about the end of the issues output annotations logs`, (): void => {
      expect.assertions(2);

      service.noticeAllOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `Issues outputs annotations logged`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.noticeAllOutputs();

      expect(result).toStrictEqual(service);
    });
  });
});
