import { AbstractProcessor } from '@core/processing/abstract-processor';
import { PullRequestCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-close-stale-processor';
import { PullRequestDeleteBranchProcessor } from '@core/processing/pull-requests/pull-request-delete-branch-processor';
import { PullRequestDraftProcessor } from '@core/processing/pull-requests/pull-request-draft-processor';
import { PullRequestIgnoreProcessor } from '@core/processing/pull-requests/pull-request-ignore-processor';
import { PullRequestIsStaleProcessor } from '@core/processing/pull-requests/pull-request-is-stale-processor';
import { PullRequestLogger } from '@core/processing/pull-requests/pull-request-logger';
import { PullRequestRemoveStaleProcessor } from '@core/processing/pull-requests/pull-request-remove-stale-processor';
import { PullRequestShouldCloseProcessor } from '@core/processing/pull-requests/pull-request-should-close-processor';
import { PullRequestStaleProcessor } from '@core/processing/pull-requests/pull-request-stale-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';

/**
 * @description
 * The main processor to process a pull request
 */
export class PullRequestProcessor extends AbstractProcessor<IGithubApiPullRequest, PullRequestLogger> {
  public readonly type: 'pull request' = `pull request`;
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
      const requestDraftProcessor: PullRequestDraftProcessor = new PullRequestDraftProcessor(this);

      if (requestDraftProcessor.shouldDraftInsteadOfStale()) {
        await requestDraftProcessor.draft();
      } else {
        await pullRequestStaleProcessor.stale();

        PullRequestsStatisticsService.getInstance().increaseStalePullRequestsCount();
      }
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
    const pullRequestShouldCloseStaleProcessor: PullRequestShouldCloseProcessor = new PullRequestShouldCloseProcessor(
      this
    );

    if (pullRequestShouldCloseStaleProcessor.shouldClose()) {
      const pullRequestCloseStaleProcessor: PullRequestCloseStaleProcessor = new PullRequestCloseStaleProcessor(this);

      await pullRequestCloseStaleProcessor.close();
      PullRequestsStatisticsService.getInstance().increaseClosedPullRequestsCount();

      await this.processToDeleteBranch$$();
    } else {
      PullRequestsStatisticsService.getInstance().increaseUnalteredPullRequestsCount();
    }

    this.stopProcessing$$();
  }

  public async processToDeleteBranch$$(): Promise<void> {
    const pullRequestDeleteBranchProcessor: PullRequestDeleteBranchProcessor = new PullRequestDeleteBranchProcessor(
      this
    );

    await pullRequestDeleteBranchProcessor.delete();
  }

  protected _increaseIgnoredCount(): void {
    PullRequestsStatisticsService.getInstance().increaseIgnoredPullRequestsCount();
  }

  protected _increaseAlreadyStaleCount(): void {
    PullRequestsStatisticsService.getInstance().increaseAlreadyStalePullRequestsCount();
  }
}
