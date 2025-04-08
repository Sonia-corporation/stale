import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GITHUB_API_CLOSE_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-close-pull-request-mutation';
import { GITHUB_API_DRAFT_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-draft-pull-request-mutation';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorPullRequest } from '@utils/annotations/enums/annotation-error-pull-request.enum';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiPullRequestsService`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  it(`should load 20 pull requests per batch`, (): void => {
    expect.assertions(1);

    expect(GithubApiPullRequestsService.pullRequestsPerPage).toBe(20);
  });

  it(`should load 20 labels per batch`, (): void => {
    expect.assertions(1);

    expect(GithubApiPullRequestsService.labelsPerPullRequest).toBe(20);
  });

  it(`should load 20 assignees per batch`, (): void => {
    expect.assertions(1);

    expect(GithubApiPullRequestsService.assigneesPerPullRequest).toBe(20);
  });

  it(`should load 20 projects per batch`, (): void => {
    expect.assertions(1);

    expect(GithubApiPullRequestsService.projectsPerPullRequest).toBe(20);
  });

  describe(`fetchPullRequests()`, (): void => {
    let graphqlMock: jest.Mock;

    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let annotationsServiceErrorSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let octokitServiceGetOctokitSpy: jest.SpyInstance;
    let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));

      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
        // @ts-ignore
        graphql: graphqlMock,
      });
      jest.spyOn(context, `repo`, `get`).mockReturnValue({
        owner: `dummy-owner`,
        repo: `dummy-repo`,
      });
      pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy = jest
        .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsQueriesCount`)
        .mockImplementation();
    });

    it(`should fetch the open pull requests (20 per page) per update date from oldest first`, async (): Promise<void> => {
      expect.assertions(7);

      await expect(GithubApiPullRequestsService.fetchPullRequests()).rejects.toThrow(new Error(`graphql error`));

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`Fetching the pull requests from GitHub...`);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
      expect(graphqlMock).toHaveBeenCalledTimes(1);
      expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_PULL_REQUESTS_QUERY, {
        afterCursor: undefined,
        assigneesPerPullRequest: 20,
        labelsPerPullRequest: 20,
        owner: `dummy-owner`,
        projectsPerPullRequest: 20,
        pullRequestsPerPage: 20,
        repository: `dummy-repo`,
      });
    });

    describe(`when the pull requests failed to be fetched`, (): void => {
      beforeEach((): void => {
        graphqlMock.mockRejectedValue(new Error(`graphql error`));
      });

      it(`should log about the error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(GithubApiPullRequestsService.fetchPullRequests()).rejects.toThrow(new Error(`graphql error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`Failed to fetch the pull requests`);
      });

      it(`should annotate about the error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(GithubApiPullRequestsService.fetchPullRequests()).rejects.toThrow(new Error(`graphql error`));

        expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(
          EAnnotationErrorPullRequest.FAILED_FETCHING_PULL_REQUESTS,
          {
            file: `github-api-pull-requests.service.ts`,
            startLine: 64,
            title: `Error`,
          }
        );
      });

      it(`should rethrow`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(GithubApiPullRequestsService.fetchPullRequests()).rejects.toThrow(new Error(`graphql error`));
      });

      it(`should not increase the statistic regarding the API pull requests queries calls`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(GithubApiPullRequestsService.fetchPullRequests()).rejects.toThrow(new Error(`graphql error`));

        expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the pull requests were successfully fetched`, (): void => {
      let githubApiPullRequests: IGithubApiGetPullRequests;

      beforeEach((): void => {
        githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>();

        graphqlMock.mockResolvedValue(githubApiPullRequests);
      });

      describe(`when zero pull request was fetched`, (): void => {
        beforeEach((): void => {
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                totalCount: 0,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiPullRequests);
        });

        describe(`when the pull requests are fetched from the start`, (): void => {
          it(`should log that zero pull request was fetched`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests();

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `No pull request can be processed`);
          });
        });

        describe(`when the pull requests are fetched from the a previous page`, (): void => {
          let fromPageId: string;

          beforeEach((): void => {
            fromPageId = faker.datatype.string();
          });

          it(`should log the id of the previous page`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith(
              `Fetched from the page id`,
              `value-${fromPageId}`,
              `whiteBright-(afterCursor)`
            );
          });

          it(`should not log the number of fetched pull requests`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe(`when one pull request was fetched`, (): void => {
        beforeEach((): void => {
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                totalCount: 1,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiPullRequests);
        });

        describe(`when the pull requests are fetched from the start`, (): void => {
          it(`should log the number of fetched pull requests`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests();

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
              2,
              `value-1`,
              `whiteBright-pull request can be processed`
            );
          });
        });

        describe(`when the pull requests are fetched from the a previous page`, (): void => {
          let fromPageId: string;

          beforeEach((): void => {
            fromPageId = faker.datatype.string();
          });

          it(`should log the id of the previous page`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith(
              `Fetched from the page id`,
              `value-${fromPageId}`,
              `whiteBright-(afterCursor)`
            );
          });

          it(`should not log the number of fetched pull requests`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe(`when multiple pull requests were fetched`, (): void => {
        beforeEach((): void => {
          githubApiPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
            repository: {
              pullRequests: {
                totalCount: 2,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiPullRequests);
        });

        describe(`when the pull requests are fetched from the start`, (): void => {
          it(`should log the number of fetched pull requests`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests();

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
              2,
              `value-2`,
              `whiteBright-pull requests can be processed`
            );
          });
        });

        describe(`when the pull requests are fetched from the a previous page`, (): void => {
          let fromPageId: string;

          beforeEach((): void => {
            fromPageId = faker.datatype.string();
          });

          it(`should log the id of the previous page`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith(
              `Fetched from the page id`,
              `value-${fromPageId}`,
              `whiteBright-(afterCursor)`
            );
          });

          it(`should not log the number of fetched pull requests`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiPullRequestsService.fetchPullRequests(fromPageId);

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
        expect.assertions(2);

        await GithubApiPullRequestsService.fetchPullRequests();

        expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
      });

      it(`should return the pull requests`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await GithubApiPullRequestsService.fetchPullRequests();

        expect(result).toStrictEqual(githubApiPullRequests);
      });
    });
  });

  describe(`constructor()`, (): void => {
    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiPullRequestsService(pullRequestProcessor);

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiPullRequestsService: GithubApiPullRequestsService;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`closePullRequest()`, (): void => {
      let pullRequestId: IUuid;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestsService = new GithubApiPullRequestsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should close the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestsService.closePullRequest(pullRequestId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Closing the pull request`,
          `value-${pullRequestId}`,
          `whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_CLOSE_PULL_REQUEST_MUTATION, {
          pullRequestId,
        });
      });

      describe(`when the pull request failed to be closed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestsService.closePullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestsService.closePullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to close the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should annotate about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestsService.closePullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationErrorPullRequest.FAILED_CLOSE, {
            file: `github-api-pull-requests.service.ts`,
            startLine: 100,
            title: `Error`,
          });
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiPullRequestsService.closePullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });
      });

      describe(`when the pull request was successfully closed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestsService.closePullRequest(pullRequestId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });

        it(`should log about the success of the closing`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestsService.closePullRequest(pullRequestId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Pull request`,
            `value-${pullRequestId}`,
            `green-closed`
          );
        });
      });
    });

    describe(`draftPullRequest()`, (): void => {
      let pullRequestId: IUuid;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestsService = new GithubApiPullRequestsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should convert the pull request to draft`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestsService.draftPullRequest(pullRequestId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Converting the pull request`,
          `value-${pullRequestId}`,
          `whiteBright-to draft...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_DRAFT_PULL_REQUEST_MUTATION, {
          pullRequestId,
        });
      });

      describe(`when the pull request failed to be converted as draft`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestsService.draftPullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestsService.draftPullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to draft the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should annotate about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestsService.draftPullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationErrorPullRequest.FAILED_DRAFT, {
            file: `github-api-pull-requests.service.ts`,
            startLine: 131,
            title: `Error`,
          });
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiPullRequestsService.draftPullRequest(pullRequestId)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });
      });

      describe(`when the pull request was successfully converted to a draft`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestsService.draftPullRequest(pullRequestId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });

        it(`should log about the success of the conversion to draft`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestsService.draftPullRequest(pullRequestId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Pull request`,
            `value-${pullRequestId}`,
            `green-converted to draft`
          );
        });
      });
    });
  });
});
