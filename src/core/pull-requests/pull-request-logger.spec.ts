import { PullRequestLogger } from '@core/pull-requests/pull-request-logger';
import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestLogger`, (): void => {
  let pullRequestNumber: IGithubApiPullRequestNumber;

  beforeEach((): void => {
    pullRequestNumber = 8;
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request number`, (): void => {
      expect.assertions(1);

      const result = new PullRequestLogger(pullRequestNumber);

      expect(result.pullRequestNumber).toBe(8);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestLogger: PullRequestLogger;

    beforeEach((): void => {
      pullRequestLogger = new PullRequestLogger(pullRequestNumber);
    });

    describe(`debug()`, (): void => {
      let loggerServiceDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      });

      it(`should log the given message and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.debug(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith(`blue-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`info()`, (): void => {
      let loggerServiceInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      });

      it(`should log the given message and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.info(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`blue-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`notice()`, (): void => {
      let loggerServiceNoticeSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceNoticeSpy = jest.spyOn(LoggerService, `notice`).mockImplementation();
      });

      it(`should log the given message and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.notice(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceNoticeSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceNoticeSpy).toHaveBeenCalledWith(`blue-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`warning()`, (): void => {
      let loggerServiceWarningSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceWarningSpy = jest.spyOn(LoggerService, `warning`).mockImplementation();
      });

      it(`should log the given message and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.warning(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceWarningSpy).toHaveBeenCalledWith(
          `blue-[#8]`,
          `whiteBright-dummy message 1 dummy message 2`
        );
      });
    });

    describe(`error()`, (): void => {
      let loggerServiceErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      });

      it(`should log the given message and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.error(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`blue-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`group()`, (): void => {
      let loggerServiceGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceGroupSpy = jest.spyOn(LoggerService, `group`).mockImplementation();
      });

      it(`should create a group logger and add the pull request number as a prefix`, async (): Promise<void> => {
        expect.assertions(3);

        await pullRequestLogger.group(`dummy name`, (): Promise<void> => Promise.resolve());

        expect(loggerServiceGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceGroupSpy.mock.calls[0][0]).toStrictEqual(`blue-[#8] whiteBright-dummy name`);
        expect(loggerServiceGroupSpy.mock.calls[0][1]).toBeFunction();
      });
    });

    describe(`startGroup()`, (): void => {
      let loggerServiceStartGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      });

      it(`should create a group logger and add the pull request number as a prefix`, (): void => {
        expect.assertions(2);

        pullRequestLogger.startGroup(`dummy name`);

        expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`blue-[#8]`, `whiteBright-dummy name`);
      });
    });

    describe(`endGroup()`, (): void => {
      let loggerServiceEndGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
      });

      it(`should stop the group logger`, (): void => {
        expect.assertions(2);

        pullRequestLogger.endGroup();

        expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
      });
    });

    describe(`getPrefix$$()`, (): void => {
      it(`should return the pull request number wrapped and in red`, (): void => {
        expect.assertions(1);

        const result = pullRequestLogger.getPrefix$$();

        expect(result).toBe(`blue-[#8]`);
      });
    });
  });
});
