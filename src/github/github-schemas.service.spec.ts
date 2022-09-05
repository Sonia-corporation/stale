import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-remove-issue-comment-mutation';
import { GITHUB_API_REMOVE_PULL_REQUEST_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-remove-pull-request-comment-mutation';
import { GITHUB_API_CLOSE_ISSUE_MUTATION } from '@github/api/issues/constants/github-api-close-issue-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_ADD_LABELS_MUTATION } from '@github/api/labels/constants/github-api-add-labels-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { GITHUB_API_REMOVE_LABELS_MUTATION } from '@github/api/labels/constants/github-api-remove-labels-mutation';
import { GITHUB_API_CLOSE_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-close-pull-request-mutation';
import { GITHUB_API_DRAFT_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-draft-pull-request-mutation';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { GITHUB_API_DELETE_REFERENCE_MUTATION } from '@github/api/references/constants/github-api-delete-reference-mutation';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { GithubSchemasService } from '@github/github-schemas.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import * as GraphqlSchemaModule from '@octokit/graphql-schema';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@octokit/graphql-schema`);

describe(`GithubSchemasService`, (): void => {
  describe(`initialize()`, (): void => {
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let coreSetFailedSpy: jest.SpyInstance;
    let graphqlSchemaValidateSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceDebugSpy = jest.spyOn(LoggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      coreSetFailedSpy = jest.spyOn(core, `setFailed`).mockImplementation();
      graphqlSchemaValidateSpy = jest.spyOn(GraphqlSchemaModule, `validate`).mockReturnValue([]);
    });

    it(`should log about processing the GitHub schemas`, (): void => {
      expect.assertions(2);

      GithubSchemasService.initialize();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(
        1,
        `Processing`,
        `value-17`,
        `whiteBright-GitHub schemas to find potential errors...`
      );
    });

    it(`should validate all the GitHub schemas`, (): void => {
      expect.assertions(18);

      GithubSchemasService.initialize();

      expect(graphqlSchemaValidateSpy).toHaveBeenCalledTimes(17);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(1, GITHUB_API_ADD_COMMENT_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(2, GITHUB_API_ISSUES_QUERY);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(3, GITHUB_API_CLOSE_PULL_REQUEST_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(4, GITHUB_API_DRAFT_PULL_REQUEST_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(5, GITHUB_API_PULL_REQUESTS_QUERY);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(6, GITHUB_API_DELETE_REFERENCE_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(7, GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(
        8,
        GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY
      );
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(9, GITHUB_API_ADD_LABEL_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(10, GITHUB_API_ADD_LABELS_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(11, GITHUB_API_LABEL_BY_NAME_QUERY);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(12, GITHUB_API_LABELS_BY_NAME_QUERY);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(13, GITHUB_API_REMOVE_LABEL_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(14, GITHUB_API_REMOVE_LABELS_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(15, GITHUB_API_CLOSE_ISSUE_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(16, GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION);
      expect(graphqlSchemaValidateSpy).toHaveBeenNthCalledWith(17, GITHUB_API_REMOVE_PULL_REQUEST_COMMENT_MUTATION);
    });

    describe(`when there is no error found on the schemas`, (): void => {
      beforeEach((): void => {
        graphqlSchemaValidateSpy.mockReturnValue([]);
      });

      it(`should log about successfully processed the GitHub schemas`, (): void => {
        expect.assertions(2);

        GithubSchemasService.initialize();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, `All GitHub schemas processed without finding error`);
      });

      it(`should not exit the action`, (): void => {
        expect.assertions(1);

        GithubSchemasService.initialize();

        expect(coreSetFailedSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is one error found on the schemas`, (): void => {
      beforeEach((): void => {
        graphqlSchemaValidateSpy.mockReturnValueOnce([new Error(`Schema error`)]);
      });

      it(`should log about finding an error`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, `Found`, `value-1`, `red-GitHub schemas error`);
      });

      it(`should log the error`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, `Error: Schema error`);
      });

      it(`should exit the action with an error message`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(coreSetFailedSpy).toHaveBeenCalledTimes(1);
        expect(coreSetFailedSpy).toHaveBeenCalledWith(`GitHub schemas checks failed with error`);
      });

      it(`should log about canceling the processing`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, `Cancel the processing`);
      });

      it(`should log to encourage the user to report the issue`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `Please, report the issue by creating a bug ticket on GitHub!`
        );
      });

      it(`should throw an error`, (): void => {
        expect.assertions(3);

        expect((): void => GithubSchemasService.initialize()).toThrow(
          new Error(`GitHub schemas checks failed with error`)
        );

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `Please, report the issue by creating a bug ticket on GitHub!`
        );
      });
    });
  });
});
