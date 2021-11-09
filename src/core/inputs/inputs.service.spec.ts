import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

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
    let coreGetBooleanInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      InputsService.inputs$$ = createHydratedMock<IInputs>({
        githubToken: `github-token`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
    });

    it(`should get the github-token input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(`github-token`, { required: false });
      expect(InputsService.inputs$$?.githubToken).toStrictEqual(`dummy-github-token`);
    });

    it(`should get the dry-run input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetBooleanInputSpy).toHaveBeenCalledWith(`dry-run`, { required: false });
      expect(InputsService.inputs$$?.dryRun).toBeFalse();
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = InputsService.setInputs();

      expect(result).toStrictEqual({
        dryRun: false,
        githubToken: `dummy-github-token`,
      } as IInputs);
    });
  });

  describe(`logInputs()`, (): void => {
    let loggerServiceStartGroupSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceInputSpy: jest.SpyInstance;
    let loggerServiceEndGroupSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`);
      loggerServiceInputSpy = jest.spyOn(LoggerService, `input`);
      loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
    });

    it(`should create a group of logs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Inputs`);
    });

    describe(`when the inputs are not set`, (): void => {
      beforeEach((): void => {
        delete InputsService.inputs$$;
      });

      it(`should not log`, (): void => {
        expect.assertions(2);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
        expect(loggerServiceInputSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        InputsService.inputs$$ = createHydratedMock<IInputs>({
          dryRun: false,
          githubToken: `dummy-github-token`,
        });
      });

      it(`should log the dry run input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-├──`, `input-dry-run`, `cyan-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `dry-run`);
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-└──`,
          `input-github-token`,
          `cyan-dummy-github-token`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `github-token`);
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

  describe(`getInputs()`, (): void => {
    describe(`when the inputs are unset`, (): void => {
      beforeEach((): void => {
        delete InputsService.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): IInputs => InputsService.getInputs()).toThrow(new Error(`The inputs are unset`));
      });
    });

    describe(`when the inputs are set`, (): void => {
      let inputs: IInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<IInputs>();
        InputsService.inputs$$ = inputs;
      });

      it(`should return the inputs`, (): void => {
        expect.assertions(1);

        const result = InputsService.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
