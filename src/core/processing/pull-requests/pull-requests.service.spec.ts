import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsService } from '@core/processing/pull-requests/pull-requests.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import faker from 'faker';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/pull-requests/pull-request-processor`);
jest.mock(`@core/processing/pull-requests/pull-request-logger`);

describe(`PullRequestsService`, (): void => {
  let service: PullRequestsService;

  beforeEach((): void => {
    service = PullRequestsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a PullRequestsService`, (): void => {
      expect.assertions(1);

      service = PullRequestsService.getInstance();

      expect(service).toStrictEqual(expect.any(PullRequestsService));
    });

    it(`should return the created PullRequestsService`, (): void => {
      expect.assertions(1);

      const result = PullRequestsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`process()`, (): void => {
    let processedPullRequestsCount: number;

    let processBatchSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let isProcessingEnabledSpy: jest.SpyInstance;

    beforeEach((): void => {
      processedPullRequestsCount = faker.datatype.number();

      processBatchSpy = jest.spyOn(service, `processBatch`).mockResolvedValue(processedPullRequestsCount);
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      isProcessingEnabledSpy = jest.spyOn(service, `isProcessingEnabled$$`).mockImplementation();
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        isProcessingEnabledSpy.mockReturnValue(false);
      });

      it(`should not process the batches of pull requests`, async (): Promise<void> => {
        expect.assertions(1);

        await service.process();

        expect(processBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not log when all the pull requests were processed`, async (): Promise<void> => {
        expect.assertions(1);

        await service.process();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        isProcessingEnabledSpy.mockReturnValue(true);
      });

      it(`should process the batches of pull requests`, async (): Promise<void> => {
        expect.assertions(2);

        await service.process();

        expect(processBatchSpy).toHaveBeenCalledTimes(1);
        expect(processBatchSpy).toHaveBeenCalledWith();
      });

      it(`should log when all the pull requests were processed`, async (): Promise<void> => {
        expect.assertions(2);

        await service.process();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `green-All the pull requests`,
          `white-(value-${processedPullRequestsCount}white-)`,
          `green-were processed`
        );
      });
    });
  });

  describe(`processBatch()`, (): void => {
    const mockedPullRequestProcessor: MockedObjectDeep<typeof PullRequestProcessor> = jest.mocked(
      PullRequestProcessor,
      true
    );
    const mockedPullRequestLogger: MockedObjectDeep<typeof PullRequestLogger> = jest.mocked(PullRequestLogger, true);

    let githubApiPullRequestsServiceFetchPullRequestsSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let processBatchSpy: jest.SpyInstance;
    let pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy: jest.SpyInstance;
    let canProcessSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedPullRequestProcessor.mockClear();
      mockedPullRequestLogger.mockClear();

      githubApiPullRequestsServiceFetchPullRequestsSpy = jest
        .spyOn(GithubApiPullRequestsService, `fetchPullRequests`)
        .mockResolvedValue(
          createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: [],
              },
            },
          })
        );
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      processBatchSpy = jest.spyOn(service, `processBatch`);
      pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy = jest
        .spyOn(PullRequestsStatisticsService.getInstance(), `increaseProcessedPullRequestsCount`)
        .mockImplementation();
      canProcessSpy = jest.spyOn(service, `canProcess$$`).mockImplementation();
    });

    it(`should log about the fetch of this batch of pull requests`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Fetching the batch of pull requests`,
        `white-#value-1whiteBright-...`
      );
    });

    it(`should fetch the pull requests to process`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch(1);

      expect(githubApiPullRequestsServiceFetchPullRequestsSpy).toHaveBeenCalledTimes(1);
      expect(githubApiPullRequestsServiceFetchPullRequestsSpy).toHaveBeenCalledWith(undefined);
    });

    describe(`when one pull request was fetched in this batch`, (): void => {
      let gitHubApiPullRequest: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
        mockedPullRequestProcessor.mockClear();
        mockedPullRequestLogger.mockClear();
        gitHubApiPullRequest = createHydratedMock<IGithubApiPullRequest>({
          number: 8,
        });
        githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
          repository: {
            pullRequests: {
              nodes: [gitHubApiPullRequest],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiPullRequestsServiceFetchPullRequestsSpy.mockResolvedValue(githubApiPullRequests);
      });

      it(`should log about the successful fetch of pull request for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-1`,
          `whiteBright-pull request in the batch`,
          `white-#value-1`
        );
      });

      describe(`when the pull requests can be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(true);
        });

        it(`should log the pull request data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        });

        it(`should process the pull request`, async (): Promise<void> => {
          expect.assertions(6);

          await service.processBatch();

          expect(mockedPullRequestProcessor).toHaveBeenCalledTimes(1);
          expect(mockedPullRequestProcessor).toHaveBeenCalledWith(
            gitHubApiPullRequest,
            mockedPullRequestLogger.mock.instances[0]
          );
          expect(mockedPullRequestProcessor.prototype.process.mock.calls).toHaveLength(1);
          expect(mockedPullRequestProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
          expect(mockedPullRequestLogger).toHaveBeenCalledTimes(1);
          expect(mockedPullRequestLogger).toHaveBeenCalledWith(8);
        });

        it(`should increase the counter of processed pull requests statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the pull requests cannot be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(false);
        });

        it(`should not log the pull request data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        });

        it(`should not process the pull request`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(mockedPullRequestProcessor.prototype.process).not.toHaveBeenCalled();
        });

        it(`should not increase the counter of processed pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when two pull requests were fetched in this batch`, (): void => {
      let gitHubApiPullRequest1: IGithubApiPullRequest;
      let gitHubApiPullRequest2: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
        mockedPullRequestProcessor.mockClear();
        mockedPullRequestLogger.mockClear();
        gitHubApiPullRequest1 = createHydratedMock<IGithubApiPullRequest>({
          number: 1,
        });
        gitHubApiPullRequest2 = createHydratedMock<IGithubApiPullRequest>({
          number: 2,
        });
        githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
          repository: {
            pullRequests: {
              nodes: [gitHubApiPullRequest1, gitHubApiPullRequest2],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiPullRequestsServiceFetchPullRequestsSpy.mockResolvedValue(githubApiPullRequests);
      });

      it(`should log about the successful fetch of pull requests for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-2`,
          `whiteBright-pull requests in the batch`,
          `white-#value-1`
        );
      });

      describe(`when the pull requests can be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(true);
        });

        it(`should log the pull request data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        });

        it(`should process the two pull requests`, async (): Promise<void> => {
          expect.assertions(9);

          await service.processBatch();

          expect(mockedPullRequestProcessor).toHaveBeenCalledTimes(2);
          expect(mockedPullRequestProcessor).toHaveBeenNthCalledWith(
            1,
            gitHubApiPullRequest1,
            mockedPullRequestLogger.mock.instances[0]
          );
          expect(mockedPullRequestProcessor).toHaveBeenNthCalledWith(
            2,
            gitHubApiPullRequest2,
            mockedPullRequestLogger.mock.instances[1]
          );
          expect(mockedPullRequestProcessor.prototype.process.mock.calls).toHaveLength(2);
          expect(mockedPullRequestProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
          expect(mockedPullRequestProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
          expect(mockedPullRequestProcessor).toHaveBeenCalledTimes(2);
          expect(mockedPullRequestLogger).toHaveBeenNthCalledWith(1, 1);
          expect(mockedPullRequestLogger).toHaveBeenNthCalledWith(2, 2);
        });

        it(`should increase the counter of processed pull requests statistic by 2`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the pull requests cannot be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(false);
        });

        it(`should not log the pull request data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        });

        it(`should not process the pull requests`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(mockedPullRequestProcessor.prototype.process).not.toHaveBeenCalled();
        });

        it(`should not increase the counter of processed pull requests statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).not.toHaveBeenCalled();
        });
      });
    });

    it(`should log the end of the batch processing`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        3,
        `green-Batch of pull requests`,
        `white-#value-1`,
        `green-processed`
      );
    });

    describe(`when the pull requests of this batch have been all processed as expected`, (): void => {
      beforeEach((): void => {
        canProcessSpy.mockReturnValue(true);
      });

      describe(`when this batch does not contain more pull requests to process`, (): void => {
        let gitHubApiPullRequest1: IGithubApiPullRequest;
        let gitHubApiPullRequest2: IGithubApiPullRequest;
        let githubApiPullRequests: IGithubApiGetPullRequests;

        beforeEach((): void => {
          gitHubApiPullRequest1 = createHydratedMock<IGithubApiPullRequest>();
          gitHubApiPullRequest2 = createHydratedMock<IGithubApiPullRequest>();
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: [gitHubApiPullRequest1, gitHubApiPullRequest2],
                pageInfo: {
                  endCursor: undefined,
                  hasNextPage: false,
                },
              },
            },
          });

          githubApiPullRequestsServiceFetchPullRequestsSpy.mockResolvedValue(githubApiPullRequests);
        });

        it(`should log about the success of the process of all the pull requests`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `green-All the pull requests batches`,
            `white-(value-1white-)`,
            `green-were processed`
          );
        });
      });

      describe(`when this batch contains more pull requests to process`, (): void => {
        let gitHubApiPullRequest1: IGithubApiPullRequest;
        let gitHubApiPullRequest2: IGithubApiPullRequest;
        let githubApiPullRequests: IGithubApiGetPullRequests;

        beforeEach((): void => {
          gitHubApiPullRequest1 = createHydratedMock<IGithubApiPullRequest>();
          gitHubApiPullRequest2 = createHydratedMock<IGithubApiPullRequest>();
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: [gitHubApiPullRequest1, gitHubApiPullRequest2],
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiPullRequestsServiceFetchPullRequestsSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetPullRequests>({
                repository: {
                  pullRequests: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiPullRequests);
        });

        it(`should log about the need of creating a new batch to process the next pull requests`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of pull requests`);
        });

        it(`should process the next batch of pull requests`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(processBatchSpy).toHaveBeenCalledTimes(2);
          expect(processBatchSpy).toHaveBeenNthCalledWith(2, 2, 2, `dummy-end-cursor`);
        });

        it(`should return the sum of all the processed pull requests`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.processBatch();

          expect(result).toBe(2);
        });
      });

      describe(`when this batch contains 22 pull requests to process`, (): void => {
        let githubApiPullRequests: IGithubApiGetPullRequests;

        beforeEach((): void => {
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: _.times(22, (): IGithubApiPullRequest => createHydratedMock<IGithubApiPullRequest>()),
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiPullRequestsServiceFetchPullRequestsSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetPullRequests>({
                repository: {
                  pullRequests: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiPullRequests);
        });

        it(`should log about the need of creating a new batch to process the next pull requests`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of pull requests`);
        });

        it(`should process the next batch of pull requests`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(processBatchSpy).toHaveBeenCalledTimes(2);
          expect(processBatchSpy).toHaveBeenNthCalledWith(2, 2, 22, `dummy-end-cursor`);
        });

        it(`should return the sum of all the processed pull requests`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.processBatch();

          expect(result).toBe(22);
        });
      });
    });

    describe(`when the pull requests of this batch were not all processed due to limits`, (): void => {
      beforeEach((): void => {
        canProcessSpy.mockReturnValue(false);
      });

      describe(`when this batch does not contain more pull requests to process`, (): void => {
        let gitHubApiPullRequest1: IGithubApiPullRequest;
        let gitHubApiPullRequest2: IGithubApiPullRequest;
        let githubApiPullRequests: IGithubApiGetPullRequests;

        beforeEach((): void => {
          gitHubApiPullRequest1 = createHydratedMock<IGithubApiPullRequest>();
          gitHubApiPullRequest2 = createHydratedMock<IGithubApiPullRequest>();
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: [gitHubApiPullRequest1, gitHubApiPullRequest2],
                pageInfo: {
                  endCursor: undefined,
                  hasNextPage: false,
                },
              },
            },
          });

          githubApiPullRequestsServiceFetchPullRequestsSpy.mockResolvedValue(githubApiPullRequests);
        });

        it(`should log about stopping the processing sooner than expected`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `Stopping the processing of batches sooner than expected to respect the limits`
          );
        });
      });

      describe(`when this batch contains more pull requests to process`, (): void => {
        let gitHubApiPullRequest1: IGithubApiPullRequest;
        let gitHubApiPullRequest2: IGithubApiPullRequest;
        let githubApiPullRequests: IGithubApiGetPullRequests;

        beforeEach((): void => {
          gitHubApiPullRequest1 = createHydratedMock<IGithubApiPullRequest>();
          gitHubApiPullRequest2 = createHydratedMock<IGithubApiPullRequest>();
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                nodes: [gitHubApiPullRequest1, gitHubApiPullRequest2],
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiPullRequestsServiceFetchPullRequestsSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetPullRequests>({
                repository: {
                  pullRequests: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiPullRequests);
        });

        it(`should log about stopping the processing sooner than expected`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `Stopping the processing of batches sooner than expected to respect the limits`
          );
        });
      });
    });
  });

  describe(`isProcessingEnabled$$()`, (): void => {
    let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      pullRequestsInputsServiceGetInputsSpy = jest
        .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
        .mockReturnValue(createHydratedMock<IPullRequestsInputs>());
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should get the pull requests inputs`, (): void => {
      expect.assertions(2);

      service.isProcessingEnabled$$();

      expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
            pullRequestProcessing: false,
          })
        );
      });

      it(`should log about it`, (): void => {
        expect.assertions(2);

        service.isProcessingEnabled$$();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `The input`,
          `input-pull-request-processing`,
          `whiteBright-is disabled. Skipping the processing of pull requests...`
        );
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isProcessingEnabled$$();

        expect(result).toBeFalse();
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
            pullRequestProcessing: true,
          })
        );
      });

      it(`should log about it`, (): void => {
        expect.assertions(2);

        service.isProcessingEnabled$$();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `The input`,
          `input-pull-request-processing`,
          `whiteBright-is enabled. Continuing...`
        );
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isProcessingEnabled$$();

        expect(result).toBeTrue();
      });
    });
  });

  describe(`canProcess$$()`, (): void => {
    let itemNumber: number;

    let loggerServiceInfoSpy: jest.SpyInstance;
    let hasReachedQueriesLimitSpy: jest.SpyInstance;
    let hasReachedMutationsLimitSpy: jest.SpyInstance;

    beforeEach((): void => {
      itemNumber = 666;

      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      hasReachedQueriesLimitSpy = jest.spyOn(service, `hasReachedQueriesLimit$$`).mockImplementation();
      hasReachedMutationsLimitSpy = jest.spyOn(service, `hasReachedMutationsLimit$$`).mockImplementation();
    });

    it(`should log about checking if the next pull request can be processed`, (): void => {
      expect.assertions(2);

      service.canProcess$$(itemNumber);

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Checking if the pull request`,
        `value-#666`,
        `whiteBright-can be processed...`
      );
    });

    describe(`when the pull requests API queries calls count has been reached`, (): void => {
      beforeEach((): void => {
        hasReachedQueriesLimitSpy.mockReturnValue(true);
      });

      it(`should log about reaching the limit of pull requests API queries calls count`, (): void => {
        expect.assertions(2);

        service.canProcess$$(itemNumber);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `The limit of pull requests API queries calls count has been reached. Stopping the processing of pull requests`
        );
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.canProcess$$(itemNumber);

        expect(result).toBeFalse();
      });
    });

    describe(`when the pull requests API queries calls count has not been reached yet`, (): void => {
      beforeEach((): void => {
        hasReachedQueriesLimitSpy.mockReturnValue(false);
      });

      it(`should log about not reaching the limit of pull requests API queries calls`, (): void => {
        expect.assertions(2);

        service.canProcess$$(itemNumber);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `The limit of API queries calls count is not reached yet, continuing...`
        );
      });

      describe(`when the pull requests API mutations calls count has been reached`, (): void => {
        beforeEach((): void => {
          hasReachedMutationsLimitSpy.mockReturnValue(true);
        });

        it(`should log about reaching the limit of pull requests API mutations calls count`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The limit of pull requests API mutations calls count has been reached. Stopping the processing of pull requests`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.canProcess$$(itemNumber);

          expect(result).toBeFalse();
        });
      });

      describe(`when the pull requests API mutations calls count has not been reached yet`, (): void => {
        beforeEach((): void => {
          hasReachedMutationsLimitSpy.mockReturnValue(false);
        });

        it(`should log about not reaching the limit of pull requests API mutations calls`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The limit of API mutations calls count is not reached yet, continuing...`
          );
        });

        it(`should log about allowing to process the next pull request`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `The pull request`,
            `value-#666`,
            `whiteBright-can be processed`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.canProcess$$(itemNumber);

          expect(result).toBeTrue();
        });
      });
    });
  });

  describe(`hasReachedQueriesLimit$$()`, (): void => {
    let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      pullRequestsInputsServiceGetInputsSpy = jest
        .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
        .mockReturnValue(createHydratedMock<IPullRequestsInputs>());
    });

    it(`should get the pull requests inputs`, (): void => {
      expect.assertions(2);

      service.hasReachedQueriesLimit$$();

      expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
    });

    describe(`when the "pullRequestLimitApiQueriesCount" input is set to -1`, (): void => {
      beforeEach((): void => {
        pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
            pullRequestLimitApiQueriesCount: -1,
          })
        );
      });

      describe(`when there is no called API pull requests queries yet`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API pull requests query`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API pull requests queries`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 2;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`when the "pullRequestLimitApiQueriesCount" input is set to 0`, (): void => {
      beforeEach((): void => {
        pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
            pullRequestLimitApiQueriesCount: 0,
          })
        );
      });

      describe(`when there is no called API pull requests queries yet`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API pull requests query`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 1;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when there is 2 called API pull requests queries`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`when the "pullRequestLimitApiQueriesCount" input is set to 1`, (): void => {
      beforeEach((): void => {
        pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
            pullRequestLimitApiQueriesCount: 1,
          })
        );
      });

      describe(`when there is no called API pull requests queries yet`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API pull requests query`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API pull requests queries`, (): void => {
        beforeEach((): void => {
          PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });
    });
  });
});
