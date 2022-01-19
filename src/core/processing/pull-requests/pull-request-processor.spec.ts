import { PullRequestCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-close-stale-processor';
import { PullRequestDeleteBranchProcessor } from '@core/processing/pull-requests/pull-request-delete-branch-processor';
import { PullRequestDraftProcessor } from '@core/processing/pull-requests/pull-request-draft-processor';
import { PullRequestIgnoreProcessor } from '@core/processing/pull-requests/pull-request-ignore-processor';
import { PullRequestIsStaleProcessor } from '@core/processing/pull-requests/pull-request-is-stale-processor';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestRemoveStaleProcessor } from '@core/processing/pull-requests/pull-request-remove-stale-processor';
import { PullRequestShouldCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-should-close-stale-processor';
import { PullRequestStaleProcessor } from '@core/processing/pull-requests/pull-request-stale-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import * as CreateLinkModule from '@utils/links/create-link';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/pull-requests/pull-request-logger`);
jest.mock(`@core/processing/pull-requests/pull-request-ignore-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-stale-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-is-stale-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-remove-stale-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-should-close-stale-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-close-stale-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-delete-branch-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-draft-processor`);

describe(`PullRequestProcessor`, (): void => {
  let gitHubApiPullRequest: IGithubApiPullRequest;
  let logger: PullRequestLogger;

  beforeEach((): void => {
    gitHubApiPullRequest = createHydratedMock<IGithubApiPullRequest>();
    logger = createHydratedMock<PullRequestLogger>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request`, (): void => {
      expect.assertions(1);

      const result = new PullRequestProcessor(gitHubApiPullRequest, logger);

      expect(result.item).toStrictEqual(gitHubApiPullRequest);
    });

    it(`should save the given logger`, (): void => {
      expect.assertions(1);

      const result = new PullRequestProcessor(gitHubApiPullRequest, logger);

      expect(result.logger).toStrictEqual(logger);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestProcessor: PullRequestProcessor;

    beforeEach((): void => {
      gitHubApiPullRequest = createHydratedMock<IGithubApiPullRequest>({
        number: 8,
        url: `dummy-url`,
      });
      pullRequestProcessor = new PullRequestProcessor(gitHubApiPullRequest, logger);
    });

    describe(`process()`, (): void => {
      let loggerStartGroupSpy: jest.SpyInstance;
      let stopProcessingSpy: jest.SpyInstance;
      let shouldIgnoreSpy: jest.SpyInstance;
      let isAlreadyStaleSpy: jest.SpyInstance;
      let processToRemoveStaleSpy: jest.SpyInstance;
      let processForCloseSpy: jest.SpyInstance;
      let processForStaleSpy: jest.SpyInstance;
      let loggerInfoSpy: jest.SpyInstance;
      let createLinkSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseIgnoredPullRequestsCountSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerStartGroupSpy = jest.spyOn(pullRequestProcessor.logger, `startGroup`).mockImplementation();
        stopProcessingSpy = jest.spyOn(pullRequestProcessor, `stopProcessing$$`).mockImplementation();
        shouldIgnoreSpy = jest.spyOn(pullRequestProcessor, `shouldIgnore$$`).mockImplementation();
        isAlreadyStaleSpy = jest.spyOn(pullRequestProcessor, `isAlreadyStale$$`).mockImplementation();
        processToRemoveStaleSpy = jest.spyOn(pullRequestProcessor, `processToRemoveStale$$`).mockImplementation();
        processForStaleSpy = jest.spyOn(pullRequestProcessor, `processForStale$$`).mockImplementation();
        processForCloseSpy = jest.spyOn(pullRequestProcessor, `processForClose$$`).mockImplementation();
        loggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        createLinkSpy = jest.spyOn(CreateLinkModule, `createLink`).mockReturnValue(`dummy-link`);
        pullRequestsStatisticsServiceIncreaseIgnoredPullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseIgnoredPullRequestsCount`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAlreadyStalePullRequestsCount`)
          .mockImplementation();
      });

      it(`should log in a group about this pull request being processed`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestProcessor.process();

        expect(createLinkSpy).toHaveBeenCalledTimes(1);
        expect(createLinkSpy).toHaveBeenCalledWith(`8`, `dummy-url`);
        expect(loggerStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerStartGroupSpy).toHaveBeenCalledWith(
          `Processing the pull request`,
          `magenta-dummy-linkwhiteBright-...`
        );
      });

      it(`should check if this pull request should be ignored (based on the inputs and user configuration)`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestProcessor.process();

        expect(shouldIgnoreSpy).toHaveBeenCalledTimes(1);
        expect(shouldIgnoreSpy).toHaveBeenCalledWith();
      });

      describe(`when this pull request should be ignored (based on the inputs and user configuration)`, (): void => {
        beforeEach((): void => {
          shouldIgnoreSpy.mockReturnValue(true);
        });

        it(`should log about ignoring the processing of this pull request`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.process();

          expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
          expect(loggerInfoSpy).toHaveBeenCalledWith(`Ignored`);
        });

        it(`should increase the ignore pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.process();

          expect(pullRequestsStatisticsServiceIncreaseIgnoredPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseIgnoredPullRequestsCountSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the already stale pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.process();

          expect(pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should stop to process this pull request`, async (): Promise<void> => {
          expect.assertions(6);

          await pullRequestProcessor.process();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
          expect(isAlreadyStaleSpy).not.toHaveBeenCalled();
          expect(processToRemoveStaleSpy).not.toHaveBeenCalled();
          expect(processForStaleSpy).not.toHaveBeenCalled();
          expect(processForCloseSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when this pull request should not be ignored (based on the inputs and user configuration)`, (): void => {
        beforeEach((): void => {
          shouldIgnoreSpy.mockReturnValue(false);
        });

        it(`should not increase the ignore pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.process();

          expect(pullRequestsStatisticsServiceIncreaseIgnoredPullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should check if the pull request is already stale`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.process();

          expect(isAlreadyStaleSpy).toHaveBeenCalledTimes(1);
          expect(isAlreadyStaleSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request is already stale`, (): void => {
          beforeEach((): void => {
            isAlreadyStaleSpy.mockReturnValue(true);
          });

          it(`should try to remove the stale state (if conditions are met)`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestProcessor.process();

            expect(processToRemoveStaleSpy).toHaveBeenCalledTimes(1);
            expect(processToRemoveStaleSpy).toHaveBeenCalledWith();
            expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
            expect(loggerInfoSpy).toHaveBeenCalledWith(`Already stale`);
            expect(processForStaleSpy).not.toHaveBeenCalled();
          });

          it(`should increase the already stale pull requests statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestProcessor.process();

            expect(pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy).toHaveBeenCalledWith();
          });

          describe(`when the stale state was removed`, (): void => {
            beforeEach((): void => {
              processToRemoveStaleSpy.mockResolvedValue(true);
            });

            it(`should stop the processing`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestProcessor.process();

              expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
              expect(stopProcessingSpy).toHaveBeenCalledWith();
            });
          });

          describe(`when the stale state was not removed`, (): void => {
            beforeEach((): void => {
              processToRemoveStaleSpy.mockResolvedValue(false);
            });

            it(`should try to close the pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestProcessor.process();

              expect(processForCloseSpy).toHaveBeenCalledTimes(1);
              expect(processForCloseSpy).toHaveBeenCalledWith();
            });
          });
        });

        describe(`when the pull request is not stale yet`, (): void => {
          beforeEach((): void => {
            isAlreadyStaleSpy.mockReturnValue(false);
          });

          it(`should really process the pull request for the stale checks`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestProcessor.process();

            expect(processForStaleSpy).toHaveBeenCalledTimes(1);
            expect(processForStaleSpy).toHaveBeenCalledWith();
            expect(processToRemoveStaleSpy).not.toHaveBeenCalled();
            expect(stopProcessingSpy).not.toHaveBeenCalled();
            expect(processForCloseSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the already stale pull requests statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.process();

            expect(pullRequestsStatisticsServiceIncreaseAlreadyStalePullRequestsCountSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe(`getUpdatedAt()`, (): void => {
      describe(`when the update date of the pull request is invalid`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = new PullRequestProcessor(
            createHydratedMock<IGithubApiPullRequest>({
              updatedAt: `dummy-wrong-date`,
            }),
            logger
          );
        });

        it(`should throw an error`, (): void => {
          expect.assertions(1);

          expect((): DateTime => pullRequestProcessor.getUpdatedAt()).toThrow(new Error(`unparsable`));
        });
      });

      describe(`when the update date of the pull request is valid`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = new PullRequestProcessor(
            createHydratedMock<IGithubApiPullRequest>({
              updatedAt: DateTime.now().toISO({
                includeOffset: false,
              }),
            }),
            logger
          );
        });

        it(`should return the update date as a date time class`, (): void => {
          expect.assertions(2);

          const result = pullRequestProcessor.getUpdatedAt();

          expect(result).toBeInstanceOf(DateTime);
          expect(result.equals(DateTime.now())).toBeTrue();
        });
      });
    });

    describe(`getCreatedAt()`, (): void => {
      describe(`when the creation date of the pull request is invalid`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = new PullRequestProcessor(
            createHydratedMock<IGithubApiPullRequest>({
              createdAt: `dummy-wrong-date`,
            }),
            logger
          );
        });

        it(`should throw an error`, (): void => {
          expect.assertions(1);

          expect((): DateTime => pullRequestProcessor.getCreatedAt()).toThrow(new Error(`unparsable`));
        });
      });

      describe(`when the creation date of the pull request is valid`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = new PullRequestProcessor(
            createHydratedMock<IGithubApiPullRequest>({
              createdAt: DateTime.now().toISO({
                includeOffset: false,
              }),
            }),
            logger
          );
        });

        it(`should return the creation date as a date time class`, (): void => {
          expect.assertions(2);

          const result = pullRequestProcessor.getCreatedAt();

          expect(result).toBeInstanceOf(DateTime);
          expect(result.equals(DateTime.now())).toBeTrue();
        });
      });
    });

    describe(`stopProcessing$$()`, (): void => {
      let loggerInfoSpy: jest.SpyInstance;
      let loggerEndGroupSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        loggerEndGroupSpy = jest.spyOn(pullRequestProcessor.logger, `endGroup`).mockImplementation();
      });

      it(`should log about the end of the processing for this pull request`, (): void => {
        expect.assertions(2);

        pullRequestProcessor.stopProcessing$$();

        expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerInfoSpy).toHaveBeenCalledWith(`Processing stopped`);
      });

      it(`should stop to group the logs for this pull request`, (): void => {
        expect.assertions(2);

        pullRequestProcessor.stopProcessing$$();

        expect(loggerEndGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerEndGroupSpy).toHaveBeenCalledWith();
      });
    });

    describe(`shouldIgnore$$()`, (): void => {
      const mockedPullRequestIgnoreProcessor: MockedObjectDeep<typeof PullRequestIgnoreProcessor> = mocked(
        PullRequestIgnoreProcessor,
        true
      );

      beforeEach((): void => {
        mockedPullRequestIgnoreProcessor.mockClear();

        mockedPullRequestIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
      });

      it(`should check if the pull request should be ignored from the processing`, (): void => {
        expect.assertions(4);

        pullRequestProcessor.shouldIgnore$$();

        expect(mockedPullRequestIgnoreProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestIgnoreProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestIgnoreProcessor.prototype.shouldIgnore.mock.calls).toHaveLength(1);
        expect(mockedPullRequestIgnoreProcessor.prototype.shouldIgnore.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the pull request should be ignored`, (): void => {
        beforeEach((): void => {
          mockedPullRequestIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestProcessor.shouldIgnore$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request should not be ignored`, (): void => {
        beforeEach((): void => {
          mockedPullRequestIgnoreProcessor.prototype.shouldIgnore.mockImplementation().mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestProcessor.shouldIgnore$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`processForStale$$()`, (): void => {
      const mockedPullRequestStaleProcessor: MockedObjectDeep<typeof PullRequestStaleProcessor> = mocked(
        PullRequestStaleProcessor,
        true
      );
      const mockedPullRequestDraftProcessor: MockedObjectDeep<typeof PullRequestDraftProcessor> = mocked(
        PullRequestDraftProcessor,
        true
      );

      let stopProcessingSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        mockedPullRequestStaleProcessor.mockClear();
        mockedPullRequestDraftProcessor.mockClear();

        stopProcessingSpy = jest.spyOn(pullRequestProcessor, `stopProcessing$$`).mockImplementation();
        pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseStalePullRequestsCount`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseUnalteredPullRequestsCount`)
          .mockImplementation();
      });

      it(`should check if the pull request should be stale`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestProcessor.processForStale$$();

        expect(mockedPullRequestStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestStaleProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestStaleProcessor.prototype.shouldStale.mock.calls).toHaveLength(1);
        expect(mockedPullRequestStaleProcessor.prototype.shouldStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the pull request should not be stale`, (): void => {
        beforeEach((): void => {
          mockedPullRequestStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(false);
        });

        it(`should not increase the stale pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processForStale$$();

          expect(pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should increase the unaltered pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForStale$$();

          expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).toHaveBeenCalledWith();
        });

        it(`should stop to process this pull request`, async (): Promise<void> => {
          expect.assertions(4);

          await pullRequestProcessor.processForStale$$();

          expect(mockedPullRequestStaleProcessor.prototype.stale).not.toHaveBeenCalled();
          expect(mockedPullRequestDraftProcessor.prototype.draft).not.toHaveBeenCalled();
          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the pull request should be stale`, (): void => {
        beforeEach((): void => {
          mockedPullRequestStaleProcessor.prototype.shouldStale.mockImplementation().mockReturnValue(true);
        });

        describe(`when the processing should draft instead of stale`, (): void => {
          beforeEach((): void => {
            mockedPullRequestDraftProcessor.prototype.shouldDraftInsteadOfStale
              .mockImplementation()
              .mockReturnValue(true);
          });

          it(`should draft the pull request`, async (): Promise<void> => {
            expect.assertions(4);

            await pullRequestProcessor.processForStale$$();

            expect(mockedPullRequestDraftProcessor).toHaveBeenCalledTimes(1);
            expect(mockedPullRequestDraftProcessor).toHaveBeenCalledWith(pullRequestProcessor);
            expect(mockedPullRequestDraftProcessor.prototype.draft.mock.calls).toHaveLength(1);
            expect(mockedPullRequestDraftProcessor.prototype.draft.mock.calls[0]).toHaveLength(0);
          });

          it(`should not stale the pull request`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.processForStale$$();

            expect(mockedPullRequestStaleProcessor.prototype.stale).not.toHaveBeenCalled();
          });

          it(`should not increase the stale pull requests statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.processForStale$$();

            expect(pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the unaltered pull requests statistics`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.processForStale$$();

            expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).not.toHaveBeenCalled();
          });

          it(`should stop to process this pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestProcessor.processForStale$$();

            expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
            expect(stopProcessingSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when the processing should stale instead of draft`, (): void => {
          beforeEach((): void => {
            mockedPullRequestDraftProcessor.prototype.shouldDraftInsteadOfStale
              .mockImplementation()
              .mockReturnValue(false);
          });

          it(`should not draft the pull request`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.processForStale$$();

            expect(mockedPullRequestDraftProcessor.prototype.draft).not.toHaveBeenCalled();
          });

          it(`should stale the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestProcessor.processForStale$$();

            expect(mockedPullRequestStaleProcessor.prototype.stale.mock.calls).toHaveLength(1);
            expect(mockedPullRequestStaleProcessor.prototype.stale.mock.calls[0]).toHaveLength(0);
          });

          it(`should increase the stale pull requests statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestProcessor.processForStale$$();

            expect(pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseStalePullRequestsCountSpy).toHaveBeenCalledWith();
          });

          it(`should not increase the unaltered pull requests statistics`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestProcessor.processForStale$$();

            expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).not.toHaveBeenCalled();
          });

          it(`should stop to process this pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestProcessor.processForStale$$();

            expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
            expect(stopProcessingSpy).toHaveBeenCalledWith();
          });
        });
      });
    });

    describe(`isAlreadyStale$$()`, (): void => {
      const mockedPullRequestIsStaleProcessor: MockedObjectDeep<typeof PullRequestIsStaleProcessor> = mocked(
        PullRequestIsStaleProcessor,
        true
      );

      beforeEach((): void => {
        mockedPullRequestIsStaleProcessor.mockClear();
      });

      it(`should check if the pull request is already stale`, (): void => {
        expect.assertions(4);

        pullRequestProcessor.isAlreadyStale$$();

        expect(mockedPullRequestIsStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestIsStaleProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestIsStaleProcessor.prototype.isStale.mock.calls).toHaveLength(1);
        expect(mockedPullRequestIsStaleProcessor.prototype.isStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the pull request is not stale`, (): void => {
        beforeEach((): void => {
          mockedPullRequestIsStaleProcessor.prototype.isStale.mockImplementation().mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestProcessor.isAlreadyStale$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when the pull request is already stale`, (): void => {
        beforeEach((): void => {
          mockedPullRequestIsStaleProcessor.prototype.isStale.mockImplementation().mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestProcessor.isAlreadyStale$$();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`processToRemoveStale$$()`, (): void => {
      let pullRequestsStatisticsServiceIncreaseRemoveStalePullRequestsCountSpy: jest.SpyInstance;

      const mockedPullRequestRemoveStaleProcessor: MockedObjectDeep<typeof PullRequestRemoveStaleProcessor> = mocked(
        PullRequestRemoveStaleProcessor,
        true
      );

      beforeEach((): void => {
        mockedPullRequestRemoveStaleProcessor.mockClear();

        pullRequestsStatisticsServiceIncreaseRemoveStalePullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseRemoveStalePullRequestsCount`)
          .mockImplementation();
      });

      it(`should check if the stale state should be removed`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestProcessor.processToRemoveStale$$();

        expect(mockedPullRequestRemoveStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestRemoveStaleProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestRemoveStaleProcessor.prototype.shouldRemoveStale.mock.calls).toHaveLength(1);
        expect(mockedPullRequestRemoveStaleProcessor.prototype.shouldRemoveStale.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the stale state should be removed`, (): void => {
        beforeEach((): void => {
          mockedPullRequestRemoveStaleProcessor.prototype.shouldRemoveStale.mockResolvedValue(true);
        });

        it(`should remove the stale state on this pull request`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processToRemoveStale$$();

          expect(mockedPullRequestRemoveStaleProcessor.prototype.removeStale.mock.calls).toHaveLength(1);
          expect(mockedPullRequestRemoveStaleProcessor.prototype.removeStale.mock.calls[0]).toHaveLength(0);
        });

        it(`should increase the remove stale pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processToRemoveStale$$();

          expect(pullRequestsStatisticsServiceIncreaseRemoveStalePullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseRemoveStalePullRequestsCountSpy).toHaveBeenCalledWith();
        });

        it(`should return true`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await pullRequestProcessor.processToRemoveStale$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the stale state should not be removed`, (): void => {
        beforeEach((): void => {
          mockedPullRequestRemoveStaleProcessor.prototype.shouldRemoveStale.mockResolvedValue(false);
        });

        it(`should not remove the stale state on this pull request`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processToRemoveStale$$();

          expect(mockedPullRequestRemoveStaleProcessor.prototype.removeStale.mock.calls).toHaveLength(0);
        });

        it(`should not increase the remove stale pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processToRemoveStale$$();

          expect(pullRequestsStatisticsServiceIncreaseRemoveStalePullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should return false`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await pullRequestProcessor.processToRemoveStale$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`processForClose$$()`, (): void => {
      const mockedPullRequestShouldCloseStaleProcessor: MockedObjectDeep<typeof PullRequestShouldCloseStaleProcessor> =
        mocked(PullRequestShouldCloseStaleProcessor, true);
      const mockedPullRequestCloseStaleProcessor: MockedObjectDeep<typeof PullRequestCloseStaleProcessor> = mocked(
        PullRequestCloseStaleProcessor,
        true
      );

      let stopProcessingSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseClosedPullRequestsCountSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy: jest.SpyInstance;
      let processToDeleteBranch$$Spy: jest.SpyInstance;

      beforeEach((): void => {
        mockedPullRequestShouldCloseStaleProcessor.mockClear();
        mockedPullRequestCloseStaleProcessor.mockClear();

        stopProcessingSpy = jest.spyOn(pullRequestProcessor, `stopProcessing$$`).mockImplementation();
        pullRequestsStatisticsServiceIncreaseClosedPullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseClosedPullRequestsCount`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseUnalteredPullRequestsCount`)
          .mockImplementation();
        processToDeleteBranch$$Spy = jest.spyOn(pullRequestProcessor, `processToDeleteBranch$$`).mockImplementation();
      });

      it(`should check if the pull request should be closed`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestProcessor.processForClose$$();

        expect(mockedPullRequestShouldCloseStaleProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestShouldCloseStaleProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestShouldCloseStaleProcessor.prototype.shouldClose.mock.calls).toHaveLength(1);
        expect(mockedPullRequestShouldCloseStaleProcessor.prototype.shouldClose.mock.calls[0]).toHaveLength(0);
      });

      describe(`when the pull request should not be closed`, (): void => {
        beforeEach((): void => {
          mockedPullRequestShouldCloseStaleProcessor.prototype.shouldClose.mockImplementation().mockReturnValue(false);
        });

        it(`should not increase the close pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processForClose$$();

          expect(pullRequestsStatisticsServiceIncreaseClosedPullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should increase the unaltered pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForClose$$();

          expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).toHaveBeenCalledWith();
        });

        it(`should not try to delete the pull request branch`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processForClose$$();

          expect(processToDeleteBranch$$Spy).not.toHaveBeenCalled();
        });

        it(`should stop to process this pull request`, async (): Promise<void> => {
          expect.assertions(3);

          await pullRequestProcessor.processForClose$$();

          expect(mockedPullRequestCloseStaleProcessor.prototype.close).not.toHaveBeenCalled();
          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the pull request should be closed`, (): void => {
        beforeEach((): void => {
          mockedPullRequestShouldCloseStaleProcessor.prototype.shouldClose.mockImplementation().mockReturnValue(true);
        });

        it(`should close the pull request`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForClose$$();

          expect(mockedPullRequestCloseStaleProcessor.prototype.close.mock.calls).toHaveLength(1);
          expect(mockedPullRequestCloseStaleProcessor.prototype.close.mock.calls[0]).toHaveLength(0);
        });

        it(`should increase the close pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForClose$$();

          expect(pullRequestsStatisticsServiceIncreaseClosedPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseClosedPullRequestsCountSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the unaltered pull requests statistics`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestProcessor.processForClose$$();

          expect(pullRequestsStatisticsServiceIncreaseUnalteredPullRequestsCountSpy).not.toHaveBeenCalled();
        });

        it(`should try to delete the pull request branch`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForClose$$();

          expect(processToDeleteBranch$$Spy).toHaveBeenCalledTimes(1);
          expect(processToDeleteBranch$$Spy).toHaveBeenCalledWith();
        });

        it(`should stop to process this pull request`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestProcessor.processForClose$$();

          expect(stopProcessingSpy).toHaveBeenCalledTimes(1);
          expect(stopProcessingSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`processToDeleteBranch$$()`, (): void => {
      const mockedPullRequestDeleteBranchProcessor: MockedObjectDeep<typeof PullRequestDeleteBranchProcessor> = mocked(
        PullRequestDeleteBranchProcessor,
        true
      );

      beforeEach((): void => {
        mockedPullRequestDeleteBranchProcessor.mockClear();
      });

      it(`should check if the pull request branch should be deleted`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestProcessor.processToDeleteBranch$$();

        expect(mockedPullRequestDeleteBranchProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestDeleteBranchProcessor).toHaveBeenCalledWith(pullRequestProcessor);
        expect(mockedPullRequestDeleteBranchProcessor.prototype.delete.mock.calls).toHaveLength(1);
        expect(mockedPullRequestDeleteBranchProcessor.prototype.delete.mock.calls[0]).toHaveLength(0);
      });
    });
  });
});
