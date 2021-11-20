import { EOutputs } from '@core/outputs/outputs.enum';
import { OutputsService } from '@core/outputs/outputs.service';
import { StatisticsService } from '@core/statistics/statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`OutputsService`, (): void => {
  describe(`setOutputs()`, (): void => {
    let loggerServiceInfoSpy: jest.SpyInstance;
    let coreSetOutputSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      coreSetOutputSpy = jest.spyOn(core, `setOutput`).mockImplementation();
    });

    it(`should log about setting the outputs`, (): void => {
      expect.assertions(2);

      OutputsService.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Creating the outputs...`);
    });

    it(`should set the statistics outputs`, (): void => {
      expect.assertions(8);
      StatisticsService.processedIssuesCount$$ = 1;
      StatisticsService.ignoredIssuesCount$$ = 1;
      StatisticsService.unalteredIssuesCount$$ = 1;
      StatisticsService.staleIssuesCount$$ = 1;
      StatisticsService.alreadyStaleIssuesCount$$ = 1;
      StatisticsService.removeStaleIssuesCount$$ = 1;
      StatisticsService.closeIssuesCount$$ = 1;

      OutputsService.setOutputs();

      expect(coreSetOutputSpy).toHaveBeenCalledTimes(7);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(1, EOutputs.ALREADY_STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(2, EOutputs.IGNORED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(3, EOutputs.UNALTERED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(4, EOutputs.STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(5, EOutputs.PROCESSED_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(6, EOutputs.REMOVE_STALE_ISSUES_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(7, EOutputs.CLOSE_ISSUES_COUNT, 1);
    });

    it(`should log about the end of the output setup`, (): void => {
      expect.assertions(2);

      OutputsService.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `Outputs created`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = OutputsService.setOutputs();

      expect(result).toStrictEqual(OutputsService);
    });
  });
});
