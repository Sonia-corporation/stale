import { IssueProcessor } from '@core/issues/issue-processor';
import { IssuesService } from '@core/issues/issues.service';
import { StatisticsService } from '@core/statistics/statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/issues/issue-processor`);

describe(`IssuesService`, (): void => {
  describe(`process()`, (): void => {
    let processBatchedSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      processBatchedSpy = jest.spyOn(IssuesService, `processBatches`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should process the batches of issues`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.process();

      expect(processBatchedSpy).toHaveBeenCalledTimes(1);
      expect(processBatchedSpy).toHaveBeenCalledWith();
    });

    it(`should log when all the issues were processed`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.process();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`green-All the issues were processed`);
    });
  });

  describe(`processBatches()`, (): void => {
    const mockedIssueProcessor: MockedObjectDeep<typeof IssueProcessor> = mocked(IssueProcessor, true);

    let githubApiIssuesServiceFetchIssuesSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let processBatchesSpy: jest.SpyInstance;
    let statisticsServiceIncreaseProcessedIssuesCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedIssueProcessor.mockClear();

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
      processBatchesSpy = jest.spyOn(IssuesService, `processBatches`);
      statisticsServiceIncreaseProcessedIssuesCountSpy = jest
        .spyOn(StatisticsService, `increaseProcessedIssuesCount`)
        .mockImplementation();
    });

    it(`should log about the fetch of this batch of issues`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.processBatches();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Fetching the batch of issues`,
        `white-#value-1whiteBright-...`
      );
    });

    it(`should fetch the issues to process`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.processBatches(1);

      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledTimes(1);
      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledWith(undefined);
    });

    describe(`when one issue was fetched in this batch`, (): void => {
      let gitHubApiIssue: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
        gitHubApiIssue = createHydratedMock<IGithubApiIssue>();
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

        await IssuesService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-1`,
          `whiteBright-issue in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed issues statistic by 1`, async (): Promise<void> => {
        expect.assertions(2);

        await IssuesService.processBatches();

        expect(statisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(1);
        expect(statisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(4);

        await IssuesService.processBatches();

        expect(mockedIssueProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueProcessor).toHaveBeenCalledWith(gitHubApiIssue);
        expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(1);
        expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
      });
    });

    describe(`when two issues were fetched in this batch`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
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

      it(`should log about the successful fetch of issues for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await IssuesService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-2`,
          `whiteBright-issues in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed issues statistic by 2`, async (): Promise<void> => {
        expect.assertions(2);

        await IssuesService.processBatches();

        expect(statisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(2);
        expect(statisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the two issues`, async (): Promise<void> => {
        expect.assertions(6);

        await IssuesService.processBatches();

        expect(mockedIssueProcessor).toHaveBeenCalledTimes(2);
        expect(mockedIssueProcessor).toHaveBeenNthCalledWith(1, gitHubApiIssue1);
        expect(mockedIssueProcessor).toHaveBeenNthCalledWith(2, gitHubApiIssue2);
        expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(2);
        expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
        expect(mockedIssueProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
      });
    });

    it(`should log the end of the batch processing`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.processBatches();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        3,
        `green-Batch of issues`,
        `white-#value-1`,
        `green-processed`
      );
    });

    describe(`when this batch does not contains more issues to process`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
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

        await IssuesService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `green-All the issues batches were processed`);
      });
    });

    describe(`when this batch contains more issues to process`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
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

        await IssuesService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of issues`);
      });

      it(`should process the next batch of issues`, async (): Promise<void> => {
        expect.assertions(2);

        await IssuesService.processBatches();

        expect(processBatchesSpy).toHaveBeenCalledTimes(2);
        expect(processBatchesSpy).toHaveBeenNthCalledWith(2, 2, `dummy-end-cursor`);
      });
    });
  });
});
