import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiPullRequestTimelineItemsService } from '@github/api/timeline-items/github-api-pull-request-timeline-items.service';
import { IGithubApiTimelineItemsPullRequestLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-event.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to remove the stale state from a pull request
 */
export class PullRequestRemoveStaleProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;
  public readonly githubApiPullRequestTimelineItemsService$$: GithubApiPullRequestTimelineItemsService;
  public readonly githubApiPullRequestLabelsService$$: GithubApiPullRequestLabelsService;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
    this.githubApiPullRequestTimelineItemsService$$ = new GithubApiPullRequestTimelineItemsService(
      this.pullRequestProcessor
    );
    this.githubApiPullRequestLabelsService$$ = new GithubApiPullRequestLabelsService(this.pullRequestProcessor);
  }

  /**
   * @description
   * Check if the pull request should continue to be stale or not
   * The check is made by comparing the last update date and the last creation date of the stale label
   * @returns {Promise<boolean>} Returns true when the stale state should be removed
   */
  public async shouldRemoveStale(): Promise<boolean> | never {
    this.pullRequestProcessor.logger.info(`Checking if the stale state should be removed...`);

    const addedLabelEvents: IGithubApiTimelineItemsPullRequestLabeledEvents =
      await this.githubApiPullRequestTimelineItemsService$$.fetchPullRequestAddedLabels(
        this.pullRequestProcessor.githubPullRequest.number
      );
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();
    const staleLabelEvents: IGithubApiTimelineItemsPullRequestLabeledEvent[] = this._getStaleLabelEvents(
      addedLabelEvents,
      pullRequestsInputs.pullRequestStaleLabel
    );

    this.pullRequestProcessor.logger.info(
      `Found`,
      LoggerService.value(staleLabelEvents.length),
      LoggerFormatService.whiteBright(
        `stale label added event${staleLabelEvents.length > 1 ? `s` : ``} on this pull request`
      )
    );
    const lastAddedStaleLabelEvent: IGithubApiTimelineItemsPullRequestLabeledEvent | null =
      this._getMostRecentStaleLabelEvent(staleLabelEvents);

    if (!lastAddedStaleLabelEvent) {
      this.pullRequestProcessor.logger.error(`Could not find the stale label in the added labels events`);

      throw new Error(`Could not find the stale label in the added labels events`);
    }

    const lastAddedStaleLabelAt: DateTime = iso8601ToDatetime(lastAddedStaleLabelEvent.createdAt);
    const pullRequestUpdatedAt: DateTime = this.pullRequestProcessor.getUpdatedAt();

    this.pullRequestProcessor.logger.info(`The stale label was added the`, LoggerService.date(lastAddedStaleLabelAt));
    this.pullRequestProcessor.logger.info(
      `The pull request was updated for the last time the`,
      LoggerService.date(pullRequestUpdatedAt)
    );

    // If the update date is more recent that the last time where the stale label was added
    // It means that an update occurred
    if (isDateMoreRecent(pullRequestUpdatedAt, lastAddedStaleLabelAt)) {
      this.pullRequestProcessor.logger.info(
        `The last update on the pull request is more recent that the last time it was stale`
      );
      this.pullRequestProcessor.logger.info(`The stale state should be removed`);

      return true;
    }

    this.pullRequestProcessor.logger.info(`There was no update since the last time this pull request was stale`);
    this.pullRequestProcessor.logger.info(`The stale state should not be removed`);

    return false;
  }

  /**
   * @description
   * Remove the stale state from the pull request
   * Remove the stale label from the pull request
   * @returns {Promise<void>} A promise
   */
  public async removeStale(): Promise<void> {
    this.pullRequestProcessor.logger.info(`Removing the stale state from this pull request...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();
    const commonInputs: ICommonInputs = CommonInputsService.getInputs();

    this.pullRequestProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(pullRequestsInputs.pullRequestStaleLabel),
      LoggerFormatService.whiteBright(`to remove from this pull request...`)
    );

    const label: IGithubApiLabel | null = await this.githubApiPullRequestLabelsService$$.fetchLabelByName(
      pullRequestsInputs.pullRequestStaleLabel
    );

    if (!label) {
      this.pullRequestProcessor.logger.error(
        `Could not find the stale label`,
        LoggerService.value(pullRequestsInputs.pullRequestStaleLabel)
      );

      throw new Error(`Could not find the stale label ${pullRequestsInputs.pullRequestStaleLabel}`);
    }

    this.pullRequestProcessor.logger.info(`The stale label was fetched`);
    this.pullRequestProcessor.logger.info(`Removing the stale label from this pull request...`);

    if (!commonInputs.dryRun) {
      await this.githubApiPullRequestLabelsService$$.removeLabelFromPullRequest(
        this.pullRequestProcessor.githubPullRequest.id,
        label.id
      );

      this.pullRequestProcessor.logger.info(`The stale label was removed`);
    } else {
      this.pullRequestProcessor.logger.info(`The stale label was not removed due to the dry-run mode`);
    }

    this.pullRequestProcessor.logger.notice(`The pull request is no longer stale`);
  }

  private _getStaleLabelEvents(
    addedLabelEvents: Readonly<IGithubApiTimelineItemsPullRequestLabeledEvents>,
    pullRequestStaleLabel: Readonly<string>
  ): IGithubApiTimelineItemsPullRequestLabeledEvent[] {
    return _.filter(
      addedLabelEvents.repository.pullRequest.timelineItems.nodes,
      (addedLabelEvent: Readonly<IGithubApiTimelineItemsPullRequestLabeledEvent>): boolean =>
        addedLabelEvent.label.name === pullRequestStaleLabel
    );
  }

  private _getMostRecentStaleLabelEvent(
    events: IGithubApiTimelineItemsPullRequestLabeledEvent[]
  ): IGithubApiTimelineItemsPullRequestLabeledEvent | null {
    return _.reduce<
      IGithubApiTimelineItemsPullRequestLabeledEvent,
      IGithubApiTimelineItemsPullRequestLabeledEvent | null
    >(
      events,
      (mostRecentStaleLabelEvent, event): IGithubApiTimelineItemsPullRequestLabeledEvent | null => {
        if (!mostRecentStaleLabelEvent) {
          return event;
        }

        const mostRecentStaleLabelEventCreatedAt: DateTime = iso8601ToDatetime(mostRecentStaleLabelEvent.createdAt);
        const lastAddedStaleLabelCreatedAt: DateTime = iso8601ToDatetime(event.createdAt);

        if (isDateMoreRecent(mostRecentStaleLabelEventCreatedAt, lastAddedStaleLabelCreatedAt)) {
          return mostRecentStaleLabelEvent;
        }

        return event;
      },
      null
    );
  }
}
