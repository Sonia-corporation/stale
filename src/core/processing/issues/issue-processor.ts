import { AbstractProcessor } from '@core/processing/abstract-processor';
import { IssueCloseStaleProcessor } from '@core/processing/issues/issue-close-stale-processor';
import { IssueIgnoreProcessor } from '@core/processing/issues/issue-ignore-processor';
import { IssueIsStaleProcessor } from '@core/processing/issues/issue-is-stale-processor';
import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueRemoveStaleProcessor } from '@core/processing/issues/issue-remove-stale-processor';
import { IssueShouldCloseProcessor } from '@core/processing/issues/issue-should-close-processor';
import { IssueStaleProcessor } from '@core/processing/issues/issue-stale-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';

/**
 * @description
 * The main processor to process an issue
 */
export class IssueProcessor extends AbstractProcessor<IGithubApiIssue, IssueLogger> {
  public readonly type: 'issue' = `issue`;
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
      IssuesStatisticsService.getInstance().increaseStaleIssuesCount();
    } else {
      IssuesStatisticsService.getInstance().increaseUnalteredIssuesCount();
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
   * Used to remove the stale state from the issue (when the conditions are met)
   * Typically, the stale label should be removed by this
   * If the stale state was removed, the processing should be stopped
   * @returns {Promise<boolean>} Returns true when the stale state was removed and the processing should be stopped
   */
  public async processToRemoveStale$$(): Promise<boolean> {
    const issueRemoveStaleProcessor: IssueRemoveStaleProcessor = new IssueRemoveStaleProcessor(this);

    if (await issueRemoveStaleProcessor.shouldRemoveStale()) {
      await issueRemoveStaleProcessor.removeStale();
      IssuesStatisticsService.getInstance().increaseRemoveStaleIssuesCount();

      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  public async processForClose$$(): Promise<void> {
    const issueShouldCloseStaleProcessor: IssueShouldCloseProcessor = new IssueShouldCloseProcessor(this);

    if (issueShouldCloseStaleProcessor.shouldClose()) {
      const issueCloseStaleProcessor: IssueCloseStaleProcessor = new IssueCloseStaleProcessor(this);

      await issueCloseStaleProcessor.close();
      IssuesStatisticsService.getInstance().increaseClosedIssuesCount();
    } else {
      IssuesStatisticsService.getInstance().increaseUnalteredIssuesCount();
    }

    this.stopProcessing$$();
  }

  protected _increaseIgnoredCount(): void {
    IssuesStatisticsService.getInstance().increaseIgnoredIssuesCount();
  }

  protected _increaseAlreadyStaleCount(): void {
    IssuesStatisticsService.getInstance().increaseAlreadyStaleIssuesCount();
  }
}
