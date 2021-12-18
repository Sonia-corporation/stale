import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`CommonInputsService`, (): void => {
  let service: CommonInputsService;

  beforeEach((): void => {
    service = CommonInputsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a CommonInputsService`, (): void => {
      expect.assertions(1);

      service = CommonInputsService.getInstance();

      expect(service).toStrictEqual(expect.any(CommonInputsService));
    });

    it(`should return the created CommonInputsService`, (): void => {
      expect.assertions(1);

      const result = CommonInputsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`initialize()`, (): void => {
    let setInputsSpy: jest.SpyInstance;
    let logInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      setInputsSpy = jest.spyOn(service, `setInputs`).mockImplementation();
      logInputsSpy = jest.spyOn(service, `logInputs`).mockImplementation();
    });

    it(`should get, parse and set the common inputs coming from the action`, (): void => {
      expect.assertions(2);

      service.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of common inputs and their values`, (): void => {
      expect.assertions(2);

      service.initialize();

      expect(logInputsSpy).toHaveBeenCalledTimes(1);
      expect(logInputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.initialize();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`setInputs()`, (): void => {
    let coreGetInputSpy: jest.SpyInstance;
    let coreGetBooleanInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      service.inputs$$ = createHydratedMock<ICommonInputs>({
        dryRun: true,
        githubToken: `github-token`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
    });

    it(`should get the dry-run input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetBooleanInputSpy).toHaveBeenCalledWith(`dry-run`, { required: false });
      expect(service.inputs$$?.dryRun).toBeFalse();
    });

    it(`should get the github-token input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(`github-token`, { required: false });
      expect(service.inputs$$?.githubToken).toStrictEqual(`dummy-github-token`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = service.setInputs();

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

      service.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Common inputs`);
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        service.inputs$$ = createHydratedMock<ICommonInputs>({
          dryRun: false,
          githubToken: `dummy-github-token`,
        });
      });

      it(`should log the dry-run input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-├──`, `input-dry-run`, `value-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `dry-run`);
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(4);

        service.logInputs();

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

      service.logInputs();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.logInputs();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`getInputs()`, (): void => {
    describe(`when the common inputs are unset`, (): void => {
      beforeEach((): void => {
        delete service.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): ICommonInputs => service.getInputs()).toThrow(new Error(`The common inputs are unset`));
      });
    });

    describe(`when the common inputs are set`, (): void => {
      let inputs: ICommonInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<ICommonInputs>();
        service.inputs$$ = inputs;
      });

      it(`should return the common inputs`, (): void => {
        expect.assertions(1);

        const result = service.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
