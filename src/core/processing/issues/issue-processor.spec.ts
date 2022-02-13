import { IssueCloseStaleProcessor } from '@core/processing/issues/issue-close-stale-processor';
import { IssueIgnoreProcessor } from '@core/processing/issues/issue-ignore-processor';
import { IssueIsStaleProcessor } from '@core/processing/issues/issue-is-stale-processor';
import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssueRemoveStaleProcessor } from '@core/processing/issues/issue-remove-stale-processor';
import { IssueShouldCloseProcessor } from '@core/processing/issues/issue-should-close-processor';
import { IssueStaleProcessor } from '@core/processing/issues/issue-stale-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import * as CreateLinkModule from '@utils/links/create-link';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/issues/issue-logger`);
jest.mock(`@core/processing/issues/issue-ignore-processor`);
jest.mock(`@core/processing/issues/issue-include-processor`);
jest.mock(`@core/processing/issues/issue-stale-processor`);
jest.mock(`@core/processing/issues/issue-is-stale-processor`);
jest.mock(`@core/processing/issues/issue-remove-stale-processor`);
jest.mock(`@core/processing/issues/issue-should-close-processor`);
jest.mock(`@core/processing/issues/issue-close-stale-processor`);

describe(`IssueProcessor`, (): void => {
  let gitHubApiIssue: IGithubApiIssue;
  let logger: IssueLogger;

  beforeEach((): void => {
    gitHubApiIssue = createHydratedMock<IGithubApiIssue>();
    logger = createHydratedMock<IssueLogger>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue`, (): void => {
      expect.assertions(1);

      const result = new IssueProcessor(gitHubApiIssue, logger);

      expect(result.item).toStrictEqual(gitHubApiIssue);
    });

    it(`should save the given logger`, (): void => {
      expect.assertions(1);

      const result = new IssueProcessor(gitHubApiIssue, logger);

      expect(result.logger).toStrictEqual(logger);
    });
  });

  describe(`after creation`, (): void => {
    let issueProcessor: IssueProcessor;

    beforeEach((): void => {
      gitHubApiIssue = createHydratedMock<IGithubApiIssue>({
        number: 8,
        url: `dummy-url`,
      });
      issueProcessor = new IssueProcessor(gitHubApiIssue, logger);
    });

    describe(`process()`, (): void => {
      let loggerStartGroupSpy: jest.SpyInstance;
      let stopProcessingSpy: jest.SpyInstance;
      let shouldIgnoreSpy: jest.SpyInstance;
      let shouldIncludeSpy: jest.SpyInstance;
      let isAlreadyStaleSpy: jest.SpyInstance;
      let processToRemoveStaleSpy: jest.SpyInstance;
      let processForCloseSpy: jest.SpyInstance;
      let processForStaleSpy: jest.SpyInstance;
      let loggerInfoSpy: jest.SpyInstance;
      let createLinkSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerStartGroupSpy = jest.spyOn(issueProcessor.logger, `startGroup`).mockImplementation();
        stopProcessingSpy = jest.spyOn(issueProcessor, `stopProcessing$$`).mockImplementation();
        shouldIgnoreSpy = jest.spyOn(issueProcessor, `shouldIgnore$$`).mockImplementation();
        shouldIncludeSpy = jest.spyOn(issueProcessor, `shouldInclude$$`).mockImplementation();
        isAlreadyStaleSpy = jest.spyOn(issueProcessor, `isAlreadyStale$$`).mockImplementation();
        processToRemoveStaleSpy = jest.spyOn(issueProcessor, `processToRemoveStale$$`).mockImplementation();
        processForStaleSpy = jest.spyOn(issueProcessor, `processForStale$$`).mockImplementation();
        processForCloseSpy = jest.spyOn(issueProcessor, `processForClose$$`).mockImplementation();
        loggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        createLinkSpy = jest.spyOn(CreateLinkModule, `createLink`).mockReturnValue(`dummy-link`);
        issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseIgnoredIssuesCount`)
          .mockImplementation();
        issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseAlreadyStaleIssuesCount`)
          .mockImplementation();
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

        it(`should increase the ignore issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.process();

          expect(issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the already stale issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.process();

          expect(issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(6);

          await issueProcessor.process();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
          expect(isAlreadyStaleSpy).not.toHaveBeenCalled();
          expect(processToRemoveStaleSpy).not.toHaveBeenCalled();
          expect(processForStaleSpy).not.toHaveBeenCalled();
          expect(processForCloseSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when this issue should not be ignored (based on the inputs and user configuration)`, (): void => {
        beforeEach((): void => {
          shouldIgnoreSpy.mockReturnValue(false);
        });

        it(`should check if this issue should be included in the processing (based on the inputs and user configuration)`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.process();

          expect(shouldIncludeSpy).toHaveBeenCalledTimes(1);
          expect(shouldIncludeSpy).toHaveBeenCalledWith();
        });

        describe(`when this issue should not be included in the processing (based on the inputs and user configuration)`, (): void => {
          beforeEach((): void => {
            shouldIncludeSpy.mockReturnValue(false);
          });

          it(`should log about ignoring the processing of this issue`, async (): Promise<void> => {
            expect.assertions(2);

            await issueProcessor.process();

            expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
            expect(loggerInfoSpy).toHaveBeenCalledWith(`Ignored`);
          });

          it(`should increase the ignore issues statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await issueProcessor.process();

            expect(issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy).toHaveBeenCalledWith();
          });

          it(`should not increase the already stale issues statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await issueProcessor.process();

            expect(issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy).not.toHaveBeenCalled();
          });

          it(`should stop to process this issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueProcessor.process();

            expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
            expect(stopProcessingSpy).toHaveBeenCalledWith();
            expect(isAlreadyStaleSpy).not.toHaveBeenCalled();
            expect(processToRemoveStaleSpy).not.toHaveBeenCalled();
            expect(processForStaleSpy).not.toHaveBeenCalled();
            expect(processForCloseSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when this issue should be included in the processing (based on the inputs and user configuration)`, (): void => {
          beforeEach((): void => {
            shouldIncludeSpy.mockReturnValue(true);
          });

          it(`should not increase the ignore issues statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await issueProcessor.process();

            expect(issuesStatisticsServiceIncreaseIgnoredIssuesCountSpy).not.toHaveBeenCalled();
          });

          it(`should check if the issue is already stale`, async (): Promise<void> => {
            expect.assertions(2);

            await issueProcessor.process();

            expect(isAlreadyStaleSpy).toHaveBeenCalledTimes(1);
            expect(isAlreadyStaleSpy).toHaveBeenCalledWith();
          });

          describe(`when the issue is already stale`, (): void => {
            beforeEach((): void => {
              isAlreadyStaleSpy.mockReturnValue(true);
            });

            it(`should try to remove the stale state (if conditions are met)`, async (): Promise<void> => {
              expect.assertions(5);

              await issueProcessor.process();

              expect(processToRemoveStaleSpy).toHaveBeenCalledTimes(1);
              expect(processToRemoveStaleSpy).toHaveBeenCalledWith();
              expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
              expect(loggerInfoSpy).toHaveBeenCalledWith(`Already stale`);
              expect(processForStaleSpy).not.toHaveBeenCalled();
            });

            it(`should increase the already stale issues statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await issueProcessor.process();

              expect(issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy).toHaveBeenCalledTimes(1);
              expect(issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy).toHaveBeenCalledWith();
            });

            describe(`when the stale state was removed`, (): void => {
              beforeEach((): void => {
                processToRemoveStaleSpy.mockResolvedValue(true);
              });

              it(`should stop the processing`, async (): Promise<void> => {
                expect.assertions(2);

                await issueProcessor.process();

                expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
                expect(stopProcessingSpy).toHaveBeenCalledWith();
              });
            });

            describe(`when the stale state was not removed`, (): void => {
              beforeEach((): void => {
                processToRemoveStaleSpy.mockResolvedValue(false);
              });

              it(`should try to close the issue`, async (): Promise<void> => {
                expect.assertions(2);

                await issueProcessor.process();

                expect(processForCloseSpy).toHaveBeenCalledTimes(1);
                expect(processForCloseSpy).toHaveBeenCalledWith();
              });
            });
          });

          describe(`when the issue is not stale yet`, (): void => {
            beforeEach((): void => {
              isAlreadyStaleSpy.mockReturnValue(false);
            });

            it(`should really process the issue for the stale checks`, async (): Promise<void> => {
              expect.assertions(5);

              await issueProcessor.process();

              expect(processForStaleSpy).toHaveBeenCalledTimes(1);
              expect(processForStaleSpy).toHaveBeenCalledWith();
              expect(processToRemoveStaleSpy).not.toHaveBeenCalled();
              expect(stopProcessingSpy).not.toHaveBeenCalled();
              expect(processForCloseSpy).not.toHaveBeenCalled();
            });

            it(`should not increase the already stale issues statistic`, async (): Promise<void> => {
              expect.assertions(1);

              await issueProcessor.process();

              expect(issuesStatisticsServiceIncreaseAlreadyStaleIssuesCountSpy).not.toHaveBeenCalled();
            });
          });
        });
      });
    });

    describe(`getUpdatedAt()`, (): void => {
      describe(`when the update date of the issue is invalid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              updatedAt: `dummy-wrong-date`,
            }),
            logger
          );
        });

        it(`should throw an error`, (): void => {
          expect.assertions(1);

          expect((): DateTime => issueProcessor.getUpdatedAt()).toThrow(new Error(`unparsable`));
        });
      });

      describe(`when the update date of the issue is valid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              updatedAt: DateTime.now().toISO({
                includeOffset: false,
              }),
            }),
            logger
          );
        });

        it(`should return the update date as a date time class`, (): void => {
          expect.assertions(2);

          const result = issueProcessor.getUpdatedAt();

          expect(result).toBeInstanceOf(DateTime);
          expect(result.equals(DateTime.now())).toBeTrue();
        });
      });
    });

    describe(`getCreatedAt()`, (): void => {
      describe(`when the creation date of the issue is invalid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              createdAt: `dummy-wrong-date`,
            }),
            logger
          );
        });

        it(`should throw an error`, (): void => {
          expect.assertions(1);

          expect((): DateTime => issueProcessor.getCreatedAt()).toThrow(new Error(`unparsable`));
        });
      });

      describe(`when the creation date of the issue is valid`, (): void => {
        beforeEach((): void => {
          issueProcessor = new IssueProcessor(
            createHydratedMock<IGithubApiIssue>({
              createdAt: DateTime.now().toISO({
                includeOffset: false,
              }),
            }),
            logger
          );
        });

        it(`should return the creation date as a date time class`, (): void => {
          expect.assertions(2);

          const result = issueProcessor.getCreatedAt();

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
      const mockedIssueIgnoreProcessor: MockedObjectDeep<typeof IssueIgnoreProcessor> = jest.mocked(
        IssueIgnoreProcessor,
        true
      );

      beforeEach((): void => {
        mockedIssueIgnoreProcessor.mockClear();

        mockedIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
      });

      it(`should check if the issue should be ignored from the processing`, (): void => {
        expect.assertions(4);

        issueProcessor.shouldIgnore$$();

        expect(mockedIssueIgnoreProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueIgnoreProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockedIssueIgnoreProcessor.prototype.shouldIgnore.mock.calls).toHaveLength(1);
        expect(mockedIssueIgnoreProcessor.prototype.shouldIgnore.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue should be ignored`, (): void => {
        beforeEach((): void => {
          mockedIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.shouldIgnore$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue should not be ignored`, (): void => {
        beforeEach((): void => {
          mockedIssueIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.shouldIgnore$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`processForStale$$()`, (): void => {
      const mockedIssueStaleProcessor: MockedObjectDeep<typeof IssueStaleProcessor> = jest.mocked(
        IssueStaleProcessor,
        true
      );

      let stopProcessingSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseStaleIssuesCountSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        mockedIssueStaleProcessor.mockClear();

        stopProcessingSpy = jest.spyOn(issueProcessor, `stopProcessing$$`).mockImplementation();
        issuesStatisticsServiceIncreaseStaleIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseStaleIssuesCount`)
          .mockImplementation();
        issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseUnalteredIssuesCount`)
          .mockImplementation();
      });

      it(`should check if the issue should be stale`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.processForStale$$();

        expect(mockedIssueStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueStaleProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockedIssueStaleProcessor.prototype.shouldStale.mock.calls).toHaveLength(1);
        expect(mockedIssueStaleProcessor.prototype.shouldStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue should not be stale`, (): void => {
        beforeEach((): void => {
          mockedIssueStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(false);
        });

        it(`should not increase the stale issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processForStale$$();

          expect(issuesStatisticsServiceIncreaseStaleIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should increase the unaltered issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(3);

          await issueProcessor.processForStale$$();

          expect(mockedIssueStaleProcessor.prototype.stale).not.toHaveBeenCalled();
          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the issue should be stale`, (): void => {
        beforeEach((): void => {
          mockedIssueStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(true);
        });

        it(`should stale the issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(mockedIssueStaleProcessor.prototype.stale.mock.calls).toHaveLength(1);
          expect(mockedIssueStaleProcessor.prototype.stale.mock.calls[0]).toHaveLength(0);
        });

        it(`should increase the stale issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(issuesStatisticsServiceIncreaseStaleIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseStaleIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the unaltered issues statistics`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processForStale$$();

          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForStale$$();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`isAlreadyStale$$()`, (): void => {
      const mockedIssueIsStaleProcessor: MockedObjectDeep<typeof IssueIsStaleProcessor> = jest.mocked(
        IssueIsStaleProcessor,
        true
      );

      beforeEach((): void => {
        mockedIssueIsStaleProcessor.mockClear();
      });

      it(`should check if the issue is already stale`, (): void => {
        expect.assertions(4);

        issueProcessor.isAlreadyStale$$();

        expect(mockedIssueIsStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueIsStaleProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockedIssueIsStaleProcessor.prototype.isStale.mock.calls).toHaveLength(1);
        expect(mockedIssueIsStaleProcessor.prototype.isStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue is not stale`, (): void => {
        beforeEach((): void => {
          mockedIssueIsStaleProcessor.prototype.isStale.mockImplementation().mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.isAlreadyStale$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when the issue is already stale`, (): void => {
        beforeEach((): void => {
          mockedIssueIsStaleProcessor.prototype.isStale.mockImplementation().mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueProcessor.isAlreadyStale$$();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`processToRemoveStale$$()`, (): void => {
      let issuesStatisticsServiceIncreaseRemoveStaleIssuesCountSpy: jest.SpyInstance;

      const mockedIssueRemoveStaleProcessor: MockedObjectDeep<typeof IssueRemoveStaleProcessor> = jest.mocked(
        IssueRemoveStaleProcessor,
        true
      );

      beforeEach((): void => {
        mockedIssueRemoveStaleProcessor.mockClear();

        issuesStatisticsServiceIncreaseRemoveStaleIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseRemoveStaleIssuesCount`)
          .mockImplementation();
      });

      it(`should check if the stale state should be removed`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.processToRemoveStale$$();

        expect(mockedIssueRemoveStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueRemoveStaleProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockedIssueRemoveStaleProcessor.prototype.shouldRemoveStale.mock.calls).toHaveLength(1);
        expect(mockedIssueRemoveStaleProcessor.prototype.shouldRemoveStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the stale state should be removed`, (): void => {
        beforeEach((): void => {
          mockedIssueRemoveStaleProcessor.prototype.shouldRemoveStale.mockResolvedValue(true);
        });

        it(`should remove the stale state on this issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processToRemoveStale$$();

          expect(mockedIssueRemoveStaleProcessor.prototype.removeStale.mock.calls).toHaveLength(1);
          expect(mockedIssueRemoveStaleProcessor.prototype.removeStale.mock.calls[0]).toHaveLength(0);
        });

        it(`should increase the remove stale issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processToRemoveStale$$();

          expect(issuesStatisticsServiceIncreaseRemoveStaleIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseRemoveStaleIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should return true`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await issueProcessor.processToRemoveStale$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the stale state should not be removed`, (): void => {
        beforeEach((): void => {
          mockedIssueRemoveStaleProcessor.prototype.shouldRemoveStale.mockResolvedValue(false);
        });

        it(`should not remove the stale state on this issue`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processToRemoveStale$$();

          expect(mockedIssueRemoveStaleProcessor.prototype.removeStale.mock.calls).toHaveLength(0);
        });

        it(`should not increase the remove stale issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processToRemoveStale$$();

          expect(issuesStatisticsServiceIncreaseRemoveStaleIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should return false`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await issueProcessor.processToRemoveStale$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`processForClose$$()`, (): void => {
      const mockedIssueShouldCloseProcessor: MockedObjectDeep<typeof IssueShouldCloseProcessor> = jest.mocked(
        IssueShouldCloseProcessor,
        true
      );
      const mockedIssueCloseStaleProcessor: MockedObjectDeep<typeof IssueCloseStaleProcessor> = jest.mocked(
        IssueCloseStaleProcessor,
        true
      );

      let stopProcessingSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseClosedIssuesCountSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        mockedIssueShouldCloseProcessor.mockClear();
        mockedIssueCloseStaleProcessor.mockClear();

        stopProcessingSpy = jest.spyOn(issueProcessor, `stopProcessing$$`).mockImplementation();
        issuesStatisticsServiceIncreaseClosedIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseClosedIssuesCount`)
          .mockImplementation();
        issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseUnalteredIssuesCount`)
          .mockImplementation();
      });

      it(`should check if the issue should be closed`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.processForClose$$();

        expect(mockedIssueShouldCloseProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueShouldCloseProcessor).toHaveBeenCalledWith(issueProcessor);
        expect(mockedIssueShouldCloseProcessor.prototype.shouldClose.mock.calls).toHaveLength(1);
        expect(mockedIssueShouldCloseProcessor.prototype.shouldClose.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the issue should not be closed`, (): void => {
        beforeEach((): void => {
          mockedIssueShouldCloseProcessor.prototype.shouldClose.mockImplementation().mockReturnValue(false);
        });

        it(`should not increase the close issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processForClose$$();

          expect(issuesStatisticsServiceIncreaseClosedIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should increase the unaltered issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForClose$$();

          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(3);

          await issueProcessor.processForClose$$();

          expect(mockedIssueCloseStaleProcessor.prototype.close).not.toHaveBeenCalled();
          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the issue should be closed`, (): void => {
        beforeEach((): void => {
          mockedIssueShouldCloseProcessor.prototype.shouldClose.mockImplementation().mockReturnValue(true);
        });

        it(`should close the issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForClose$$();

          expect(mockedIssueCloseStaleProcessor.prototype.close.mock.calls).toHaveLength(1);
          expect(mockedIssueCloseStaleProcessor.prototype.close.mock.calls[0]).toHaveLength(0);
        });

        it(`should increase the close issues statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForClose$$();

          expect(issuesStatisticsServiceIncreaseClosedIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseClosedIssuesCountSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the unaltered issues statistics`, async (): Promise<void> => {
          expect.assertions(1);

          await issueProcessor.processForClose$$();

          expect(issuesStatisticsServiceIncreaseUnalteredIssuesCountSpy).not.toHaveBeenCalled();
        });

        it(`should stop to process this issue`, async (): Promise<void> => {
          expect.assertions(2);

          await issueProcessor.processForClose$$();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
