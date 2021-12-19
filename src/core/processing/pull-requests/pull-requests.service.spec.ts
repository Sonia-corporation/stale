import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsService } from '@core/processing/pull-requests/pull-requests.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/pull-requests/pull-request-processor`);

describe(`PullRequestsService`, (): void => {
  describe(`process()`, (): void => {
    let processBatchedSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      processBatchedSpy = jest.spyOn(PullRequestsService, `processBatches`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should process the batches of pull requests`, async (): Promise<void> => {
      expect.assertions(2);

      await PullRequestsService.process();

      expect(processBatchedSpy).toHaveBeenCalledTimes(1);
      expect(processBatchedSpy).toHaveBeenCalledWith();
    });

    it(`should log when all the pull requests were processed`, async (): Promise<void> => {
      expect.assertions(2);

      await PullRequestsService.process();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`green-All the pull requests were processed`);
    });
  });

  describe(`processBatches()`, (): void => {
    const mockedPullRequestProcessor: MockedObjectDeep<typeof PullRequestProcessor> = mocked(
      PullRequestProcessor,
      true
    );

    let githubApiPullRequestsServiceFetchPullRequestsSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let processBatchesSpy: jest.SpyInstance;
    let pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedPullRequestProcessor.mockClear();

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
      processBatchesSpy = jest.spyOn(PullRequestsService, `processBatches`);
      pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy = jest
        .spyOn(PullRequestsStatisticsService.getInstance(), `increaseProcessedPullRequestsCount`)
        .mockImplementation();
    });

    it(`should log about the fetch of this batch of pull requests`, async (): Promise<void> => {
      expect.assertions(2);

      await PullRequestsService.processBatches();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Fetching the batch of pull requests`,
        `white-#value-1whiteBright-...`
      );
    });

    it(`should fetch the pull requests to process`, async (): Promise<void> => {
      expect.assertions(2);

      await PullRequestsService.processBatches(1);

      expect(githubApiPullRequestsServiceFetchPullRequestsSpy).toHaveBeenCalledTimes(1);
      expect(githubApiPullRequestsServiceFetchPullRequestsSpy).toHaveBeenCalledWith(undefined);
    });

    describe(`when one pull request was fetched in this batch`, (): void => {
      let gitHubApiPullRequest: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
        mockedPullRequestProcessor.mockClear();
        gitHubApiPullRequest = createHydratedMock<IGithubApiPullRequest>();
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

        await PullRequestsService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-1`,
          `whiteBright-pull request in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed pull requests statistic by 1`, async (): Promise<void> => {
        expect.assertions(2);

        await PullRequestsService.processBatches();

        expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(4);

        await PullRequestsService.processBatches();

        expect(mockedPullRequestProcessor).toHaveBeenCalledTimes(1);
        expect(mockedPullRequestProcessor).toHaveBeenCalledWith(gitHubApiPullRequest);
        expect(mockedPullRequestProcessor.prototype.process.mock.calls).toHaveLength(1);
        expect(mockedPullRequestProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
      });
    });

    describe(`when two pull requests were fetched in this batch`, (): void => {
      let gitHubApiPullRequest1: IGithubApiPullRequest;
      let gitHubApiPullRequest2: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
        mockedPullRequestProcessor.mockClear();
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

      it(`should log about the successful fetch of pull requests for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await PullRequestsService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-2`,
          `whiteBright-pull requests in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed pull requests statistic by 2`, async (): Promise<void> => {
        expect.assertions(2);

        await PullRequestsService.processBatches();

        expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestsStatisticsServiceIncreaseProcessedPullRequestsCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the two pull requests`, async (): Promise<void> => {
        expect.assertions(6);

        await PullRequestsService.processBatches();

        expect(mockedPullRequestProcessor).toHaveBeenCalledTimes(2);
        expect(mockedPullRequestProcessor).toHaveBeenNthCalledWith(1, gitHubApiPullRequest1);
        expect(mockedPullRequestProcessor).toHaveBeenNthCalledWith(2, gitHubApiPullRequest2);
        expect(mockedPullRequestProcessor.prototype.process.mock.calls).toHaveLength(2);
        expect(mockedPullRequestProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
        expect(mockedPullRequestProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
      });
    });

    it(`should log the end of the batch processing`, async (): Promise<void> => {
      expect.assertions(2);

      await PullRequestsService.processBatches();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        3,
        `green-Batch of pull requests`,
        `white-#value-1`,
        `green-processed`
      );
    });

    describe(`when this batch does not contains more pull requests to process`, (): void => {
      let gitHubApiPullRequest1: IGithubApiPullRequest;
      let gitHubApiPullRequest2: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
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

        await PullRequestsService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `green-All the pull requests batches were processed`);
      });
    });

    describe(`when this batch contains more pull requests to process`, (): void => {
      let gitHubApiPullRequest1: IGithubApiPullRequest;
      let gitHubApiPullRequest2: IGithubApiPullRequest;
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
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

        await PullRequestsService.processBatches();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of pull requests`);
      });

      it(`should process the next batch of pull requests`, async (): Promise<void> => {
        expect.assertions(2);

        await PullRequestsService.processBatches();

        expect(processBatchesSpy).toHaveBeenCalledTimes(2);
        expect(processBatchesSpy).toHaveBeenNthCalledWith(2, 2, `dummy-end-cursor`);
      });
    });
  });
});
