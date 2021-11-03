import { IInputs } from './inputs.interface';
import { InputsService } from './inputs.service';
import { LoggerFormatService } from '../../utils/logger/logger-format.service';
import { LoggerService } from '../../utils/logger/logger.service';
import * as core from '@actions/core';

jest.mock(`../../utils/logger/logger.service`);
jest.mock(`../../utils/logger/logger-format.service`);

describe(`InputsService`, (): void => {
  describe(`initialize()`, (): void => {
    let setInputsSpy: jest.SpyInstance;
    let logInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      setInputsSpy = jest.spyOn(InputsService, `setInputs`).mockImplementation();
      logInputsSpy = jest.spyOn(InputsService, `logInputs`).mockImplementation();
    });

    it(`should get, parse and set the inputs coming from the action`, (): void => {
      expect.assertions(2);

      InputsService.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of inputs and their values`, (): void => {
      expect.assertions(2);

      InputsService.initialize();

      expect(logInputsSpy).toHaveBeenCalledTimes(1);
      expect(logInputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = InputsService.initialize();

      expect(result).toStrictEqual(InputsService);
    });
  });

  describe(`setInputs()`, (): void => {
    let coreGetInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      InputsService.inputs = {
        githubToken: `github-token`,
      };

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
    });

    it(`should get the github-token input (as mandatory), parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(`github-token`, { required: true });
      expect(InputsService.inputs?.githubToken).toStrictEqual(`dummy-github-token`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = InputsService.setInputs();

      expect(result).toStrictEqual({
        githubToken: `dummy-github-token`,
      } as IInputs);
    });
  });

  describe(`logInputs()`, (): void => {
    let loggerServiceStartGroupSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceInputSpy: jest.SpyInstance;
    let loggerServiceEndGroupSpy: jest.SpyInstance;
    let loggerFormatServiceWhiteSpy: jest.SpyInstance;
    let loggerFormatServiceCyanSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`);
      loggerServiceInputSpy = jest.spyOn(LoggerService, `input`);
      loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
      loggerFormatServiceWhiteSpy = jest.spyOn(LoggerFormatService, `white`);
      loggerFormatServiceCyanSpy = jest.spyOn(LoggerFormatService, `cyan`);
    });

    it(`should create a group of logs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Inputs`);
    });

    describe(`when the inputs are not set`, (): void => {
      beforeEach((): void => {
        delete InputsService.inputs;
      });

      it(`should not log`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        expect(loggerServiceInputSpy).not.toHaveBeenCalled();
        expect(loggerFormatServiceWhiteSpy).not.toHaveBeenCalled();
        expect(loggerFormatServiceCyanSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        InputsService.inputs = {
          githubToken: `dummy-github-token`,
        };
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(8);

        InputsService.logInputs();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith(
          `white-├──`,
          `input-github-token`,
          `cyan-dummy-github-token`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInputSpy).toHaveBeenCalledWith(`github-token`);
        expect(loggerFormatServiceWhiteSpy).toHaveBeenCalledTimes(1);
        expect(loggerFormatServiceWhiteSpy).toHaveBeenCalledWith(`├──`);
        expect(loggerFormatServiceCyanSpy).toHaveBeenCalledTimes(1);
        expect(loggerFormatServiceCyanSpy).toHaveBeenCalledWith(`dummy-github-token`);
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = InputsService.logInputs();

      expect(result).toStrictEqual(InputsService);
    });
  });
});
