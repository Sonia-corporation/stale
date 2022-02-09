import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { IInputs } from '@core/inputs/types/inputs';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { InputOptions } from '@actions/core';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`CoreInputsService`, (): void => {
  describe(`logInputs()`, (): void => {
    let groupName: string;
    let inputs: IInputs;

    let loggerServiceStartGroupSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceInputSpy: jest.SpyInstance;
    let loggerServiceEndGroupSpy: jest.SpyInstance;

    beforeEach((): void => {
      groupName = `dummy-group-name`;
      inputs = {
        marco: `polo`,
      };

      loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`);
      loggerServiceInputSpy = jest.spyOn(LoggerService, `input`);
      loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
    });

    it(`should create a group of logs`, (): void => {
      expect.assertions(2);

      CoreInputsService.logInputs(groupName, inputs);

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`dummy-group-name`);
    });

    describe(`when the inputs are not set`, (): void => {
      beforeEach((): void => {
        inputs = {};
      });

      it(`should not log`, (): void => {
        expect.assertions(2);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
        expect(loggerServiceInputSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the inputs are set (explicit example)`, (): void => {
      beforeEach((): void => {
        inputs = createHydratedMock<IInputs>({
          dryRun: false,
          githubToken: `dummy-github-token`,
          issueCloseComment: `dummy-issue-close-comment`,
          issueDaysBeforeClose: 666,
          issueDaysBeforeStale: 666,
          issueIgnoreAllAssignees: false,
          issueIgnoreAllLabels: false,
          issueIgnoreAllProjectCards: false,
          issueIgnoreAnyAssignees: [`dummy-assignee-1`, `dummy-assignee-2`],
          issueIgnoreAnyLabels: [`dummy-label-1`, `dummy-label-2`],
          issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
            includeOffset: false,
          }),
          issueStaleComment: `dummy-issue-stale-comment`,
          issueStaleLabel: `dummy-issue-stale-label`,
        });
      });

      it(`should log the dry-run input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `white-├──`, `input-dry-run`, `value-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `dry-run`);
      });

      it(`should log the github token input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `input-github-token`,
          `value-dummy-github-token`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `github-token`);
      });

      it(`should log the issue close comment input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `input-issue-close-comment`,
          `value-dummy-issue-close-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(3, `issue-close-comment`);
      });

      it(`should log the issue days before close input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `input-issue-days-before-close`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(4, `issue-days-before-close`);
      });

      it(`should log the issue days before stale input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `input-issue-days-before-stale`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(5, `issue-days-before-stale`);
      });

      it(`should log the issue ignore all assignees input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `input-issue-ignore-all-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(6, `issue-ignore-all-assignees`);
      });

      it(`should log the issue ignore all labels input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `input-issue-ignore-all-labels`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(7, `issue-ignore-all-labels`);
      });

      it(`should log the issue ignore all project cards input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `input-issue-ignore-all-project-cards`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(8, `issue-ignore-all-project-cards`);
      });

      it(`should log the issue ignore any assignees input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-├──`,
          `input-issue-ignore-any-assignees`,
          `value-dummy-assignee-1,dummy-assignee-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(9, `issue-ignore-any-assignees`);
      });

      it(`should log the issue ignore any labels input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-├──`,
          `input-issue-ignore-any-labels`,
          `value-dummy-label-1,dummy-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(10, `issue-ignore-any-labels`);
      });

      it(`should log the issue ignore before creation date input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-├──`,
          `input-issue-ignore-before-creation-date`,
          `value-2020-01-01T00:00:00.000`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(11, `issue-ignore-before-creation-date`);
      });

      it(`should log the issue stale comment input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          12,
          `white-├──`,
          `input-issue-stale-comment`,
          `value-dummy-issue-stale-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(12, `issue-stale-comment`);
      });

      it(`should log the issue stale label input`, (): void => {
        expect.assertions(4);

        CoreInputsService.logInputs(groupName, inputs);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          13,
          `white-└──`,
          `input-issue-stale-label`,
          `value-dummy-issue-stale-label`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(13);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(13, `issue-stale-label`);
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      CoreInputsService.logInputs(groupName, inputs);

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = CoreInputsService.logInputs(groupName, inputs);

      expect(result).toStrictEqual(CoreInputsService);
    });
  });

  describe(`getNumberInput$$()`, (): void => {
    let input: EInputs;
    let options: InputOptions;

    let coreGetInputSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let annotationsServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      input = EInputs.ISSUE_IGNORE_ANY_LABELS;
      options = createHydratedMock<InputOptions>();

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockReturnValue(`0`);
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
    });

    it(`should get the value related to the given input`, (): void => {
      expect.assertions(2);

      CoreInputsService.getNumberInput$$(input, options);

      expect(coreGetInputSpy).toHaveReturnedTimes(1);
      expect(coreGetInputSpy).toHaveBeenCalledWith(input, options);
    });

    describe.each([``, `yolo`])(
      `when the value of the input cannot be parsed as a number (%s)`,
      (value: string): void => {
        beforeEach((): void => {
          coreGetInputSpy.mockReturnValue(value);
        });

        it(`should log an error`, (): void => {
          expect.assertions(3);

          expect((): number => CoreInputsService.getNumberInput$$(input, options)).toThrow(
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

        it(`should log an error annotation`, (): void => {
          expect.assertions(3);

          expect((): number => CoreInputsService.getNumberInput$$(input, options)).toThrow(
            `Wrong value given to the input number ${input}`
          );

          expect(annotationsServiceErrorSpy).toHaveReturnedTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationError.WRONG_INPUT_VALUE);
        });

        it(`should throw`, (): void => {
          expect.assertions(1);

          expect((): number => CoreInputsService.getNumberInput$$(input, options)).toThrow(
            `Wrong value given to the input number ${input}`
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

          const result = CoreInputsService.getNumberInput$$(input, options);

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
