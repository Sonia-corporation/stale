import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesService } from '@core/processing/issues/issues.service';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import faker from 'faker';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';
import MockedObjectDeep = jest.MockedObjectDeep;

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/issues/issue-processor`);
jest.mock(`@core/processing/issues/issue-logger`);

describe(`IssuesService`, (): void => {
  let service: IssuesService;

  beforeEach((): void => {
    service = IssuesService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesService`, (): void => {
      expect.assertions(1);

      service = IssuesService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesService));
    });

    it(`should return the created IssuesService`, (): void => {
      expect.assertions(1);

      const result = IssuesService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`process()`, (): void => {
    let processedIssuesCount: number;

    let processBatchSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let isProcessingEnabledSpy: jest.SpyInstance;

    beforeEach((): void => {
      processedIssuesCount = faker.datatype.number();

      processBatchSpy = jest.spyOn(service, `processBatch`).mockResolvedValue(processedIssuesCount);
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      isProcessingEnabledSpy = jest.spyOn(service, `isProcessingEnabled$$`).mockImplementation();
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        isProcessingEnabledSpy.mockReturnValue(false);
      });

      it(`should not process the batches of issues`, async (): Promise<void> => {
        expect.assertions(1);

        await service.process();

        expect(processBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not log when all the issues were processed`, async (): Promise<void> => {
        expect.assertions(1);

        await service.process();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        isProcessingEnabledSpy.mockReturnValue(true);
      });

      it(`should process the batches of issues`, async (): Promise<void> => {
        expect.assertions(2);

        await service.process();

        expect(processBatchSpy).toHaveBeenCalledTimes(1);
        expect(processBatchSpy).toHaveBeenCalledWith();
      });

      it(`should log when all the issues were processed`, async (): Promise<void> => {
        expect.assertions(2);

        await service.process();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `green-All the issues`,
          `white-(value-${processedIssuesCount}white-)`,
          `green-were processed`
        );
      });
    });
  });

  describe(`processBatch()`, (): void => {
    const mockedIssueProcessor: MockedObjectDeep<typeof IssueProcessor> = jest.mocked(IssueProcessor);
    const mockedIssueLogger: MockedObjectDeep<typeof IssueLogger> = jest.mocked(IssueLogger);

    let githubApiIssuesServiceFetchIssuesSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let processBatchSpy: jest.SpyInstance;
    let issuesStatisticsServiceIncreaseProcessedIssuesCountSpy: jest.SpyInstance;
    let canProcessSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedIssueProcessor.mockClear();
      mockedIssueLogger.mockClear();

      githubApiIssuesServiceFetchIssuesSpy = jest.spyOn(GithubApiIssuesService, `fetchIssues`).mockResolvedValue(
        createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [],
            },
          },
        })
      );
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      processBatchSpy = jest.spyOn(service, `processBatch`);
      issuesStatisticsServiceIncreaseProcessedIssuesCountSpy = jest
        .spyOn(IssuesStatisticsService.getInstance(), `increaseProcessedIssuesCount`)
        .mockImplementation();
      canProcessSpy = jest.spyOn(service, `canProcess$$`).mockImplementation();
    });

    it(`should log about the fetch of this batch of issues`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Fetching the batch of issues`,
        `white-#value-1whiteBright-...`
      );
    });

    it(`should fetch the issues to process`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch(1);

      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledTimes(1);
      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledWith(undefined);
    });

    describe(`when one issue was fetched in this batch`, (): void => {
      let gitHubApiIssue: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
        mockedIssueLogger.mockClear();
        gitHubApiIssue = createHydratedMock<IGithubApiIssue>({
          number: 8,
        });
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
      });

      it(`should log about the successful fetch of issue for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-1`,
          `whiteBright-issue in the batch`,
          `white-#value-1`
        );
      });

      describe(`when the issues can be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(true);
        });

        it(`should log the issue data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        });

        it(`should process the issue`, async (): Promise<void> => {
          expect.assertions(6);

          await service.processBatch();

          expect(mockedIssueProcessor).toHaveBeenCalledTimes(1);
          expect(mockedIssueProcessor).toHaveBeenCalledWith(gitHubApiIssue, mockedIssueLogger.mock.instances[0]);
          expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(1);
          expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
          expect(mockedIssueLogger).toHaveBeenCalledTimes(1);
          expect(mockedIssueLogger).toHaveBeenCalledWith(8);
        });

        it(`should increase the counter of processed issues' statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the issues cannot be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(false);
        });

        it(`should not log the issue data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        });

        it(`should not process the issue`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(mockedIssueProcessor.prototype.process).not.toHaveBeenCalled();
        });

        it(`should not increase the counter of processed issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when two issues were fetched in this batch`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
        mockedIssueLogger.mockClear();
        gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>({
          number: 1,
        });
        gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>({
          number: 2,
        });
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue1, gitHubApiIssue2],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
      });

      it(`should log about the successful fetch of issues for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-2`,
          `whiteBright-issues in the batch`,
          `white-#value-1`
        );
      });

      describe(`when the issues can be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(true);
        });

        it(`should log the issue data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        });

        it(`should process the two issues`, async (): Promise<void> => {
          expect.assertions(9);

          await service.processBatch();

          expect(mockedIssueProcessor).toHaveBeenCalledTimes(2);
          expect(mockedIssueProcessor).toHaveBeenNthCalledWith(1, gitHubApiIssue1, mockedIssueLogger.mock.instances[0]);
          expect(mockedIssueProcessor).toHaveBeenNthCalledWith(2, gitHubApiIssue2, mockedIssueLogger.mock.instances[1]);
          expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(2);
          expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
          expect(mockedIssueProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
          expect(mockedIssueLogger).toHaveBeenCalledTimes(2);
          expect(mockedIssueLogger).toHaveBeenNthCalledWith(1, 1);
          expect(mockedIssueLogger).toHaveBeenNthCalledWith(2, 2);
        });

        it(`should increase the counter of processed issues' statistic by 2`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(2);
          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the issues cannot be processed`, (): void => {
        beforeEach((): void => {
          canProcessSpy.mockReturnValue(false);
        });

        it(`should not log the issue data coming from GitHub`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
        });

        it(`should not process the issues`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(mockedIssueProcessor.prototype.process).not.toHaveBeenCalled();
        });

        it(`should not increase the counter of processed issues statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await service.processBatch();

          expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).not.toHaveBeenCalled();
        });
      });
    });

    it(`should log the end of the batch processing`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        3,
        `green-Batch of issues`,
        `white-#value-1`,
        `green-processed`
      );
    });

    describe(`when the issues of this batch have been all processed as expected`, (): void => {
      beforeEach((): void => {
        canProcessSpy.mockReturnValue(true);
      });

      describe(`when this batch does not contain more issues to process`, (): void => {
        let gitHubApiIssue1: IGithubApiIssue;
        let gitHubApiIssue2: IGithubApiIssue;
        let githubApiIssues: IGithubApiGetIssues;

        beforeEach((): void => {
          mockedIssueLogger.mockClear();
          gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
          gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                nodes: [gitHubApiIssue1, gitHubApiIssue2],
                pageInfo: {
                  endCursor: undefined,
                  hasNextPage: false,
                },
              },
            },
          });

          githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
        });

        it(`should log about the success of the process of all the issues`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `green-All the issues batches`,
            `white-(value-1white-)`,
            `green-were processed`
          );
        });
      });

      describe(`when this batch contains more issues to process`, (): void => {
        let gitHubApiIssue1: IGithubApiIssue;
        let gitHubApiIssue2: IGithubApiIssue;
        let githubApiIssues: IGithubApiGetIssues;

        beforeEach((): void => {
          gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
          gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                nodes: [gitHubApiIssue1, gitHubApiIssue2],
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiIssuesServiceFetchIssuesSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetIssues>({
                repository: {
                  issues: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiIssues);
        });

        it(`should log about the need of creating a new batch to process the next issues`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of issues`);
        });

        it(`should process the next batch of issues`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(processBatchSpy).toHaveBeenCalledTimes(2);
          expect(processBatchSpy).toHaveBeenNthCalledWith(2, 2, 2, `dummy-end-cursor`);
        });

        it(`should return the sum of all the processed issues`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.processBatch();

          expect(result).toBe(2);
        });
      });

      describe(`when this batch contains 22 issues to process`, (): void => {
        let githubApiIssues: IGithubApiGetIssues;

        beforeEach((): void => {
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                nodes: _.times(22, (): IGithubApiIssue => createHydratedMock<IGithubApiIssue>()),
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiIssuesServiceFetchIssuesSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetIssues>({
                repository: {
                  issues: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiIssues);
        });

        it(`should log about the need of creating a new batch to process the next issues`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of issues`);
        });

        it(`should process the next batch of issues`, async (): Promise<void> => {
          expect.assertions(2);

          await service.processBatch();

          expect(processBatchSpy).toHaveBeenCalledTimes(2);
          expect(processBatchSpy).toHaveBeenNthCalledWith(2, 2, 22, `dummy-end-cursor`);
        });

        it(`should return the sum of all the processed issues`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.processBatch();

          expect(result).toBe(22);
        });
      });
    });

    describe(`when the issues of this batch were not all processed due to limits`, (): void => {
      beforeEach((): void => {
        canProcessSpy.mockReturnValue(false);
      });

      describe(`when this batch does not contain more issues to process`, (): void => {
        let gitHubApiIssue1: IGithubApiIssue;
        let gitHubApiIssue2: IGithubApiIssue;
        let githubApiIssues: IGithubApiGetIssues;

        beforeEach((): void => {
          mockedIssueLogger.mockClear();
          gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
          gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                nodes: [gitHubApiIssue1, gitHubApiIssue2],
                pageInfo: {
                  endCursor: undefined,
                  hasNextPage: false,
                },
              },
            },
          });

          githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
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

      describe(`when this batch contains more issues to process`, (): void => {
        let gitHubApiIssue1: IGithubApiIssue;
        let gitHubApiIssue2: IGithubApiIssue;
        let githubApiIssues: IGithubApiGetIssues;

        beforeEach((): void => {
          gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
          gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                nodes: [gitHubApiIssue1, gitHubApiIssue2],
                pageInfo: {
                  endCursor: `dummy-end-cursor`,
                  hasNextPage: true,
                },
              },
            },
          });

          githubApiIssuesServiceFetchIssuesSpy
            .mockResolvedValue(
              createHydratedMock<IGithubApiGetIssues>({
                repository: {
                  issues: {
                    nodes: [],
                    pageInfo: {
                      endCursor: undefined,
                      hasNextPage: false,
                    },
                  },
                },
              })
            )
            .mockResolvedValueOnce(githubApiIssues);
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
    let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesInputsServiceGetInputsSpy = jest
        .spyOn(IssuesInputsService.getInstance(), `getInputs`)
        .mockReturnValue(createHydratedMock<IIssuesInputs>());
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should get the issues inputs`, (): void => {
      expect.assertions(2);

      service.isProcessingEnabled$$();

      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueProcessing: false,
          })
        );
      });

      it(`should log about it`, (): void => {
        expect.assertions(2);

        service.isProcessingEnabled$$();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `The input`,
          `input-issue-processing`,
          `whiteBright-is disabled. Skipping the processing of issues...`
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
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueProcessing: true,
          })
        );
      });

      it(`should log about it`, (): void => {
        expect.assertions(2);

        service.isProcessingEnabled$$();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `The input`,
          `input-issue-processing`,
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

    it(`should log about checking if the next issue can be processed`, (): void => {
      expect.assertions(2);

      service.canProcess$$(itemNumber);

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Checking if the issue`,
        `value-#666`,
        `whiteBright-can be processed...`
      );
    });

    describe(`when the issues API queries calls count has been reached`, (): void => {
      beforeEach((): void => {
        hasReachedQueriesLimitSpy.mockReturnValue(true);
      });

      it(`should log about reaching the limit of issues API queries calls count`, (): void => {
        expect.assertions(2);

        service.canProcess$$(itemNumber);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `The limit of issues API queries calls count has been reached. Stopping the processing of issues`
        );
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.canProcess$$(itemNumber);

        expect(result).toBeFalse();
      });
    });

    describe(`when the issues API queries calls count has not been reached yet`, (): void => {
      beforeEach((): void => {
        hasReachedQueriesLimitSpy.mockReturnValue(false);
      });

      it(`should log about not reaching the limit of issues API queries calls`, (): void => {
        expect.assertions(2);

        service.canProcess$$(itemNumber);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `The limit of API queries calls count is not reached yet, continuing...`
        );
      });

      describe(`when the issues API mutations calls count has been reached`, (): void => {
        beforeEach((): void => {
          hasReachedMutationsLimitSpy.mockReturnValue(true);
        });

        it(`should log about reaching the limit of issues API mutations calls count`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The limit of issues API mutations calls count has been reached. Stopping the processing of issues`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.canProcess$$(itemNumber);

          expect(result).toBeFalse();
        });
      });

      describe(`when the issues API mutations calls count has not been reached yet`, (): void => {
        beforeEach((): void => {
          hasReachedMutationsLimitSpy.mockReturnValue(false);
        });

        it(`should log about not reaching the limit of issues API mutations calls`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The limit of API mutations calls count is not reached yet, continuing...`
          );
        });

        it(`should log about allowing to process the next issue`, (): void => {
          expect.assertions(2);

          service.canProcess$$(itemNumber);

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            4,
            `The issue`,
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
    let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesInputsServiceGetInputsSpy = jest
        .spyOn(IssuesInputsService.getInstance(), `getInputs`)
        .mockReturnValue(createHydratedMock<IIssuesInputs>());
    });

    it(`should get the issues inputs`, (): void => {
      expect.assertions(2);

      service.hasReachedQueriesLimit$$();

      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
    });

    describe(`when the "issueLimitApiQueriesCount" input is set to -1`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiQueriesCount: -1,
          })
        );
      });

      describe(`when there is no called API issues queries yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues query`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API issues queries`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 2;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`when the "issueLimitApiQueriesCount" input is set to 0`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiQueriesCount: 0,
          })
        );
      });

      describe(`when there is no called API issues queries yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues query`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 1;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when there is 2 called API issues queries`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`when the "issueLimitApiQueriesCount" input is set to 1`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiQueriesCount: 1,
          })
        );
      });

      describe(`when there is no called API issues queries yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues query`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API issues queries`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedQueriesLimit$$();

          expect(result).toBeTrue();
        });
      });
    });
  });

  describe(`hasReachedMutationsLimit$$()`, (): void => {
    let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesInputsServiceGetInputsSpy = jest
        .spyOn(IssuesInputsService.getInstance(), `getInputs`)
        .mockReturnValue(createHydratedMock<IIssuesInputs>());
    });

    it(`should get the issues inputs`, (): void => {
      expect.assertions(2);

      service.hasReachedMutationsLimit$$();

      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
    });

    describe(`when the "issueLimitApiMutationsCount" input is set to -1`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiMutationsCount: -1,
          })
        );
      });

      describe(`when there is no called API issues mutations yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues mutation`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API issues mutations`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 2;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`when the "issueLimitApiMutationsCount" input is set to 0`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiMutationsCount: 0,
          })
        );
      });

      describe(`when there is no called API issues mutations yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues mutation`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 1;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when there is 2 called API issues mutations`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`when the "issueLimitApiMutationsCount" input is set to 1`, (): void => {
      beforeEach((): void => {
        issuesInputsServiceGetInputsSpy.mockReturnValue(
          createHydratedMock<IIssuesInputs>(<IIssuesInputs>{
            issueLimitApiMutationsCount: 1,
          })
        );
      });

      describe(`when there is no called API issues mutations yet`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 0;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 1 called API issues mutation`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 1;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when there is 2 called API issues mutations`, (): void => {
        beforeEach((): void => {
          IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount = 2;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasReachedMutationsLimit$$();

          expect(result).toBeTrue();
        });
      });
    });
  });
});
