import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesOutputsService } from '@core/outputs/issues-outputs.service';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssuesOutputsService`, (): void => {
  let service: IssuesOutputsService;

  beforeEach((): void => {
    service = IssuesOutputsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesOutputsService`, (): void => {
      expect.assertions(1);

      service = IssuesOutputsService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesOutputsService));
    });

    it(`should return the created IssuesOutputsService`, (): void => {
      expect.assertions(1);

      const result = IssuesOutputsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`setOutputs()`, (): void => {
    let loggerServiceInfoSpy: jest.SpyInstance;
    let coreSetOutputSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      coreSetOutputSpy = jest.spyOn(core, `setOutput`).mockImplementation();
    });

    it(`should log about setting the issues outputs`, (): void => {
      expect.assertions(2);

      service.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Creating the issues outputs...`);
    });

    it(`should set the statistics outputs`, (): void => {
      expect.assertions(15);
      IssuesStatisticsService.getInstance().processedIssuesCount = 1;
      IssuesStatisticsService.getInstance().ignoredIssuesCount = 1;
      IssuesStatisticsService.getInstance().unalteredIssuesCount = 1;
      IssuesStatisticsService.getInstance().staleIssuesCount = 1;
      IssuesStatisticsService.getInstance().alreadyStaleIssuesCount = 1;
      IssuesStatisticsService.getInstance().removeStaleIssuesCount = 1;
      IssuesStatisticsService.getInstance().closedIssuesCount = 1;
      IssuesStatisticsService.getInstance().addedIssuesCommentsCount = 1;
      IssuesStatisticsService.getInstance().addedIssuesLabelsCount = 1;
      IssuesStatisticsService.getInstance().removedIssuesLabelsCount = 1;
      IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 1;
      IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 1;

      service.setOutputs();

      expect(coreSetOutputSpy).toHaveBeenCalledTimes(14);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(1, EIssuesOutputs.ALREADY_STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(2, EIssuesOutputs.IGNORED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(3, EIssuesOutputs.UNALTERED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(4, EIssuesOutputs.STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(5, EIssuesOutputs.PROCESSED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(6, EIssuesOutputs.REMOVE_STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(7, EIssuesOutputs.CLOSE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(8, EIssuesOutputs.ADDED_ISSUES_COMMENTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(9, EIssuesOutputs.ISSUES_LABELS_COUNT, 2);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(10, EIssuesOutputs.ADDED_ISSUES_LABELS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(11, EIssuesOutputs.REMOVED_ISSUES_LABELS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(12, EIssuesOutputs.CALLED_API_ISSUES_COUNT, 2);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(13, EIssuesOutputs.CALLED_API_ISSUES_QUERIES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(14, EIssuesOutputs.CALLED_API_ISSUES_MUTATIONS_COUNT, 1);
    });

    it(`should log about the end of the issues output setup`, (): void => {
      expect.assertions(2);

      service.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `Issues outputs created`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.setOutputs();

      expect(result).toStrictEqual(service);
    });
  });
});
