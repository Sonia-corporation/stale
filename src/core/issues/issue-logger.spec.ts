import { IssueLogger } from '@core/issues/issue-logger';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueLogger`, (): void => {
  let issueNumber: IGithubApiIssueNumber;

  beforeEach((): void => {
    issueNumber = 8;
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue number`, (): void => {
      expect.assertions(1);

      const result = new IssueLogger(issueNumber);

      expect(result.issueNumber).toBe(8);
    });
  });

  describe(`after creation`, (): void => {
    let issueLogger: IssueLogger;

    beforeEach((): void => {
      issueLogger = new IssueLogger(issueNumber);
    });

    describe(`debug()`, (): void => {
      let loggerServiceDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      });

      it(`should log the given message and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.debug(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`info()`, (): void => {
      let loggerServiceInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      });

      it(`should log the given message and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.info(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`notice()`, (): void => {
      let loggerServiceNoticeSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceNoticeSpy = jest.spyOn(LoggerService, `notice`).mockImplementation();
      });

      it(`should log the given message and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.notice(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceNoticeSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceNoticeSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`warning()`, (): void => {
      let loggerServiceWarningSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceWarningSpy = jest.spyOn(LoggerService, `warning`).mockImplementation();
      });

      it(`should log the given message and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.warning(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceWarningSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`error()`, (): void => {
      let loggerServiceErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      });

      it(`should log the given message and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.error(`dummy message 1`, `dummy message 2`);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy message 1 dummy message 2`);
      });
    });

    describe(`group()`, (): void => {
      let loggerServiceGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceGroupSpy = jest.spyOn(LoggerService, `group`).mockImplementation();
      });

      it(`should create a group logger and add the issue number as a prefix`, async (): Promise<void> => {
        expect.assertions(3);

        await issueLogger.group(`dummy name`, (): Promise<void> => Promise.resolve());

        expect(loggerServiceGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceGroupSpy.mock.calls[0][0]).toStrictEqual(`red-[#8] whiteBright-dummy name`);
        expect(loggerServiceGroupSpy.mock.calls[0][1]).toBeFunction();
      });
    });

    describe(`startGroup()`, (): void => {
      let loggerServiceStartGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      });

      it(`should create a group logger and add the issue number as a prefix`, (): void => {
        expect.assertions(2);

        issueLogger.startGroup(`dummy name`);

        expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`red-[#8]`, `whiteBright-dummy name`);
      });
    });

    describe(`endGroup()`, (): void => {
      let loggerServiceEndGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
      });

      it(`should stop the group logger`, (): void => {
        expect.assertions(2);

        issueLogger.endGroup();

        expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
      });
    });

    describe(`getPrefix$$()`, (): void => {
      it(`should return the issue number wrapped and in red`, (): void => {
        expect.assertions(1);

        const result = issueLogger.getPrefix$$();

        expect(result).toBe(`red-[#8]`);
      });
    });
  });
});
