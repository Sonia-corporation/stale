import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueLogger } from '@core/issues/issue-logger';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueStaleProcessor } from '@core/issues/issue-stale-processor';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import * as CreateLinkModule from '@utils/links/create-link';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/issues/issue-logger`);
jest.mock(`@core/issues/issue-ignore-processor`);
jest.mock(`@core/issues/issue-stale-processor`);

describe(`IssueProcessor`, (): void => {
  let gitHubApiIssue: IGithubApiIssue;

  beforeEach((): void => {
    gitHubApiIssue = createHydratedMock<IGithubApiIssue>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue`, (): void => {
      expect.assertions(1);

      const result = new IssueProcessor(gitHubApiIssue);

      expect(result.githubIssue).toStrictEqual(gitHubApiIssue);
    });

    it(`should create a logger just for this issue`, (): void => {
      expect.assertions(3);
      const mockedIssueLogger: MockedObjectDeep<typeof IssueLogger> = mocked(IssueLogger, true);
      gitHubApiIssue = createHydratedMock<IGithubApiIssue>({
        number: 8,
      });

      const result = new IssueProcessor(gitHubApiIssue);

      expect(mockedIssueLogger).toHaveBeenCalledTimes(1);
      expect(mockedIssueLogger).toHaveBeenCalledWith(8);
      expect(result.logger).toBeInstanceOf(IssueLogger);
    });
  });

  describe(`after creation`, (): void => {
    let issueProcessor: IssueProcessor;

    beforeEach((): void => {
      gitHubApiIssue = createHydratedMock<IGithubApiIssue>({
        number: 8,
        url: `dummy-url`,
      });
      issueProcessor = new IssueProcessor(gitHubApiIssue);
    });

    describe(`process()`, (): void => {
      let loggerStartGroupSpy: jest.SpyInstance;
      let stopProcessingSpy: jest.SpyInstance;
      let shouldIgnoreSpy: jest.SpyInstance;
      let processForStaleSpy: jest.SpyInstance;
      let loggerInfoSpy: jest.SpyInstance;
      let createLinkSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerStartGroupSpy = jest.spyOn(issueProcessor.logger, `startGroup`).mockImplementation();
        stopProcessingSpy = jest.spyOn(issueProcessor, `stopProcessing$$`).mockImplementation();
        shouldIgnoreSpy = jest.spyOn(issueProcessor, `shouldIgnore$$`).mockImplementation();
        processForStaleSpy = jest.spyOn(issueProcessor, `processForStale$$`).mockImplementation();
        loggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        createLinkSpy = jest.spyOn(CreateLinkModule, `createLink`).mockReturnValue(`dummy-link`);
      });

      it(`should log in a group about this issue being processed`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.process();

        expect(createLinkSpy).toHaveBeenCalledTimes(1);
        expect(createLinkSpy).toHaveBeenCalledWith(`8`, `dummy-url`);
        expect(loggerStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerStartGroupSpy).toHaveBeenCalledWith(`Processing the issue`, `magenta-dummy-linkwhiteBright-...`);
      });

      it(`should check if this issue should be ignored (based on the inputs and user configuration)`, async (): Promise<void> => {
        expect.assertions(2);

        await issueProcessor.process();

        expect(shouldIgnoreSpy).toHaveBeenCalledTimes(1);
        expect(shouldIgnoreSpy).toHaveBeenCalledWith();
      });

      describe(`when this issue should be ignored (based on the inputs and user configuration)`, (): void => {
        beforeEach((): void => {
          shouldIgnoreSpy.mockReturnValue(true);
        });

        it(`should log about ignoring the processing of this issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.process();

          expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
          expect(loggerInfoSpy).toHaveBeenCalledWith(`Ignored`);
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(3);

          await issueProcessor.process();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
          expect(processForStaleSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when this issue should not be ignored (based on the inputs and user configuration)`, (): void => {
        beforeEach((): void => {
          shouldIgnoreSpy.mockReturnValue(false);
        });

        it(`should really process the issue for the stale checks`, async (): Promise<void> => {
          expect.assertions(3);

          await issueProcessor.process();

          expect(processForStaleSpy).toHaveBeenCalledTimes(1);
          expect(processForStaleSpy).toHaveBeenCalledWith();
          expect(stopProcessingSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe(`getUpdatedAt()`, (): void => {
      describe(`when the creation date of the issue is invalid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              updatedAt: `dummy-wrong-date`,
            })
          );
        });

        it(`should throw an error`, (): void => {
          expect.assertions(1);

          expect((): DateTime => issueProcessor.getUpdatedAt()).toThrow(new Error(`unparsable`));
        });
      });

      describe(`when the creation date of the issue is valid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              updatedAt: DateTime.now().toISO(),
            })
          );
        });

        it(`should return the creation date as a date time class`, (): void => {
          expect.assertions(2);

          const result = issueProcessor.getUpdatedAt();

          expect(result).toBeInstanceOf(DateTime);
          expect(result.equals(DateTime.now())).toBeTrue();
        });
      });
    });

    describe(`stopProcessing$$()`, (): void => {
      let loggerInfoSpy: jest.SpyInstance;
      let loggerEndGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        loggerEndGroupSpy = jest.spyOn(issueProcessor.logger, `endGroup`).mockImplementation();
      });

      it(`should log about the end of the processing for this issue`, (): void => {
        expect.assertions(2);

        issueProcessor.stopProcessing$$();

        expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerInfoSpy).toHaveBeenCalledWith(`Processing stopped`);
      });

      it(`should stop to group the logs for this issue`, (): void => {
        expect.assertions(2);

        issueProcessor.stopProcessing$$();

        expect(loggerEndGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerEndGroupSpy).toHaveBeenCalledWith();
      });
    });

    describe(`shouldIgnore$$()`, (): void => {
      const mockIssueIgnoreProcessor: MockedObjectDeep<typeof IssueIgnoreProcessor> = mocked(
        IssueIgnoreProcessor,
        true
      );

      beforeEach((): void => {
        mockIssueIgnoreProcessor.mockClear();

        mockIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
      });

      it(`should check if the issue should be ignored from the processing`, (): void => {
        expect.assertions(4);

        issueProcessor.shouldIgnore$$();

        expect(mockIssueIgnoreProcessor).toHaveBeenCalledTimes(1);
        expect(mockIssueIgnoreProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockIssueIgnoreProcessor.prototype.shouldIgnore.mock.calls).toHaveLength(1);
        expect(mockIssueIgnoreProcessor.prototype.shouldIgnore.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue should be ignored`, (): void => {
        beforeEach((): void => {
          mockIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.shouldIgnore$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue should not be ignored`, (): void => {
        beforeEach((): void => {
          mockIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.shouldIgnore$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`processForStale$$()`, (): void => {
      const mockIssueStaleProcessor: MockedObjectDeep<typeof IssueStaleProcessor> = mocked(IssueStaleProcessor, true);

      let stopProcessingSpy: jest.SpyInstance;

      beforeEach((): void => {
        mockIssueStaleProcessor.mockClear();

        stopProcessingSpy = jest.spyOn(issueProcessor, `stopProcessing$$`).mockImplementation();
      });

      it(`should check if the issue should be stale`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.processForStale$$();

        expect(mockIssueStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockIssueStaleProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockIssueStaleProcessor.prototype.shouldStale.mock.calls).toHaveLength(1);
        expect(mockIssueStaleProcessor.prototype.shouldStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue should not be stale`, (): void => {
        beforeEach((): void => {
          mockIssueStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(false);
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(3);

          await issueProcessor.processForStale$$();

          expect(mockIssueStaleProcessor.prototype.stale).not.toHaveBeenCalled();
          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the issue should be stale`, (): void => {
        beforeEach((): void => {
          mockIssueStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(true);
        });

        it(`should stale the issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(mockIssueStaleProcessor.prototype.stale.mock.calls).toHaveLength(1);
          expect(mockIssueStaleProcessor.prototype.stale.mock.calls[0]).toHaveLength(0);
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
