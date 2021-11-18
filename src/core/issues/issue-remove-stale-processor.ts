import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiTimelineItemsService } from '@github/api/timeline-items/github-api-timeline-items.service';
import { IGithubApiTimelineItemsIssueLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-event.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to remove the stale state from an issue
 */
export class IssueRemoveStaleProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiTimelineItemsService$$: GithubApiTimelineItemsService;
  public readonly githubApiLabelsService$$: GithubApiLabelsService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiTimelineItemsService$$ = new GithubApiTimelineItemsService(this.issueProcessor);
    this.githubApiLabelsService$$ = new GithubApiLabelsService(this.issueProcessor);
  }

  /**
   * @description
   * Check if the issue should continue to be stale or not
   * The check is made by comparing the last update date and the last creation date of the stale label
   * @returns {Promise<boolean>} Returns true when the stale state should be removed
   */
  public async shouldRemoveStale(): Promise<boolean> | never {
    this.issueProcessor.logger.info(`Checking if the stale state should be removed...`);

    const addedLabelEvents: IGithubApiTimelineItemsIssueLabeledEvents =
      await this.githubApiTimelineItemsService$$.fetchIssueAddedLabels(this.issueProcessor.githubIssue.number);
    const { issueStaleLabel } = InputsService.getInputs();
    const staleLabelEvents: IGithubApiTimelineItemsIssueLabeledEvent[] = this._getStaleLabelEvents(
      addedLabelEvents,
      issueStaleLabel
    );

    this.issueProcessor.logger.info(
      `Found`,
      LoggerService.value(staleLabelEvents.length),
      LoggerFormatService.whiteBright(`stale label added event${staleLabelEvents.length > 1 ? `s` : ``} on this issue`)
    );
    const lastAddedStaleLabelEvent: IGithubApiTimelineItemsIssueLabeledEvent | null =
      this._getMostRecentStaleLabelEvent(staleLabelEvents);

    if (!lastAddedStaleLabelEvent) {
      this.issueProcessor.logger.error(`Could not find the stale label in the added labels events`);

      throw new Error(`Could not find the stale label in the added labels events`);
    }

    const lastAddedStaleLabelAt: DateTime = iso8601ToDatetime(lastAddedStaleLabelEvent.createdAt);
    const issueUpdatedAt: DateTime = this.issueProcessor.getUpdatedAt();

    this.issueProcessor.logger.info(`The stale label was added the`, LoggerService.date(lastAddedStaleLabelAt));
    this.issueProcessor.logger.info(`The issue was updated for the last time the`, LoggerService.date(issueUpdatedAt));

    // If the update date is more recent that the last time where the stale label was added
    // It means that an update occurred
    if (isDateMoreRecent(issueUpdatedAt, lastAddedStaleLabelAt)) {
      this.issueProcessor.logger.info(`The last update on the issue is more recent that the last time it was stale`);
      this.issueProcessor.logger.info(`The stale state should be removed`);

      return true;
    }

    this.issueProcessor.logger.info(`There was no update since the last time this issue was stale`);
    this.issueProcessor.logger.info(`The stale state should not be removed`);

    return false;
  }

  /**
   * @description
   * Remove the stale state from the issue
   * Remove the stale label from the issue
   * @returns {Promise<void>} A promise
   */
  public async removeStale(): Promise<void> {
    this.issueProcessor.logger.info(`Removing the stale state from this issue...`);

    const { issueStaleLabel } = InputsService.getInputs();

    this.issueProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(issueStaleLabel),
      LoggerFormatService.whiteBright(`to remove from this issue...`)
    );

    const label: IGithubApiLabel | null = await this.githubApiLabelsService$$.fetchLabelByName(issueStaleLabel);

    if (!label) {
      this.issueProcessor.logger.error(`Could not find the stale label`, LoggerService.value(issueStaleLabel));

      throw new Error(`Could not find the stale label ${issueStaleLabel}`);
    }

    this.issueProcessor.logger.info(`The stale label was fetched`);
    this.issueProcessor.logger.info(`Removing the stale label from this issue...`);

    if (!InputsService.getInputs().dryRun) {
      await this.githubApiLabelsService$$.removeLabelFromIssue(this.issueProcessor.githubIssue.id, label.id);

      this.issueProcessor.logger.info(`The stale label was removed`);
    } else {
      this.issueProcessor.logger.info(`The stale label was not removed due to the dry-run mode`);
    }

    this.issueProcessor.logger.notice(`The issue is no longer stale`);
  }

  private _getStaleLabelEvents(
    addedLabelEvents: Readonly<IGithubApiTimelineItemsIssueLabeledEvents>,
    issueStaleLabel: Readonly<string>
  ): IGithubApiTimelineItemsIssueLabeledEvent[] {
    return _.filter(
      addedLabelEvents.repository.issue.timelineItems.nodes,
      (addedLabelEvent: Readonly<IGithubApiTimelineItemsIssueLabeledEvent>): boolean =>
        addedLabelEvent.label.name === issueStaleLabel
    );
  }

  private _getMostRecentStaleLabelEvent(
    events: IGithubApiTimelineItemsIssueLabeledEvent[]
  ): IGithubApiTimelineItemsIssueLabeledEvent | null {
    return _.reduce<IGithubApiTimelineItemsIssueLabeledEvent, IGithubApiTimelineItemsIssueLabeledEvent | null>(
      events,
      (mostRecentStaleLabelEvent, event): IGithubApiTimelineItemsIssueLabeledEvent | null => {
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
