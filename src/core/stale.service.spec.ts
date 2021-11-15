import { InputsService } from '@core/inputs/inputs.service';
import { IssuesService } from '@core/issues/issues.service';
import { OutputsService } from '@core/outputs/outputs.service';
import { StaleService } from '@core/stale.service';
import { StatisticsService } from '@core/statistics/statistics.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`StaleService`, (): void => {
  describe(`initialize()`, (): void => {
    let statisticsServiceInitializeSpy: jest.SpyInstance;
    let inputsServiceInitializeSpy: jest.SpyInstance;
    let octokitServiceInitializeSpy: jest.SpyInstance;
    let issuesServiceProcessSpy: jest.SpyInstance;
    let coreSetFailedSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let statisticsServiceLogsAllStatisticsSpy: jest.SpyInstance;
    let outputsServiceSetOutputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      statisticsServiceInitializeSpy = jest.spyOn(StatisticsService, `initialize`).mockImplementation();
      inputsServiceInitializeSpy = jest.spyOn(InputsService, `initialize`).mockImplementation();
      octokitServiceInitializeSpy = jest.spyOn(OctokitService, `initialize`).mockImplementation();
      issuesServiceProcessSpy = jest.spyOn(IssuesService, `process`).mockResolvedValue();
      coreSetFailedSpy = jest.spyOn(core, `setFailed`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      statisticsServiceLogsAllStatisticsSpy = jest.spyOn(StatisticsService, `logsAllStatistics`).mockImplementation();
      outputsServiceSetOutputsSpy = jest.spyOn(OutputsService, `setOutputs`).mockImplementation();
    });

    it(`should log starting the stale process`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Starting the stale process...`);
    });

    it(`should initialize the statistics service to avoid an issue for the integration tests`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(statisticsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(statisticsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    describe(`when an error occur`, (): void => {
      beforeEach((): void => {
        inputsServiceInitializeSpy.mockImplementation((): void => {
          throw new Error(`inputs error`);
        });
      });

      describe(`when the error is an Error object`, (): void => {
        beforeEach((): void => {
          inputsServiceInitializeSpy.mockImplementation((): void => {
            throw new Error(`inputs error`);
          });
        });

        it(`should log the error`, async (): Promise<void> => {
          expect.assertions(2);

          await StaleService.initialize();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`[Error] inputs error`);
        });

        it(`should log the error trace`, async (): Promise<void> => {
          expect.assertions(3);

          await StaleService.initialize();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy.mock.calls[0][0]).toContain(`Error: inputs error`);
          expect(loggerServiceDebugSpy.mock.calls[0]).toHaveLength(1);
        });

        it(`should not display the statistics`, async (): Promise<void> => {
          expect.assertions(1);

          await StaleService.initialize();

          expect(statisticsServiceLogsAllStatisticsSpy).not.toHaveBeenCalled();
        });

        it(`should exit the action with the thrown error`, async (): Promise<void> => {
          expect.assertions(2);

          await StaleService.initialize();

          expect(coreSetFailedSpy).toHaveBeenCalledTimes(1);
          expect(coreSetFailedSpy).toHaveBeenCalledWith(`Stale action failed with error inputs error`);
        });
      });

      describe(`when the error is not an Error object`, (): void => {
        beforeEach((): void => {
          inputsServiceInitializeSpy.mockImplementation((): void => {
            // eslint-disable-next-line no-throw-literal
            throw `inputs error`;
          });
        });

        it(`should log the error`, async (): Promise<void> => {
          expect.assertions(2);

          await StaleService.initialize();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`Stale action failed with error inputs error`);
        });

        it(`should not display the statistics`, async (): Promise<void> => {
          expect.assertions(1);

          await StaleService.initialize();

          expect(statisticsServiceLogsAllStatisticsSpy).not.toHaveBeenCalled();
        });

        it(`should exit the action with the thrown error`, async (): Promise<void> => {
          expect.assertions(2);

          await StaleService.initialize();

          expect(coreSetFailedSpy).toHaveBeenCalledTimes(1);
          expect(coreSetFailedSpy).toHaveBeenCalledWith(`Stale action failed with error inputs error`);
        });
      });
    });

    it(`should read and parse the inputs from the job`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(inputsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(inputsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should create the GitHub octokit`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(octokitServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should process the issues`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(issuesServiceProcessSpy).toHaveBeenCalledTimes(1);
      expect(issuesServiceProcessSpy).toHaveBeenCalledWith();
    });

    it(`should log when the process is finished`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `green-The stale processing is over`);
    });

    it(`should display the statistics`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(statisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledTimes(1);
      expect(statisticsServiceLogsAllStatisticsSpy).toHaveBeenCalledWith();
    });

    it(`should set the outputs`, async (): Promise<void> => {
      expect.assertions(2);

      await StaleService.initialize();

      expect(outputsServiceSetOutputsSpy).toHaveBeenCalledTimes(1);
      expect(outputsServiceSetOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await StaleService.initialize();

      expect(result).toStrictEqual(StaleService);
    });
  });
});
