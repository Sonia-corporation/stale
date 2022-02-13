import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GithubApiIssueCommentsService } from '@github/api/comments/github-api-issue-comments.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiIssueCommentsService`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiIssueCommentsService(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiIssueCommentsService: GithubApiIssueCommentsService;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`addComment()`, (): void => {
      let issueId: IUuid;
      let comment: IComment;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseCalledApiIssuesMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        comment = faker.random.words();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiIssueCommentsService = new GithubApiIssueCommentsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        issuesStatisticsServiceIncreaseCalledApiIssuesMutationsCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseCalledApiIssuesMutationsCount`)
          .mockImplementation();
      });

      it(`should add the comment on the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiIssueCommentsService.addComment(issueId, comment)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Adding the comment`,
          `value-${comment}`,
          `whiteBright-on the issue`,
          `value-${issueId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_COMMENT_MUTATION, {
          comment,
          id: issueId,
        });
      });

      describe(`when the comment failed to be added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiIssueCommentsService.addComment(issueId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to add the comment`,
            `value-${comment}`,
            `red-on the issue`,
            `value-${issueId}`
          );
        });

        it(`should annotate about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiIssueCommentsService.addComment(issueId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationError.FAILED_ADDING_COMMENT, {
            file: `abstract-github-api-comments.service.ts`,
            startLine: 42,
            title: `Error`,
          });
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiIssueCommentsService.addComment(issueId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });

        it(`should not increase the statistic regarding the API issues mutations`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiIssueCommentsService.addComment(issueId, comment)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issuesStatisticsServiceIncreaseCalledApiIssuesMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the comment was successfully added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the addition`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiIssueCommentsService.addComment(issueId, comment);

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Comment`,
            `value-${comment}`,
            `green-added to the issue`,
            `value-${issueId}`
          );
        });

        it(`should increase the statistic regarding the API issues mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiIssueCommentsService.addComment(issueId, comment);

          expect(issuesStatisticsServiceIncreaseCalledApiIssuesMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(issuesStatisticsServiceIncreaseCalledApiIssuesMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
