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
  let service: IssuesInputsService;

  beforeEach((): void => {
    service = IssuesInputsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesInputsService`, (): void => {
      expect.assertions(1);

      service = IssuesInputsService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesInputsService));
    });

    it(`should return the created IssuesInputsService`, (): void => {
      expect.assertions(1);

      const result = IssuesInputsService.getInstance();

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

    it(`should get, parse and set the issues inputs coming from the action`, (): void => {
      expect.assertions(2);

      service.initialize();

      expect(setInputsSpy).toHaveBeenCalledTimes(1);
      expect(setInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the list of issues inputs and their values`, (): void => {
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
      service.inputs$$ = createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
        issueAddLabelsAfterClose: [`extra-close-label-1`, `extra-close-label-2`],
        issueAddLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`],
        issueCloseComment: `issue-close-comment`,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueIgnoreAllAssignees: true,
        issueIgnoreAllLabels: true,
        issueIgnoreAllMilestones: true,
        issueIgnoreAllProjectCards: true,
        issueIgnoreAnyAssignees: [`assignee-1`, `assignee-2`],
        issueIgnoreAnyLabels: [`label-1`, `label-2`],
        issueIgnoreAnyMilestones: [`milestone-1`, `milestone-2`],
        issueIgnoreAnyProjectCards: [`project-card-1`, `project-card-2`],
        issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        issueLimitApiMutationsCount: 100,
        issueLimitApiQueriesCount: 100,
        issueOnlyAnyAssignees: [`assignee-1`, `assignee-2`],
        issueOnlyAnyMilestones: [`milestone-1`, `milestone-2`],
        issueOnlyAnyProjectCards: [`project-card-1`, `project-card-2`],
        issueOnlyWithAssignees: true,
        issueProcessing: true,
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

    it(`should get the issue-add-labels-after-close input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(1, `issue-add-labels-after-close`, { required: false });
      expect(service.inputs$$?.issueAddLabelsAfterClose).toStrictEqual([
        `dummy-issue-add-labels-after-close-1`,
        `dummy-issue-add-labels-after-close-2`,
      ]);
    });

    it(`should get the issue-add-labels-after-stale input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(2, `issue-add-labels-after-stale`, { required: false });
      expect(service.inputs$$?.issueAddLabelsAfterStale).toStrictEqual([
        `dummy-issue-add-labels-after-stale-1`,
        `dummy-issue-add-labels-after-stale-2`,
      ]);
    });

    it(`should get the issue-close-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(1, `issue-close-comment`, { required: false });
      expect(service.inputs$$?.issueCloseComment).toBe(`dummy-issue-close-comment`);
    });

    it(`should get the issue-days-before-close input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(4);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(1, `issue-days-before-close`, {
        required: false,
      });
      expect(service.inputs$$?.issueDaysBeforeClose).toBe(666);
    });

    it(`should get the issue-days-before-stale input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(4);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(2, `issue-days-before-stale`, {
        required: false,
      });
      expect(service.inputs$$?.issueDaysBeforeStale).toBe(666);
    });

    it(`should get the issue-ignore-all-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(1, `issue-ignore-all-assignees`, { required: false });
      expect(service.inputs$$?.issueIgnoreAllAssignees).toBeFalse();
    });

    it(`should get the issue-ignore-all-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-all-labels`, { required: false });
      expect(service.inputs$$?.issueIgnoreAllLabels).toBeFalse();
    });

    it(`should get the issue-ignore-all-milestones input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(3, `issue-ignore-all-milestones`, { required: false });
      expect(service.inputs$$?.issueIgnoreAllMilestones).toBeFalse();
    });

    it(`should get the issue-ignore-all-project-cards input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(4, `issue-ignore-all-project-cards`, { required: false });
      expect(service.inputs$$?.issueIgnoreAllProjectCards).toBeFalse();
    });

    it(`should get the issue-ignore-any-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(3, `issue-ignore-any-assignees`, { required: false });
      expect(service.inputs$$?.issueIgnoreAnyAssignees).toStrictEqual([
        `dummy-issue-ignore-any-assignees-1`,
        `dummy-issue-ignore-any-assignees-2`,
      ]);
    });

    it(`should get the issue-ignore-any-labels input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(4, `issue-ignore-any-labels`, { required: false });
      expect(service.inputs$$?.issueIgnoreAnyLabels).toStrictEqual([
        `dummy-issue-ignore-any-labels-1`,
        `dummy-issue-ignore-any-labels-2`,
      ]);
    });

    it(`should get the issue-ignore-any-milestones input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(5, `issue-ignore-any-milestones`, { required: false });
      expect(service.inputs$$?.issueIgnoreAnyMilestones).toStrictEqual([
        `dummy-issue-ignore-any-milestones-1`,
        `dummy-issue-ignore-any-milestones-2`,
      ]);
    });

    it(`should get the issue-ignore-any-project-cards input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(6, `issue-ignore-any-project-cards`, {
        required: false,
      });
      expect(service.inputs$$?.issueIgnoreAnyProjectCards).toStrictEqual([
        `dummy-issue-ignore-any-project-cards-1`,
        `dummy-issue-ignore-any-project-cards-2`,
      ]);
    });

    it(`should get the issue-ignore-before-creation-date input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(2, `issue-ignore-before-creation-date`, { required: false });
      expect(service.inputs$$?.issueIgnoreBeforeCreationDate).toBe(`dummy-issue-ignore-before-creation-date`);
    });

    it(`should get the issue-limit-api-mutations-count input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(4);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(3, `issue-limit-api-mutations-count`, {
        required: false,
      });
      expect(service.inputs$$?.issueLimitApiMutationsCount).toBe(666);
    });

    it(`should get the issue-limit-api-queries-count input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenCalledTimes(4);
      expect(coreInputsServiceGetNumberInputSpy).toHaveBeenNthCalledWith(4, `issue-limit-api-queries-count`, {
        required: false,
      });
      expect(service.inputs$$?.issueLimitApiQueriesCount).toBe(666);
    });

    it(`should get the issue-only-any-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(7, `issue-only-any-assignees`, { required: false });
      expect(service.inputs$$?.issueOnlyAnyAssignees).toStrictEqual([
        `dummy-issue-only-any-assignees-1`,
        `dummy-issue-only-any-assignees-2`,
      ]);
    });

    it(`should get the issue-only-any-milestones input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(8, `issue-only-any-milestones`, { required: false });
      expect(service.inputs$$?.issueOnlyAnyMilestones).toStrictEqual([
        `dummy-issue-only-any-milestones-1`,
        `dummy-issue-only-any-milestones-2`,
      ]);
    });

    it(`should get the issue-only-any-project-cards input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetMultilineInputSpy).toHaveBeenCalledTimes(9);
      expect(coreGetMultilineInputSpy).toHaveBeenNthCalledWith(9, `issue-only-any-project-cards`, { required: false });
      expect(service.inputs$$?.issueOnlyAnyProjectCards).toStrictEqual([
        `dummy-issue-only-any-project-cards-1`,
        `dummy-issue-only-any-project-cards-2`,
      ]);
    });

    it(`should get the issue-only-with-assignees input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(5, `issue-only-with-assignees`, { required: false });
      expect(service.inputs$$?.issueOnlyWithAssignees).toBeFalse();
    });

    it(`should get the issue-processing input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetBooleanInputSpy).toHaveBeenCalledTimes(6);
      expect(coreGetBooleanInputSpy).toHaveBeenNthCalledWith(6, `issue-processing`, { required: false });
      expect(service.inputs$$?.issueProcessing).toBeFalse();
    });

    it(`should get the issue-stale-comment input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(3, `issue-stale-comment`, { required: false });
      expect(service.inputs$$?.issueStaleComment).toBe(`dummy-issue-stale-comment`);
    });

    it(`should get the issue-stale-label input, parse it and set it`, (): void => {
      expect.assertions(3);

      service.setInputs();

      expect(coreGetInputSpy).toHaveBeenCalledTimes(4);
      expect(coreGetInputSpy).toHaveBeenNthCalledWith(4, `issue-stale-label`, { required: false });
      expect(service.inputs$$?.issueStaleLabel).toBe(`dummy-issue-stale-label`);
    });

    it(`should return the list of parsed inputs`, (): void => {
      expect.assertions(1);

      const result = service.setInputs();

      expect(result).toStrictEqual({
        issueAddLabelsAfterClose: [`dummy-issue-add-labels-after-close-1`, `dummy-issue-add-labels-after-close-2`],
        issueAddLabelsAfterStale: [`dummy-issue-add-labels-after-stale-1`, `dummy-issue-add-labels-after-stale-2`],
        issueCloseComment: `dummy-issue-close-comment`,
        issueDaysBeforeClose: 666,
        issueDaysBeforeStale: 666,
        issueIgnoreAllAssignees: false,
        issueIgnoreAllLabels: false,
        issueIgnoreAllMilestones: false,
        issueIgnoreAllProjectCards: false,
        issueIgnoreAnyAssignees: [`dummy-issue-ignore-any-assignees-1`, `dummy-issue-ignore-any-assignees-2`],
        issueIgnoreAnyLabels: [`dummy-issue-ignore-any-labels-1`, `dummy-issue-ignore-any-labels-2`],
        issueIgnoreAnyMilestones: [`dummy-issue-ignore-any-milestones-1`, `dummy-issue-ignore-any-milestones-2`],
        issueIgnoreAnyProjectCards: [
          `dummy-issue-ignore-any-project-cards-1`,
          `dummy-issue-ignore-any-project-cards-2`,
        ],
        issueIgnoreBeforeCreationDate: `dummy-issue-ignore-before-creation-date`,
        issueLimitApiMutationsCount: 666,
        issueLimitApiQueriesCount: 666,
        issueOnlyAnyAssignees: [`dummy-issue-only-any-assignees-1`, `dummy-issue-only-any-assignees-2`],
        issueOnlyAnyMilestones: [`dummy-issue-only-any-milestones-1`, `dummy-issue-only-any-milestones-2`],
        issueOnlyAnyProjectCards: [`dummy-issue-only-any-project-cards-1`, `dummy-issue-only-any-project-cards-2`],
        issueOnlyWithAssignees: false,
        issueProcessing: false,
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

      service.logInputs();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Issues inputs`);
    });

    describe(`when the inputs are set`, (): void => {
      beforeEach((): void => {
        service.inputs$$ = createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
          issueAddLabelsAfterClose: [`dummy-extra-close-label-1`, `dummy-extra-close-label-2`],
          issueAddLabelsAfterStale: [`dummy-extra-stale-label-1`, `dummy-extra-stale-label-2`],
          issueCloseComment: `dummy-issue-close-comment`,
          issueDaysBeforeClose: 666,
          issueDaysBeforeStale: 666,
          issueIgnoreAllAssignees: false,
          issueIgnoreAllLabels: false,
          issueIgnoreAllMilestones: false,
          issueIgnoreAllProjectCards: false,
          issueIgnoreAnyAssignees: [`dummy-assignee-1`, `dummy-assignee-2`],
          issueIgnoreAnyLabels: [`dummy-label-1`, `dummy-label-2`],
          issueIgnoreAnyMilestones: [`dummy-milestone-1`, `dummy-milestone-2`],
          issueIgnoreAnyProjectCards: [`dummy-project-card-1`, `dummy-project-card-2`],
          issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
            includeOffset: false,
          }),
          issueLimitApiMutationsCount: 666,
          issueLimitApiQueriesCount: 666,
          issueOnlyAnyAssignees: [`dummy-assignee-1`, `dummy-assignee-2`],
          issueOnlyAnyMilestones: [`dummy-milestone-1`, `dummy-milestone-2`],
          issueOnlyAnyProjectCards: [`dummy-project-card-1`, `dummy-project-card-2`],
          issueOnlyWithAssignees: false,
          issueProcessing: false,
          issueStaleComment: `dummy-issue-stale-comment`,
          issueStaleLabel: `dummy-issue-stale-label`,
        });
      });

      it(`should log the issue add labels after close input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `input-issue-add-labels-after-close`,
          `value-dummy-extra-close-label-1,dummy-extra-close-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(1, `issue-add-labels-after-close`);
      });

      it(`should log the issue add labels after stale input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `input-issue-add-labels-after-stale`,
          `value-dummy-extra-stale-label-1,dummy-extra-stale-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(2, `issue-add-labels-after-stale`);
      });

      it(`should log the issue close comment input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `input-issue-close-comment`,
          `value-dummy-issue-close-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(3, `issue-close-comment`);
      });

      it(`should log the issue days before close input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `input-issue-days-before-close`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(4, `issue-days-before-close`);
      });

      it(`should log the issue days before stale input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `input-issue-days-before-stale`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(5, `issue-days-before-stale`);
      });

      it(`should log the issue ignore all assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `input-issue-ignore-all-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(6, `issue-ignore-all-assignees`);
      });

      it(`should log the issue ignore all labels input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-├──`,
          `input-issue-ignore-all-labels`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(7, `issue-ignore-all-labels`);
      });

      it(`should log the issue ignore all milestones input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          8,
          `white-├──`,
          `input-issue-ignore-all-milestones`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(8, `issue-ignore-all-milestones`);
      });

      it(`should log the issue ignore all project cards input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          9,
          `white-├──`,
          `input-issue-ignore-all-project-cards`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(9, `issue-ignore-all-project-cards`);
      });

      it(`should log the issue ignore any assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          10,
          `white-├──`,
          `input-issue-ignore-any-assignees`,
          `value-dummy-assignee-1,dummy-assignee-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(10, `issue-ignore-any-assignees`);
      });

      it(`should log the issue ignore any labels input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          11,
          `white-├──`,
          `input-issue-ignore-any-labels`,
          `value-dummy-label-1,dummy-label-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(11, `issue-ignore-any-labels`);
      });

      it(`should log the issue ignore any milestones input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          12,
          `white-├──`,
          `input-issue-ignore-any-milestones`,
          `value-dummy-milestone-1,dummy-milestone-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(12, `issue-ignore-any-milestones`);
      });

      it(`should log the issue ignore any project cards input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          13,
          `white-├──`,
          `input-issue-ignore-any-project-cards`,
          `value-dummy-project-card-1,dummy-project-card-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(13, `issue-ignore-any-project-cards`);
      });

      it(`should log the issue ignore before creation date input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          14,
          `white-├──`,
          `input-issue-ignore-before-creation-date`,
          `value-2020-01-01T00:00:00.000`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(14, `issue-ignore-before-creation-date`);
      });

      it(`should log the issue limit api mutations count input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          15,
          `white-├──`,
          `input-issue-limit-api-mutations-count`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(15, `issue-limit-api-mutations-count`);
      });

      it(`should log the issue limit api queries count input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          16,
          `white-├──`,
          `input-issue-limit-api-queries-count`,
          `value-666`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(16, `issue-limit-api-queries-count`);
      });

      it(`should log the issue only any assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          17,
          `white-├──`,
          `input-issue-only-any-assignees`,
          `value-dummy-assignee-1,dummy-assignee-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(17, `issue-only-any-assignees`);
      });

      it(`should log the issue only any milestones input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          18,
          `white-├──`,
          `input-issue-only-any-milestones`,
          `value-dummy-milestone-1,dummy-milestone-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(18, `issue-only-any-milestones`);
      });

      it(`should log the issue only any project cards input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          19,
          `white-├──`,
          `input-issue-only-any-project-cards`,
          `value-dummy-project-card-1,dummy-project-card-2`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(19, `issue-only-any-project-cards`);
      });

      it(`should log the issue only with assignees input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          20,
          `white-├──`,
          `input-issue-only-with-assignees`,
          `value-false`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(20, `issue-only-with-assignees`);
      });

      it(`should log the issue processing input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(21, `white-├──`, `input-issue-processing`, `value-false`);
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(21, `issue-processing`);
      });

      it(`should log the issue stale comment input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          22,
          `white-├──`,
          `input-issue-stale-comment`,
          `value-dummy-issue-stale-comment`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(22, `issue-stale-comment`);
      });

      it(`should log the issue stale label input`, (): void => {
        expect.assertions(4);

        service.logInputs();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          23,
          `white-└──`,
          `input-issue-stale-label`,
          `value-dummy-issue-stale-label`
        );
        expect(loggerServiceInputSpy).toHaveBeenCalledTimes(23);
        expect(loggerServiceInputSpy).toHaveBeenNthCalledWith(23, `issue-stale-label`);
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
    describe(`when the issues inputs are unset`, (): void => {
      beforeEach((): void => {
        delete service.inputs$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): IIssuesInputs => service.getInputs()).toThrow(new Error(`The issues inputs are unset`));
      });
    });

    describe(`when the issues inputs are set`, (): void => {
      let inputs: IIssuesInputs;

      beforeEach((): void => {
        inputs = createHydratedMock<IIssuesInputs>();
        service.inputs$$ = inputs;
      });

      it(`should return the issues inputs`, (): void => {
        expect.assertions(1);

        const result = service.getInputs();

        expect(result).toStrictEqual(inputs);
      });
    });
  });
});
