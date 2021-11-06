import { InputsService } from './inputs/inputs.service';
import { StaleService } from './stale.service';
import { OctokitService } from '../github/octokit/octokit.service';
import { LoggerService } from '../utils/logger/logger.service';
import * as core from '@actions/core';

describe(`StaleService`, (): void => {
  describe(`initialize()`, (): void => {
    let inputsServiceInitializeSpy: jest.SpyInstance;
    let octokitServiceInitializeSpy: jest.SpyInstance;
    let coreSetFailedSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      inputsServiceInitializeSpy = jest.spyOn(InputsService, `initialize`).mockImplementation();
      octokitServiceInitializeSpy = jest.spyOn(OctokitService, `initialize`).mockImplementation();
      coreSetFailedSpy = jest.spyOn(core, `setFailed`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
    });

    it(`should read and parse the inputs from the job`, (): void => {
      expect.assertions(2);

      StaleService.initialize();

      expect(inputsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(inputsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should create the GitHub octokit`, (): void => {
      expect.assertions(2);

      StaleService.initialize();

      expect(octokitServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceInitializeSpy).toHaveBeenCalledWith();
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

        it(`should log the error`, (): void => {
          expect.assertions(2);

          StaleService.initialize();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`[Error] inputs error`);
        });

        it(`should log the error trace`, (): void => {
          expect.assertions(3);

          StaleService.initialize();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy.mock.calls[0][0]).toContain(`Error: inputs error`);
          expect(loggerServiceDebugSpy.mock.calls[0]).toHaveLength(1);
        });

        it(`should exit the action with the thrown error`, (): void => {
          expect.assertions(2);

          StaleService.initialize();

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

        it(`should log the error`, (): void => {
          expect.assertions(2);

          StaleService.initialize();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`Stale action failed with error inputs error`);
        });

        it(`should exit the action with the thrown error`, (): void => {
          expect.assertions(2);

          StaleService.initialize();

          expect(coreSetFailedSpy).toHaveBeenCalledTimes(1);
          expect(coreSetFailedSpy).toHaveBeenCalledWith(`Stale action failed with error inputs error`);
        });
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = StaleService.initialize();

      expect(result).toStrictEqual(StaleService);
    });
  });
});
