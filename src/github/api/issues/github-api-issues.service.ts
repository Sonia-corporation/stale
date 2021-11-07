import { IGithubApiIssues } from './github-api-issues.interface';
import { LoggerService } from '../../../utils/loggers/logger.service';
import { OctokitService } from '../../octokit/octokit.service';
import { context } from '@actions/github';

const ISSUES_PER_PAGE = 20;

export class GithubApiIssuesService {
  public static readonly issuesPerPage = ISSUES_PER_PAGE;

  public static fetchIssues(): Promise<IGithubApiIssues> {
    LoggerService.info(`Fetching the issues from GitHub...`);

    return OctokitService.getOctokit()
      .graphql<IGithubApiIssues>(
        `
        query MyQuery($owner: String!, $repository: String!, $issuesPerPage: Int!) {
          repository(name: $repository, owner: $owner) {
            issues(orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN, first: $issuesPerPage) {
              pageInfo {
                hasNextPage
              }
              totalCount
              nodes {
                locked
                createdAt
                number
                updatedAt
                url
              }
            }
          }
        }
      `,
        {
          issuesPerPage: GithubApiIssuesService.issuesPerPage,
          owner: context.repo.owner,
          repository: context.repo.repo,
        }
      )
      .then((response: Readonly<IGithubApiIssues>): IGithubApiIssues => {
        const { totalCount } = response.repository.issues;

        if (totalCount === 0) {
          LoggerService.notice(`No issue fetched`);
        } else {
          LoggerService.info(`${totalCount} issue${totalCount > 1 ? `s` : ``} fetched`);
        }

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the issues`);

        throw error;
      });
  }
}
