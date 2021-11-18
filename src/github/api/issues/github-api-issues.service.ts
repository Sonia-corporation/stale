import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/constants/github-issues-per-page';
import { GITHUB_LABELS_PER_ISSUE } from '@github/api/issues/constants/github-labels-per-issue';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiIssuesService {
  public static readonly issuesPerPage = GITHUB_ISSUES_PER_PAGE;
  public static readonly labelsPerIssue = GITHUB_LABELS_PER_ISSUE;

  public static fetchIssues(fromPageId?: Readonly<string>): Promise<IGithubApiGetIssues> | never {
    LoggerService.info(`Fetching the issues from GitHub...`);

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetIssues>(GITHUB_API_ISSUES_QUERY, {
        afterCursor: fromPageId,
        issuesPerPage: GithubApiIssuesService.issuesPerPage,
        labelsPerIssue: GithubApiIssuesService.labelsPerIssue,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetIssues>): IGithubApiGetIssues => {
        // Only log the first time (when we do not have some pagination yet)
        if (!fromPageId) {
          const { totalCount } = response.repository.issues;

          if (totalCount === 0) {
            LoggerService.notice(`No issue can be processed`);
          } else {
            LoggerService.info(
              LoggerService.value(_.toString(totalCount)),
              LoggerFormatService.whiteBright(`issue${totalCount > 1 ? `s` : ``} can be processed`)
            );
          }
        }

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the issues`);

        throw error;
      });
  }
}
