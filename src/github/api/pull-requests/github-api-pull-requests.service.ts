import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GITHUB_API_CLOSE_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-close-pull-request-mutation';
import { GITHUB_API_DRAFT_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-draft-pull-request-mutation';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { GITHUB_ASSIGNEES_PER_PULL_REQUEST } from '@github/api/pull-requests/constants/github-assignees-per-pull-request';
import { GITHUB_LABELS_PER_PULL_REQUEST } from '@github/api/pull-requests/constants/github-labels-per-pull-request';
import { GITHUB_PROJECT_CARDS_PER_PULL_REQUEST } from '@github/api/pull-requests/constants/github-project-cards-per-pull-request';
import { GITHUB_PULL_REQUESTS_PER_PAGE } from '@github/api/pull-requests/constants/github-pull-requests-per-page';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiPullRequestsService {
  public static readonly pullRequestsPerPage = GITHUB_PULL_REQUESTS_PER_PAGE;
  public static readonly labelsPerPullRequest = GITHUB_LABELS_PER_PULL_REQUEST;
  public static readonly assigneesPerPullRequest = GITHUB_ASSIGNEES_PER_PULL_REQUEST;
  public static readonly projectCardsPerPullRequest = GITHUB_PROJECT_CARDS_PER_PULL_REQUEST;

  public static fetchPullRequests(fromPageId?: Readonly<string>): Promise<IGithubApiGetPullRequests> | never {
    LoggerService.info(`Fetching the pull requests from GitHub...`);

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetPullRequests>(GITHUB_API_PULL_REQUESTS_QUERY, {
        afterCursor: fromPageId,
        assigneesPerPullRequest: GithubApiPullRequestsService.assigneesPerPullRequest,
        labelsPerPullRequest: GithubApiPullRequestsService.labelsPerPullRequest,
        owner: context.repo.owner,
        projectCardsPerPullRequest: GithubApiPullRequestsService.projectCardsPerPullRequest,
        pullRequestsPerPage: GithubApiPullRequestsService.pullRequestsPerPage,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetPullRequests>): IGithubApiGetPullRequests => {
        // Only log the first time (when we do not have some pagination yet)
        if (!fromPageId) {
          const { totalCount } = response.repository.pullRequests;

          if (totalCount === 0) {
            LoggerService.notice(`No pull request can be processed`);
          } else {
            LoggerService.info(
              LoggerService.value(_.toString(totalCount)),
              LoggerFormatService.whiteBright(`pull request${totalCount > 1 ? `s` : ``} can be processed`)
            );
          }
        } else {
          LoggerService.debug(
            `Fetched from the page id`,
            LoggerService.value(fromPageId),
            LoggerFormatService.whiteBright(`(afterCursor)`)
          );
        }

        PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsQueriesCount();

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the pull requests`);

        throw error;
      });
  }

  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public closePullRequest(pullRequestId: Readonly<IUuid>): Promise<void> | never {
    this.pullRequestProcessor.logger.info(
      `Closing the pull request`,
      `${LoggerService.value(pullRequestId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_CLOSE_PULL_REQUEST_MUTATION, {
        pullRequestId,
      })
      .then((): void => {
        PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsMutationsCount();
        this.pullRequestProcessor.logger.info(
          LoggerFormatService.green(`Pull request`),
          LoggerService.value(pullRequestId),
          LoggerFormatService.green(`closed`)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.pullRequestProcessor.logger.error(`Failed to close the pull request`, LoggerService.value(pullRequestId));

        throw error;
      });
  }

  public draftPullRequest(pullRequestId: Readonly<IUuid>): Promise<void> | never {
    this.pullRequestProcessor.logger.info(
      `Converting the pull request`,
      LoggerService.value(pullRequestId),
      LoggerFormatService.whiteBright(`to draft...`)
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_DRAFT_PULL_REQUEST_MUTATION, {
        pullRequestId,
      })
      .then((): void => {
        PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsMutationsCount();
        this.pullRequestProcessor.logger.info(
          LoggerFormatService.green(`Pull request`),
          LoggerService.value(pullRequestId),
          LoggerFormatService.green(`converted to draft`)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.pullRequestProcessor.logger.error(`Failed to draft the pull request`, LoggerService.value(pullRequestId));

        throw error;
      });
  }
}
