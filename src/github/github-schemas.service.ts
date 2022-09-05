import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-remove-issue-comment-mutation';
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
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';
import { validate } from '@octokit/graphql-schema';
import _ from 'lodash';

type IErrors = ReturnType<typeof validate>;

const SCHEMAS: string[] = [
  GITHUB_API_ADD_COMMENT_MUTATION,
  GITHUB_API_ISSUES_QUERY,
  GITHUB_API_CLOSE_PULL_REQUEST_MUTATION,
  GITHUB_API_DRAFT_PULL_REQUEST_MUTATION,
  GITHUB_API_PULL_REQUESTS_QUERY,
  GITHUB_API_DELETE_REFERENCE_MUTATION,
  GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY,
  GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY,
  GITHUB_API_ADD_LABEL_MUTATION,
  GITHUB_API_ADD_LABELS_MUTATION,
  GITHUB_API_LABEL_BY_NAME_QUERY,
  GITHUB_API_LABELS_BY_NAME_QUERY,
  GITHUB_API_REMOVE_LABEL_MUTATION,
  GITHUB_API_REMOVE_LABELS_MUTATION,
  GITHUB_API_CLOSE_ISSUE_MUTATION,
  GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION,
];

export class GithubSchemasService {
  public static initialize(): void | never {
    return GithubSchemasService._processAllSchemas();
  }

  private static _processAllSchemas(): void | never {
    LoggerService.debug(
      `Processing`,
      LoggerService.value(_.size(SCHEMAS)),
      LoggerFormatService.whiteBright(`GitHub schemas to find potential errors...`)
    );

    const errors: IErrors = GithubSchemasService._validateAllSchemas();

    if (!_.isEmpty(errors)) {
      const errorsCount: number = _.size(errors);

      LoggerService.error(
        `Found`,
        LoggerService.value(errorsCount),
        LoggerFormatService.red(`GitHub schemas error${errorsCount > 1 ? `s` : ``}`)
      );

      _.forEach(errors, (error: Readonly<typeof errors[number]>): void => {
        LoggerService.error(_.toString(error));
      });

      const error: string = `GitHub schemas checks failed with error${errorsCount > 1 ? `s` : ``}`;

      core.setFailed(error);

      LoggerService.debug(`Cancel the processing`);
      LoggerService.info(`Please, report the issue by creating a bug ticket on GitHub!`);

      throw new Error(error);
    }

    LoggerService.debug(`All GitHub schemas processed without finding error`);
  }

  private static _validateAllSchemas(): IErrors {
    return _.flatten(_.map(SCHEMAS, (schema: Readonly<string>): IErrors => validate(schema)));
  }
}
