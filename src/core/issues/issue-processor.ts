import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueIsStaleProcessor } from '@core/issues/issue-is-stale-processor';
import { IssueLogger } from '@core/issues/issue-logger';
import { IssueRemoveStaleProcessor } from '@core/issues/issue-remove-stale-processor';
import { IssueStaleProcessor } from '@core/issues/issue-stale-processor';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { createLink } from '@utils/links/create-link';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The main processor to process an issue
 */
export class IssueProcessor {
  public readonly githubIssue: IGithubApiIssue;
  public readonly logger: IssueLogger;

  public constructor(issue: Readonly<IGithubApiIssue>) {
    this.githubIssue = issue;
    this.logger = new IssueLogger(this.githubIssue.number);
  }

  /**
   * @description
   * First step to process an issue
   * @returns {Promise<void>}
   */
  public async process(): Promise<void> {
    this.logger.startGroup(
      `Processing the issue`,
      `${LoggerFormatService.magenta(
        createLink(_.toString(this.githubIssue.number), this.githubIssue.url)
      )}${LoggerFormatService.whiteBright(`...`)}`
    );

    if (this.shouldIgnore$$()) {
      this.logger.info(`Ignored`);
      this.stopProcessing$$();

      return;
    }

    if (this.isAlreadyStale$$()) {
      this.logger.info(`Already stale`);

      await this.processToRemoveStale$$();

      // @todo add the closing logic here
      this.stopProcessing$$();

      return;
    }

    return this.processForStale$$();
  }

  /**
   * @description
   * Return the updatedAt issue field formatted as a {DateTime}
   * @returns {DateTime} Returns the updatedAt field formatted as a {DateTime}
   */
  public getUpdatedAt(): DateTime {
    const dateTime: DateTime = DateTime.fromISO(this.githubIssue.updatedAt);

    if (_.isString(dateTime.invalidReason)) {
      throw new Error(dateTime.invalidReason);
    }

    return dateTime;
  }

  /**
   * @description
   * Only used log the end of the processing for this issue
   */
  public stopProcessing$$(): void {
    this.logger.info(`Processing stopped`);
    this.logger.endGroup();
  }

  /**
   * @description
   * The first thing to do
   * Check if the issue is a good candidate for processing or not
   * @returns {boolean} Returns true if the issue should be ignored by the processor
   */
  public shouldIgnore$$(): boolean {
    return new IssueIgnoreProcessor(this).shouldIgnore();
  }

  /**
   * @description
   * Second step to process an issue
   * At this point, the issue can really be processed (not ignored) to eventually be stale
   * @returns {Promise<void>}
   */
  public async processForStale$$(): Promise<void> {
    const issueStaleProcessor: IssueStaleProcessor = new IssueStaleProcessor(this);

    if (issueStaleProcessor.shouldStale()) {
      await issueStaleProcessor.stale();
    }

    this.stopProcessing$$();
  }

  /**
   * @description
   * Used to check if the issue is stale (when the stale label is added)
   * @returns {boolean} Returns true if the issue is stale
   */
  public isAlreadyStale$$(): boolean {
    const issueIsStaleProcessor: IssueIsStaleProcessor = new IssueIsStaleProcessor(this);

    return issueIsStaleProcessor.isStale();
  }

  /**
   * @description
   * Used to remove the stale state from the issue
   * Typically, the stale label should be removed by this
   * @returns {Promise<void>} No useful information returned
   */
  public processToRemoveStale$$(): Promise<void> {
    const issueRemoveStaleProcessor: IssueRemoveStaleProcessor = new IssueRemoveStaleProcessor(this);

    return issueRemoveStaleProcessor.removeStale();
  }
}
