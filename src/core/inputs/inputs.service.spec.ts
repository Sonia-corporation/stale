import { EInputs } from '@core/inputs/inputs.enum';
import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { InputOptions } from '@actions/core';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`inputsService`, (): void => {
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
    let coreGetMultilineInputSpy: jest.SpyInstance;
    let getNumberInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      InputsService.inputs$$ = createHydratedMock<IInputs>({
        dryRun: true,
        githubToken: `github-token`,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueIgnoreAllAssignees: true,
        issueIgnoreAllLabels: true,
        issueIgnoreAnyLabels: [`label-1`, `label-2`],
        issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        issueStaleLabel: `issue-stale-label`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
      coreGetMultilineInputSpy = jest
        .spyOn(core, `getMultilineInput`)
        .mockImplementation((name: string): string[] => [`dummy-${name}-1`, `dummy-${name}-2`]);
      getNumberInputSpy = jest.spyOn(InputsService, `getNumberInput$$`).mockReturnValue(666);
    });

    it(`should get the dry-run input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(1, `dry-run`, { required: false });
      expect(InputsService.inputs$$?.dryRun).toBeFalse();
    });

    it(`should get the github-token input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(1, `github-token`, { required: false });
      expect(InputsService.inputs$$?.githubToken).toStrictEqual(`dummy-github-token`);
    });

    it(`should get the issue-days-before-close input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(getNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(getNumberInputSpy).toHaveBeenNthCalledWith(1, `issue-days-before-close`, { required: false });
      expect(InputsService.inputs$$?.issueDaysBeforeClose).toBe(666);
    });

    it(`should get the issue-days-before-stale input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(getNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(getNumberInputSpy).toHaveBeenNthCalledWith(2, `issue-days-before-stale`, { required: false });
      expect(InputsService.inputs$$?.issueDaysBeforeStale).toBe(666);
    });

    it(`should get the issue-ignore-all-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-all-assignees`, { required: false });
      expect(InputsService.inputs$$?.issueIgnoreAllAssignees).toBeFalse();
    });

    it(`should get the issue-ignore-all-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(3, `issue-ignore-all-labels`, { required: false });
      expect(InputsService.inputs$$?.issueIgnoreAllLabels).toBeFalse();
    });

    it(`should get the issue-ignore-any-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(1);
      expect(coreGetMultilineInputSpy).toHaveBeenCalledWith(`issue-ignore-any-labels`, { required: false });
      expect(InputsService.inputs$$?.issueIgnoreAnyLabels).toStrictEqual([
        `dummy-issue-ignore-any-labels-1`,
        `dummy-issue-ignore-any-labels-2`,
      ]);
    });

    it(`should get the issue-ignore-before-creation-date input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-before-creation-date`, { required: false });
      expect(InputsService.inputs$$?.issueIgnoreBeforeCreationDate).toStrictEqual(
        `dummy-issue-ignore-before-creation-date`
      );
    });

    it(`should get the issue-stale-label input, parse it and set it`, (): void => {
      expect.assertions(3);

      InputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(3, `issue-stale-label`, { required: false });
      expect(InputsService.inputs$$?.issueStaleLabel).toStrictEqual(`dummy-issue-stale-label`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = InputsService.setInputs();

      expect(result).toStrictEqual({
        dryRun: false,
        githubToken: `dummy-github-token`,
        issueDaysBeforeClose: 666,
        issueDaysBeforeStale: 666,
        issueIgnoreAllAssignees: false,
        issueIgnoreAllLabels: false,
        issueIgnoreAnyLabels: [`dummy-issue-ignore-any-labels-1`, `dummy-issue-ignore-any-labels-2`],
        issueIgnoreBeforeCreationDate: `dummy-issue-ignore-before-creation-date`,
        issueStaleLabel: `dummy-issue-stale-label`,
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
          issueDaysBeforeClose: 666,
          issueDaysBeforeStale: 666,
          issueIgnoreAllAssignees: false,
          issueIgnoreAllLabels: false,
          issueIgnoreAnyLabels: [`dummy-label-1`, `dummy-label-2`],
          issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
            includeOffset: false,
          }),
          issueStaleLabel: `dummy-issue-stale-label`,
        });
      });

      it(`should log the dry run input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-├──`, `input-dry-run`, `value-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `dry-run`);
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `input-github-token`,
          `value-dummy-github-token`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `github-token`);
      });

      it(`should log the issue days before close input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `input-issue-days-before-close`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(3, `issue-days-before-close`);
      });

      it(`should log the issue days before stale input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `input-issue-days-before-stale`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(4, `issue-days-before-stale`);
      });

      it(`should log the issue ignore all assignees input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `input-issue-ignore-all-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(5, `issue-ignore-all-assignees`);
      });

      it(`should log the issue ignore all labels input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `input-issue-ignore-all-labels`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(6, `issue-ignore-all-labels`);
      });

      it(`should log the issue ignore any labels input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `input-issue-ignore-any-labels`,
          `value-dummy-label-1,dummy-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(7, `issue-ignore-any-labels`);
      });

      it(`should log the issue ignore before creation date input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `input-issue-ignore-before-creation-date`,
          `value-2020-01-01T00:00:00.000`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(8, `issue-ignore-before-creation-date`);
      });

      it(`should log the issue stale label input`, (): void => {
        expect.assertions(4);

        InputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-└──`,
          `input-issue-stale-label`,
          `value-dummy-issue-stale-label`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(9);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(9, `issue-stale-label`);
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

  describe(`getNumberInput$$()`, (): void => {
    let input: EInputs;
    let options: InputOptions;

    let coreGetInputSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      input = EInputs.ISSUE_IGNORE_ANY_LABELS;
      options = createHydratedMock<InputOptions>();

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockReturnValue(`0`);
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
    });

    it(`should get the value related to the given input`, (): void => {
      expect.assertions(2);

      InputsService.getNumberInput$$(input, options);

      expect(coreGetInputSpy).toHaveReturnedTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(input, options);
    });

    describe.each([``, `yolo`])(
      `when the value of the input cannot be parsed as a number (%s)`,
      (value: string): void => {
        beforeEach((): void => {
          coreGetInputSpy.mockReturnValue(value);
        });

        it(`should log an error and throw`, (): void => {
          expect.assertions(3);

          expect((): number => InputsService.getNumberInput$$(input, options)).toThrow(
            `Wrong value given to the input number ${input}`
          );

          expect(loggerServiceErrorSpy).toHaveReturnedTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(
            `Wrong value given to the input`,
            `value-${input}`,
            `white-->`,
            `value-${value}`
          );
        });
      }
    );

    describe.each`
      value  | parsedValue
      ${`0`} | ${0}
      ${`1`} | ${1}
    `(
      `when the value of the input can be parsed as a number ($value)`,
      ({ value, parsedValue }: IGetNumberInputMatrix): void => {
        beforeEach((): void => {
          coreGetInputSpy.mockReturnValue(value);
        });

        it(`should return the input value parsed as a number`, (): void => {
          expect.assertions(1);

          const result = InputsService.getNumberInput$$(input, options);

          expect(result).toStrictEqual(parsedValue);
        });
      }
    );
  });
});

interface IGetNumberInputMatrix {
  parsedValue: number;
  value: string;
}
