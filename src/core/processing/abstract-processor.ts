import { IssueLogger } from '@core/processing/issues/issue-logger';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { createLink } from '@utils/links/create-link';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

export abstract class AbstractProcessor<
  TItem extends IGithubApiIssue | IGithubApiPullRequest,
  TLogger extends IssueLogger | PullRequestLogger,
> {
  public abstract readonly type: 'issue' | 'pull request';
  public readonly item: TItem;
  public readonly logger: TLogger;

  public constructor(item: Readonly<TItem>, logger: TLogger) {
    this.item = item;
    this.logger = logger;
  }

  /**
   * @description
   * First step to process an item
   * @returns {Promise<void>}
   */
  public async process(): Promise<void> {
    this.logger.startGroup(
      `Processing the ${this.type}`,
      `${LoggerFormatService.magenta(
        createLink(_.toString(this.item.number), this.item.url)
      )}${LoggerFormatService.whiteBright(`...`)}`
    );

    if (this.shouldIgnore$$()) {
      this.logger.info(`Ignored`);
      this._increaseIgnoredCount();
      this.stopProcessing$$();

      return;
    }

    if (!this.shouldInclude$$()) {
      this.logger.info(`Ignored`);
      this._increaseIgnoredCount();
      this.stopProcessing$$();

      return;
    }

    if (this.isAlreadyStale$$()) {
      this.logger.info(`Already stale`);
      this._increaseAlreadyStaleCount();

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
   * Return the updatedAt item field formatted as a {DateTime}
   * @returns {DateTime} Returns the updatedAt field formatted as a {DateTime}
   */
  public getUpdatedAt(): DateTime {
    return iso8601ToDatetime(this.item.updatedAt);
  }

  /**
   * @description
   * Return the createdAt item field formatted as a {DateTime}
   * @returns {DateTime} Returns the createdAt field formatted as a {DateTime}
   */
  public getCreatedAt(): DateTime {
    return iso8601ToDatetime(this.item.createdAt);
  }

  /**
   * @description
   * Only used log the end of the processing for this item
   */
  public stopProcessing$$(): void {
    this.logger.info(`Processing stopped`);
    this.logger.endGroup();
  }

  public abstract shouldIgnore$$(): boolean;

  public abstract shouldInclude$$(): boolean;

  public abstract processForStale$$(): Promise<void>;

  public abstract isAlreadyStale$$(): boolean;

  public abstract processToRemoveStale$$(): Promise<boolean>;

  public abstract processForClose$$(): Promise<void>;

  protected abstract _increaseIgnoredCount(): void;

  protected abstract _increaseAlreadyStaleCount(): void;
}
