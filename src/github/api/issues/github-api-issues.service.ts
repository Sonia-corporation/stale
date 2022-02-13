import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GITHUB_API_CLOSE_ISSUE_MUTATION } from '@github/api/issues/constants/github-api-close-issue-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GITHUB_ASSIGNEES_PER_ISSUE } from '@github/api/issues/constants/github-assignees-per-issue';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/constants/github-issues-per-page';
import { GITHUB_LABELS_PER_ISSUE } from '@github/api/issues/constants/github-labels-per-issue';
import { GITHUB_PROJECT_CARDS_PER_ISSUE } from '@github/api/issues/constants/github-project-cards-per-issue';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorIssue } from '@utils/annotations/enums/annotation-error-issue.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiIssuesService {
  public static readonly issuesPerPage = GITHUB_ISSUES_PER_PAGE;
  public static readonly labelsPerIssue = GITHUB_LABELS_PER_ISSUE;
  public static readonly assigneesPerIssue = GITHUB_ASSIGNEES_PER_ISSUE;
  public static readonly projectCardsPerIssue = GITHUB_PROJECT_CARDS_PER_ISSUE;

  public static fetchIssues(fromPageId?: Readonly<string>): Promise<IGithubApiGetIssues> | never {
    LoggerService.info(`Fetching the issues from GitHub...`);

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetIssues>(GITHUB_API_ISSUES_QUERY, {
        afterCursor: fromPageId,
        assigneesPerIssue: GithubApiIssuesService.assigneesPerIssue,
        issuesPerPage: GithubApiIssuesService.issuesPerPage,
        labelsPerIssue: GithubApiIssuesService.labelsPerIssue,
        owner: context.repo.owner,
        projectCardsPerIssue: GithubApiIssuesService.projectCardsPerIssue,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetIssues>): IGithubApiGetIssues => {
        // Only log the first time (when we do not have some pagination yet)
        if (!fromPageId) {
          const { totalCount } = response.repository.issues;

          if (totalCount === 0) {
            LoggerService.info(`No issue can be processed`);
          } else {
            LoggerService.info(
              LoggerService.value(_.toString(totalCount)),
              LoggerFormatService.whiteBright(`issue${totalCount > 1 ? `s` : ``} can be processed`)
            );
          }
        } else {
          LoggerService.debug(
            `Fetched from the page id`,
            LoggerService.value(fromPageId),
            LoggerFormatService.whiteBright(`(afterCursor)`)
          );
        }

        IssuesStatisticsService.getInstance().increaseCalledApiIssuesQueriesCount();

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the issues`);
        AnnotationsService.error(EAnnotationErrorIssue.FAILED_FETCHING_ISSUES, {
          file: `github-api-issues.service.ts`,
          startLine: 63,
          title: `Error`,
        });

        throw error;
      });
  }

  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: IssueProcessor) {
    this.issueProcessor = issueProcessor;
  }

  public closeIssue(issueId: Readonly<IUuid>): Promise<void> | never {
    this.issueProcessor.logger.info(
      `Closing the issue`,
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_CLOSE_ISSUE_MUTATION, {
        issueId,
      })
      .then((): void => {
        IssuesStatisticsService.getInstance().increaseCalledApiIssuesMutationsCount();
        this.issueProcessor.logger.info(
          LoggerFormatService.green(`Issue`),
          LoggerService.value(issueId),
          LoggerFormatService.green(`closed`)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(`Failed to close the issue`, LoggerService.value(issueId));
        AnnotationsService.error(EAnnotationErrorIssue.FAILED_CLOSE, {
          file: `github-api-issues.service.ts`,
          startLine: 99,
          title: `Error`,
        });

        throw error;
      });
  }
}
