import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`CommonInputsService`, (): void => {
  describe(`initialize()`, (): void => {
    let setInputsSpy: jest.SpyInstance;
    let logInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      setInputsSpy = jest.spyOn(CommonInputsService, `setInputs`).mockImplementation();
      logInputsSpy = jest.spyOn(CommonInputsService, `logInputs`).mockImplementation();
    });

    it(`should get, parse and set the inputs coming from the action`, (): void => {
      expect.assertions(2);

      CommonInputsService.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of inputs and their values`, (): void => {
      expect.assertions(2);

      CommonInputsService.initialize();

      expect(logInputsSpy).toHaveBeenCalledTimes(1);
      expect(logInputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = CommonInputsService.initialize();

      expect(result).toStrictEqual(CommonInputsService);
    });
  });

  describe(`setInputs()`, (): void => {
    let coreGetInputSpy: jest.SpyInstance;
    let coreGetBooleanInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      CommonInputsService.inputs$$ = createHydratedMock<ICommonInputs>({
        dryRun: true,
        githubToken: `github-token`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
    });

    it(`should get the dry-run input, parse it and set it`, (): void => {
      expect.assertions(3);

      CommonInputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetBooleanInputSpy).toHaveBeenCalledWith(`dry-run`, { required: false });
      expect(CommonInputsService.inputs$$?.dryRun).toBeFalse();
    });

    it(`should get the github-token input, parse it and set it`, (): void => {
      expect.assertions(3);

      CommonInputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(`github-token`, { required: false });
      expect(CommonInputsService.inputs$$?.githubToken).toStrictEqual(`dummy-github-token`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = CommonInputsService.setInputs();

      expect(result).toStrictEqual({
        dryRun: false,
        githubToken: `dummy-github-token`,
      } as ICommonInputs);
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

      CommonInputsService.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Common inputs`);
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        CommonInputsService.inputs$$ = createHydratedMock<ICommonInputs>({
          dryRun: false,
          githubToken: `dummy-github-token`,
        });
      });

      it(`should log the dry-run input`, (): void => {
        expect.assertions(4);

        CommonInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-├──`, `input-dry-run`, `value-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `dry-run`);
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(4);

        CommonInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-└──`,
          `input-github-token`,
          `value-dummy-github-token`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `github-token`);
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      CommonInputsService.logInputs();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = CommonInputsService.logInputs();

      expect(result).toStrictEqual(CommonInputsService);
    });
  });

  describe(`getInputs()`, (): void => {
    describe(`when the inputs are unset`, (): void => {
      beforeEach((): void => {
        delete CommonInputsService.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): ICommonInputs => CommonInputsService.getInputs()).toThrow(new Error(`The common inputs are unset`));
      });
    });

    describe(`when the inputs are set`, (): void => {
      let inputs: ICommonInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<ICommonInputs>();
        CommonInputsService.inputs$$ = inputs;
      });

      it(`should return the inputs`, (): void => {
        expect.assertions(1);

        const result = CommonInputsService.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
