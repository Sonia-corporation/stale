import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GithubApiPullRequestCommentsService } from '@github/api/comments/github-api-pull-request-comments.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiPullRequestCommentsService`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiPullRequestCommentsService(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiPullRequestCommentsService: GithubApiPullRequestCommentsService;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`addComment()`, (): void => {
      let pullRequestId: IUuid;
      let comment: IComment;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        comment = faker.random.words();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestCommentsService = new GithubApiPullRequestCommentsService(pullRequestProcessor);

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

      it(`should add the comment on the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestCommentsService.addComment(pullRequestId, comment)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Adding the comment`,
          `value-${comment}`,
          `whiteBright-on the pull request`,
          `value-${pullRequestId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_COMMENT_MUTATION, {
          comment,
          id: pullRequestId,
        });
      });

      describe(`when the comment failed to be added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestCommentsService.addComment(pullRequestId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to add the comment`,
            `value-${comment}`,
            `red-on the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should annotate about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestCommentsService.addComment(pullRequestId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationError.FAILED_ADDING_COMMENT);
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiPullRequestCommentsService.addComment(pullRequestId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestCommentsService.addComment(pullRequestId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the comment was successfully added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the addition`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestCommentsService.addComment(pullRequestId, comment);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Comment`,
            `value-${comment}`,
            `green-added to the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestCommentsService.addComment(pullRequestId, comment);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
