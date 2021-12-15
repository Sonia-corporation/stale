import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export class PullRequestsService {
  public static async process(): Promise<void> {
    await PullRequestsService.processBatches();

    LoggerService.info(LoggerFormatService.green(`All the pull requests were processed`));
  }

  public static async processBatches(batch: Readonly<number> = 1, fromPageId?: Readonly<string>): Promise<void> {
    LoggerService.info(
      `Fetching the batch of pull requests`,
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}${LoggerFormatService.whiteBright(
        `...`
      )}`
    );

    const pullRequests: IGithubApiGetPullRequests | never = await GithubApiPullRequestsService.fetchPullRequests(
      fromPageId
    );
    const pullRequestsCount: number = pullRequests.repository.pullRequests.nodes.length;

    LoggerService.info(
      `Found`,
      LoggerService.value(_.toString(pullRequestsCount)),
      LoggerFormatService.whiteBright(`pull request${pullRequestsCount > 1 ? `s` : ``} in the batch`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`
    );

    for (const pullRequest of pullRequests.repository.pullRequests.nodes) {
      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single pull request at a time
      // eslint-disable-next-line no-await-in-loop
      await new PullRequestProcessor(pullRequest).process();

      PullRequestsStatisticsService.increaseProcessedPullRequestsCount();
    }

    LoggerService.info(
      LoggerFormatService.green(`Batch of pull requests`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`,
      LoggerFormatService.green(`processed`)
    );

    if (pullRequests.repository.pullRequests.pageInfo.hasNextPage) {
      LoggerService.info(`Continuing with the next batch of pull requests`);

      await PullRequestsService.processBatches(++batch, pullRequests.repository.pullRequests.pageInfo.endCursor);
    } else {
      LoggerService.info(LoggerFormatService.green(`All the pull requests batches were processed`));
    }
  }
}
