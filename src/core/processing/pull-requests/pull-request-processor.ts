import { PullRequestCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-close-stale-processor';
import { PullRequestIgnoreProcessor } from '@core/processing/pull-requests/pull-request-ignore-processor';
import { PullRequestIsStaleProcessor } from '@core/processing/pull-requests/pull-request-is-stale-processor';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { PullRequestRemoveStaleProcessor } from '@core/processing/pull-requests/pull-request-remove-stale-processor';
import { PullRequestShouldCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-should-close-stale-processor';
import { PullRequestStaleProcessor } from '@core/processing/pull-requests/pull-request-stale-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { createLink } from '@utils/links/create-link';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The main processor to process a pull request
 */
export class PullRequestProcessor {
  public readonly githubPullRequest: IGithubApiPullRequest;
  public readonly logger: PullRequestLogger;
  public readonly type: 'pull request' = `pull request`;

  public constructor(pullRequest: Readonly<IGithubApiPullRequest>) {
    this.githubPullRequest = pullRequest;
    this.logger = new PullRequestLogger(this.githubPullRequest.number);
  }

  /**
   * @description
   * First step to process a pull request
   * @returns {Promise<void>}
   */
  public async process(): Promise<void> {
    this.logger.startGroup(
      `Processing the pull request`,
      `${LoggerFormatService.magenta(
        createLink(_.toString(this.githubPullRequest.number), this.githubPullRequest.url)
      )}${LoggerFormatService.whiteBright(`...`)}`
    );

    if (this.shouldIgnore$$()) {
      this.logger.info(`Ignored`);
      PullRequestsStatisticsService.getInstance().increaseIgnoredPullRequestsCount();
      this.stopProcessing$$();

      return;
    }

    if (this.isAlreadyStale$$()) {
      this.logger.info(`Already stale`);
      PullRequestsStatisticsService.getInstance().increaseAlreadyStalePullRequestsCount();

      const isStaleStateRemoved: boolean = await this.processToRemoveStale$$();

      if (!isStaleStateRemoved) {
        await this.processForClose$$();
      } else {
        this.stopProcessing$$();
      }

      return;
    }

    return this.processForStale$$();
  }

  /**
   * @description
   * Return the updatedAt pull request field formatted as a {DateTime}
   * @returns {DateTime} Returns the updatedAt field formatted as a {DateTime}
   */
  public getUpdatedAt(): DateTime {
    return iso8601ToDatetime(this.githubPullRequest.updatedAt);
  }

  /**
   * @description
   * Return the createdAt pull request field formatted as a {DateTime}
   * @returns {DateTime} Returns the createdAt field formatted as a {DateTime}
   */
  public getCreatedAt(): DateTime {
    return iso8601ToDatetime(this.githubPullRequest.createdAt);
  }

  /**
   * @description
   * Only used log the end of the processing for this pull request
   */
  public stopProcessing$$(): void {
    this.logger.info(`Processing stopped`);
    this.logger.endGroup();
  }

  /**
   * @description
   * The first thing to do
   * Check if the pull request is a good candidate for processing or not
   * @returns {boolean} Returns true if the pull request should be ignored by the processor
   */
  public shouldIgnore$$(): boolean {
    return new PullRequestIgnoreProcessor(this).shouldIgnore();
  }

  /**
   * @description
   * Second step to process a pull request
   * At this point, the pull request can really be processed (not ignored) to eventually be stale
   * @returns {Promise<void>}
   */
  public async processForStale$$(): Promise<void> {
    const pullRequestStaleProcessor: PullRequestStaleProcessor = new PullRequestStaleProcessor(this);

    if (pullRequestStaleProcessor.shouldStale()) {
      await pullRequestStaleProcessor.stale();
      PullRequestsStatisticsService.getInstance().increaseStalePullRequestsCount();
    } else {
      PullRequestsStatisticsService.getInstance().increaseUnalteredPullRequestsCount();
    }

    this.stopProcessing$$();
  }

  /**
   * @description
   * Used to check if the pull request is stale (when the stale label is added)
   * @returns {boolean} Returns true if the pull request is stale
   */
  public isAlreadyStale$$(): boolean {
    const pullRequestIsStaleProcessor: PullRequestIsStaleProcessor = new PullRequestIsStaleProcessor(this);

    return pullRequestIsStaleProcessor.isStale();
  }

  /**
   * @description
   * Used to remove the stale state from the pull request (when the conditions are met)
   * Typically, the stale label should be removed by this
   * If the stale state was removed, the processing should be stopped
   * @returns {Promise<boolean>} Returns true when the stale state was removed and the processing should be stopped
   */
  public async processToRemoveStale$$(): Promise<boolean> {
    const pullRequestRemoveStaleProcessor: PullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(this);

    if (await pullRequestRemoveStaleProcessor.shouldRemoveStale()) {
      await pullRequestRemoveStaleProcessor.removeStale();
      PullRequestsStatisticsService.getInstance().increaseRemoveStalePullRequestsCount();

      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  public async processForClose$$(): Promise<void> {
    const pullRequestShouldCloseStaleProcessor: PullRequestShouldCloseStaleProcessor =
      new PullRequestShouldCloseStaleProcessor(this);

    if (pullRequestShouldCloseStaleProcessor.shouldClose()) {
      const pullRequestCloseStaleProcessor: PullRequestCloseStaleProcessor = new PullRequestCloseStaleProcessor(this);

      await pullRequestCloseStaleProcessor.close();
      PullRequestsStatisticsService.getInstance().increaseClosedPullRequestsCount();
    } else {
      PullRequestsStatisticsService.getInstance().increaseUnalteredPullRequestsCount();
    }

    this.stopProcessing$$();
  }
}
