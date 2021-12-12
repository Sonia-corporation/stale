import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssuesInputsService`, (): void => {
  describe(`initialize()`, (): void => {
    let setInputsSpy: jest.SpyInstance;
    let logInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      setInputsSpy = jest.spyOn(IssuesInputsService, `setInputs`).mockImplementation();
      logInputsSpy = jest.spyOn(IssuesInputsService, `logInputs`).mockImplementation();
    });

    it(`should get, parse and set the issues inputs coming from the action`, (): void => {
      expect.assertions(2);

      IssuesInputsService.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of issues inputs and their values`, (): void => {
      expect.assertions(2);

      IssuesInputsService.initialize();

      expect(logInputsSpy).toHaveBeenCalledTimes(1);
      expect(logInputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesInputsService.initialize();

      expect(result).toStrictEqual(IssuesInputsService);
    });
  });

  describe(`setInputs()`, (): void => {
    let coreGetInputSpy: jest.SpyInstance;
    let coreGetBooleanInputSpy: jest.SpyInstance;
    let coreGetMultilineInputSpy: jest.SpyInstance;
    let coreInputsServiceGetNumberInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      IssuesInputsService.inputs$$ = createHydratedMock<IIssuesInputs>({
        issueCloseComment: `issue-close-comment`,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueIgnoreAllAssignees: true,
        issueIgnoreAllLabels: true,
        issueIgnoreAllProjectCards: true,
        issueIgnoreAnyAssignees: [`assignee-1`, `assignee-2`],
        issueIgnoreAnyLabels: [`label-1`, `label-2`],
        issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        issueStaleComment: `issue-stale-comment`,
        issueStaleLabel: `issue-stale-label`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
      coreGetMultilineInputSpy = jest
        .spyOn(core, `getMultilineInput`)
        .mockImplementation((name: string): string[] => [`dummy-${name}-1`, `dummy-${name}-2`]);
      coreInputsServiceGetNumberInputSpy = jest.spyOn(CoreInputsService, `getNumberInput$$`).mockReturnValue(666);
    });

    it(`should get the issue-close-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(1, `issue-close-comment`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueCloseComment).toStrictEqual(`dummy-issue-close-comment`);
    });

    it(`should get the issue-days-before-close input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(1, `issue-days-before-close`, {
        required: false,
      });
      expect(IssuesInputsService.inputs$$?.issueDaysBeforeClose).toBe(666);
    });

    it(`should get the issue-days-before-stale input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(2, `issue-days-before-stale`, {
        required: false,
      });
      expect(IssuesInputsService.inputs$$?.issueDaysBeforeStale).toBe(666);
    });

    it(`should get the issue-ignore-all-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(1, `issue-ignore-all-assignees`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreAllAssignees).toBeFalse();
    });

    it(`should get the issue-ignore-all-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-all-labels`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreAllLabels).toBeFalse();
    });

    it(`should get the issue-ignore-all-project-cards input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(3, `issue-ignore-all-project-cards`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreAllProjectCards).toBeFalse();
    });

    it(`should get the issue-ignore-any-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(2);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(1, `issue-ignore-any-assignees`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreAnyAssignees).toStrictEqual([
        `dummy-issue-ignore-any-assignees-1`,
        `dummy-issue-ignore-any-assignees-2`,
      ]);
    });

    it(`should get the issue-ignore-any-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(2);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-any-labels`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreAnyLabels).toStrictEqual([
        `dummy-issue-ignore-any-labels-1`,
        `dummy-issue-ignore-any-labels-2`,
      ]);
    });

    it(`should get the issue-ignore-before-creation-date input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-before-creation-date`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueIgnoreBeforeCreationDate).toStrictEqual(
        `dummy-issue-ignore-before-creation-date`
      );
    });

    it(`should get the issue-stale-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(3, `issue-stale-comment`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueStaleComment).toStrictEqual(`dummy-issue-stale-comment`);
    });

    it(`should get the issue-stale-label input, parse it and set it`, (): void => {
      expect.assertions(3);

      IssuesInputsService.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(4, `issue-stale-label`, { required: false });
      expect(IssuesInputsService.inputs$$?.issueStaleLabel).toStrictEqual(`dummy-issue-stale-label`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = IssuesInputsService.setInputs();

      expect(result).toStrictEqual({
        issueCloseComment: `dummy-issue-close-comment`,
        issueDaysBeforeClose: 666,
        issueDaysBeforeStale: 666,
        issueIgnoreAllAssignees: false,
        issueIgnoreAllLabels: false,
        issueIgnoreAllProjectCards: false,
        issueIgnoreAnyAssignees: [`dummy-issue-ignore-any-assignees-1`, `dummy-issue-ignore-any-assignees-2`],
        issueIgnoreAnyLabels: [`dummy-issue-ignore-any-labels-1`, `dummy-issue-ignore-any-labels-2`],
        issueIgnoreBeforeCreationDate: `dummy-issue-ignore-before-creation-date`,
        issueStaleComment: `dummy-issue-stale-comment`,
        issueStaleLabel: `dummy-issue-stale-label`,
      } as IIssuesInputs);
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

      IssuesInputsService.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Issues inputs`);
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        IssuesInputsService.inputs$$ = createHydratedMock<IIssuesInputs>({
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

      it(`should log the issue close comment input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `input-issue-close-comment`,
          `value-dummy-issue-close-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `issue-close-comment`);
      });

      it(`should log the issue days before close input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `input-issue-days-before-close`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `issue-days-before-close`);
      });

      it(`should log the issue days before stale input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `input-issue-days-before-stale`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(3, `issue-days-before-stale`);
      });

      it(`should log the issue ignore all assignees input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `input-issue-ignore-all-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(4, `issue-ignore-all-assignees`);
      });

      it(`should log the issue ignore all labels input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `input-issue-ignore-all-labels`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(5, `issue-ignore-all-labels`);
      });

      it(`should log the issue ignore all project cards input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `input-issue-ignore-all-project-cards`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(6, `issue-ignore-all-project-cards`);
      });

      it(`should log the issue ignore any assignees input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `input-issue-ignore-any-assignees`,
          `value-dummy-assignee-1,dummy-assignee-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(7, `issue-ignore-any-assignees`);
      });

      it(`should log the issue ignore any labels input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `input-issue-ignore-any-labels`,
          `value-dummy-label-1,dummy-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(8, `issue-ignore-any-labels`);
      });

      it(`should log the issue ignore before creation date input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-├──`,
          `input-issue-ignore-before-creation-date`,
          `value-2020-01-01T00:00:00.000`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(9, `issue-ignore-before-creation-date`);
      });

      it(`should log the issue stale comment input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-├──`,
          `input-issue-stale-comment`,
          `value-dummy-issue-stale-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(10, `issue-stale-comment`);
      });

      it(`should log the issue stale label input`, (): void => {
        expect.assertions(4);

        IssuesInputsService.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-└──`,
          `input-issue-stale-label`,
          `value-dummy-issue-stale-label`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(11, `issue-stale-label`);
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      IssuesInputsService.logInputs();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = IssuesInputsService.logInputs();

      expect(result).toStrictEqual(IssuesInputsService);
    });
  });

  describe(`getInputs()`, (): void => {
    describe(`when the issues inputs are unset`, (): void => {
      beforeEach((): void => {
        delete IssuesInputsService.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): IIssuesInputs => IssuesInputsService.getInputs()).toThrow(new Error(`The issues inputs are unset`));
      });
    });

    describe(`when the issues inputs are set`, (): void => {
      let inputs: IIssuesInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<IIssuesInputs>();
        IssuesInputsService.inputs$$ = inputs;
      });

      it(`should return the issues inputs`, (): void => {
        expect.assertions(1);

        const result = IssuesInputsService.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
