import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { InputsService } from '@core/inputs/inputs.service';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`InputsService`, (): void => {
  describe(`initialize()`, (): void => {
    let commonInputsServiceInitializeSpy: jest.SpyInstance;
    let issuesInputsServiceServiceInitializeSpy: jest.SpyInstance;
    let pullRequestsInputsServiceServiceInitializeSpy: jest.SpyInstance;

    beforeEach((): void => {
      commonInputsServiceInitializeSpy = jest
        .spyOn(CommonInputsService.getInstance(), `initialize`)
        .mockImplementation();
      issuesInputsServiceServiceInitializeSpy = jest
        .spyOn(IssuesInputsService.getInstance(), `initialize`)
        .mockImplementation();
      pullRequestsInputsServiceServiceInitializeSpy = jest
        .spyOn(PullRequestsInputsService.getInstance(), `initialize`)
        .mockImplementation();
    });

    it(`should initialize the common inputs service`, (): void => {
      expect.assertions(2);

      InputsService.initialize();

      expect(commonInputsServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(commonInputsServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should initialize the issues inputs service`, (): void => {
      expect.assertions(2);

      InputsService.initialize();

      expect(issuesInputsServiceServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(issuesInputsServiceServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should initialize the pull request inputs service`, (): void => {
      expect.assertions(2);

      InputsService.initialize();

      expect(pullRequestsInputsServiceServiceInitializeSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsInputsServiceServiceInitializeSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = InputsService.initialize();

      expect(result).toStrictEqual(InputsService);
    });
  });

  describe(`logInputs()`, (): void => {
    let commonInputsServiceLogInputsSpy: jest.SpyInstance;
    let issuesInputsServiceServiceLogInputsSpy: jest.SpyInstance;
    let pullRequestsInputsServiceServiceLogInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      commonInputsServiceLogInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `logInputs`).mockImplementation();
      issuesInputsServiceServiceLogInputsSpy = jest
        .spyOn(IssuesInputsService.getInstance(), `logInputs`)
        .mockImplementation();
      pullRequestsInputsServiceServiceLogInputsSpy = jest
        .spyOn(PullRequestsInputsService.getInstance(), `logInputs`)
        .mockImplementation();
    });

    it(`should log the common inputs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(commonInputsServiceLogInputsSpy).toHaveBeenCalledTimes(1);
      expect(commonInputsServiceLogInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the issues inputs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(issuesInputsServiceServiceLogInputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesInputsServiceServiceLogInputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the pull request inputs`, (): void => {
      expect.assertions(2);

      InputsService.logInputs();

      expect(pullRequestsInputsServiceServiceLogInputsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsInputsServiceServiceLogInputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = InputsService.logInputs();

      expect(result).toStrictEqual(InputsService);
    });
  });
});
