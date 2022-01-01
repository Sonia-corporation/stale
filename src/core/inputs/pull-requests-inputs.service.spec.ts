import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsInputsService`, (): void => {
  let service: PullRequestsInputsService;

  beforeEach((): void => {
    service = PullRequestsInputsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a PullRequestsInputsService`, (): void => {
      expect.assertions(1);

      service = PullRequestsInputsService.getInstance();

      expect(service).toStrictEqual(expect.any(PullRequestsInputsService));
    });

    it(`should return the created PullRequestsInputsService`, (): void => {
      expect.assertions(1);

      const result = PullRequestsInputsService.getInstance();

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

    it(`should get, parse and set the pull requests inputs coming from the action`, (): void => {
      expect.assertions(2);

      service.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of pull requests inputs and their values`, (): void => {
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
    let coreGetMultilineInputSpy: jest.SpyInstance;
    let coreInputsServiceGetNumberInputSpy: jest.SpyInstance;

    beforeEach((): void => {
      service.inputs$$ = createHydratedMock<IPullRequestsInputs>({
        pullRequestCloseComment: `pull-request-close-comment`,
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
        pullRequestIgnoreAllAssignees: true,
        pullRequestIgnoreAllLabels: true,
        pullRequestIgnoreAllProjectCards: true,
        pullRequestIgnoreAnyAssignees: [`assignee-1`, `assignee-2`],
        pullRequestIgnoreAnyLabels: [`label-1`, `label-2`],
        pullRequestIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        pullRequestStaleComment: `pull-request-stale-comment`,
        pullRequestStaleLabel: `pull-request-stale-label`,
      });

      coreGetInputSpy = jest.spyOn(core, `getInput`).mockImplementation((name: string): string => `dummy-${name}`);
      coreGetBooleanInputSpy = jest.spyOn(core, `getBooleanInput`).mockReturnValue(false);
      coreGetMultilineInputSpy = jest
        .spyOn(core, `getMultilineInput`)
        .mockImplementation((name: string): string[] => [`dummy-${name}-1`, `dummy-${name}-2`]);
      coreInputsServiceGetNumberInputSpy = jest.spyOn(CoreInputsService, `getNumberInput$$`).mockReturnValue(666);
    });

    it(`should get the pull-request-close-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(1, `pull-request-close-comment`, { required: false });
      expect(service.inputs$$?.pullRequestCloseComment).toBe(`dummy-pull-request-close-comment`);
    });

    it(`should get the pull-request-days-before-close input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(1, `pull-request-days-before-close`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestDaysBeforeClose).toBe(666);
    });

    it(`should get the pull-request-days-before-stale input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(2);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(2, `pull-request-days-before-stale`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestDaysBeforeStale).toBe(666);
    });

    it(`should get the pull-request-ignore-all-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(1, `pull-request-ignore-all-assignees`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestIgnoreAllAssignees).toBeFalse();
    });

    it(`should get the pull-request-ignore-all-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(2, `pull-request-ignore-all-labels`, { required: false });
      expect(service.inputs$$?.pullRequestIgnoreAllLabels).toBeFalse();
    });

    it(`should get the pull-request-ignore-all-project-cards input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(3);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(3, `pull-request-ignore-all-project-cards`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestIgnoreAllProjectCards).toBeFalse();
    });

    it(`should get the pull-request-ignore-any-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(2);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(1, `pull-request-ignore-any-assignees`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestIgnoreAnyAssignees).toStrictEqual([
        `dummy-pull-request-ignore-any-assignees-1`,
        `dummy-pull-request-ignore-any-assignees-2`,
      ]);
    });

    it(`should get the pull-request-ignore-any-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(2);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(2, `pull-request-ignore-any-labels`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestIgnoreAnyLabels).toStrictEqual([
        `dummy-pull-request-ignore-any-labels-1`,
        `dummy-pull-request-ignore-any-labels-2`,
      ]);
    });

    it(`should get the pull-request-ignore-before-creation-date input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(2, `pull-request-ignore-before-creation-date`, {
        required: false,
      });
      expect(service.inputs$$?.pullRequestIgnoreBeforeCreationDate).toBe(
        `dummy-pull-request-ignore-before-creation-date`
      );
    });

    it(`should get the pull-request-stale-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(3, `pull-request-stale-comment`, { required: false });
      expect(service.inputs$$?.pullRequestStaleComment).toBe(`dummy-pull-request-stale-comment`);
    });

    it(`should get the pull-request-stale-label input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(4, `pull-request-stale-label`, { required: false });
      expect(service.inputs$$?.pullRequestStaleLabel).toBe(`dummy-pull-request-stale-label`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = service.setInputs();

      expect(result).toStrictEqual({
        pullRequestCloseComment: `dummy-pull-request-close-comment`,
        pullRequestDaysBeforeClose: 666,
        pullRequestDaysBeforeStale: 666,
        pullRequestIgnoreAllAssignees: false,
        pullRequestIgnoreAllLabels: false,
        pullRequestIgnoreAllProjectCards: false,
        pullRequestIgnoreAnyAssignees: [
          `dummy-pull-request-ignore-any-assignees-1`,
          `dummy-pull-request-ignore-any-assignees-2`,
        ],
        pullRequestIgnoreAnyLabels: [
          `dummy-pull-request-ignore-any-labels-1`,
          `dummy-pull-request-ignore-any-labels-2`,
        ],
        pullRequestIgnoreBeforeCreationDate: `dummy-pull-request-ignore-before-creation-date`,
        pullRequestStaleComment: `dummy-pull-request-stale-comment`,
        pullRequestStaleLabel: `dummy-pull-request-stale-label`,
      } as IPullRequestsInputs);
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
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Pull requests inputs`);
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        service.inputs$$ = createHydratedMock<IPullRequestsInputs>({
          pullRequestCloseComment: `dummy-pull-request-close-comment`,
          pullRequestDaysBeforeClose: 666,
          pullRequestDaysBeforeStale: 666,
          pullRequestIgnoreAllAssignees: false,
          pullRequestIgnoreAllLabels: false,
          pullRequestIgnoreAllProjectCards: false,
          pullRequestIgnoreAnyAssignees: [`dummy-assignee-1`, `dummy-assignee-2`],
          pullRequestIgnoreAnyLabels: [`dummy-label-1`, `dummy-label-2`],
          pullRequestIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
            includeOffset: false,
          }),
          pullRequestStaleComment: `dummy-pull-request-stale-comment`,
          pullRequestStaleLabel: `dummy-pull-request-stale-label`,
        });
      });

      it(`should log the pull request close comment input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `input-pull-request-close-comment`,
          `value-dummy-pull-request-close-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `pull-request-close-comment`);
      });

      it(`should log the pull request days before close input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `input-pull-request-days-before-close`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `pull-request-days-before-close`);
      });

      it(`should log the pull request days before stale input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `input-pull-request-days-before-stale`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(3, `pull-request-days-before-stale`);
      });

      it(`should log the pull request ignore all assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `input-pull-request-ignore-all-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(4, `pull-request-ignore-all-assignees`);
      });

      it(`should log the pull request ignore all labels input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `input-pull-request-ignore-all-labels`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(5, `pull-request-ignore-all-labels`);
      });

      it(`should log the pull request ignore all project cards input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `input-pull-request-ignore-all-project-cards`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(6, `pull-request-ignore-all-project-cards`);
      });

      it(`should log the pull request ignore any assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `input-pull-request-ignore-any-assignees`,
          `value-dummy-assignee-1,dummy-assignee-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(7, `pull-request-ignore-any-assignees`);
      });

      it(`should log the pull request ignore any labels input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `input-pull-request-ignore-any-labels`,
          `value-dummy-label-1,dummy-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(8, `pull-request-ignore-any-labels`);
      });

      it(`should log the pull request ignore before creation date input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-├──`,
          `input-pull-request-ignore-before-creation-date`,
          `value-2020-01-01T00:00:00.000`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(9, `pull-request-ignore-before-creation-date`);
      });

      it(`should log the pull request stale comment input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-├──`,
          `input-pull-request-stale-comment`,
          `value-dummy-pull-request-stale-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(10, `pull-request-stale-comment`);
      });

      it(`should log the pull request stale label input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-└──`,
          `input-pull-request-stale-label`,
          `value-dummy-pull-request-stale-label`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(11);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(11, `pull-request-stale-label`);
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
    describe(`when the pull requests inputs are unset`, (): void => {
      beforeEach((): void => {
        delete service.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): IPullRequestsInputs => service.getInputs()).toThrow(new Error(`The pull requests inputs are unset`));
      });
    });

    describe(`when the pull requests inputs are set`, (): void => {
      let inputs: IPullRequestsInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<IPullRequestsInputs>();
        service.inputs$$ = inputs;
      });

      it(`should return the pull requests inputs`, (): void => {
        expect.assertions(1);

        const result = service.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
