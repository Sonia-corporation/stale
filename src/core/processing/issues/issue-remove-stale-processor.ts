import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractRemoveStaleProcessor } from '@core/processing/abstract-remove-stale-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiIssueTimelineItemsService } from '@github/api/timeline-items/github-api-issue-timeline-items.service';
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
export class IssueRemoveStaleProcessor extends AbstractRemoveStaleProcessor<IssueProcessor> {
  public readonly githubApiIssueTimelineItemsService$$: GithubApiIssueTimelineItemsService;
  public readonly githubApiIssueLabelsService$$: GithubApiIssueLabelsService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    super(issueProcessor);
    this.githubApiIssueTimelineItemsService$$ = new GithubApiIssueTimelineItemsService(this.processor);
    this.githubApiIssueLabelsService$$ = new GithubApiIssueLabelsService(this.processor);
  }

  /**
   * @description
   * Check if the issue should continue to be stale or not
   * The check is made by comparing the last update date and the last creation date of the stale label
   * @returns {Promise<boolean>} Returns true when the stale state should be removed
   */
  public async shouldRemoveStale(): Promise<boolean> | never {
    this.processor.logger.info(`Checking if the stale state should be removed...`);

    const addedLabelEvents: IGithubApiTimelineItemsIssueLabeledEvents =
      await this.githubApiIssueTimelineItemsService$$.fetchIssueAddedLabels(this.processor.githubIssue.number);
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();
    const staleLabelEvents: IGithubApiTimelineItemsIssueLabeledEvent[] = this._getStaleLabelEvents(
      addedLabelEvents,
      issuesInputs.issueStaleLabel
    );

    this.processor.logger.info(
      `Found`,
      LoggerService.value(staleLabelEvents.length),
      LoggerFormatService.whiteBright(`stale label added event${staleLabelEvents.length > 1 ? `s` : ``} on this issue`)
    );
    const lastAddedStaleLabelEvent: IGithubApiTimelineItemsIssueLabeledEvent | null =
      this._getMostRecentStaleLabelEvent(staleLabelEvents);

    if (!lastAddedStaleLabelEvent) {
      this.processor.logger.error(`Could not find the stale label in the added labels events`);

      throw new Error(`Could not find the stale label in the added labels events`);
    }

    const lastAddedStaleLabelAt: DateTime = iso8601ToDatetime(lastAddedStaleLabelEvent.createdAt);
    const issueUpdatedAt: DateTime = this.processor.getUpdatedAt();

    this.processor.logger.info(`The stale label was added the`, LoggerService.date(lastAddedStaleLabelAt));
    this.processor.logger.info(`The issue was updated for the last time the`, LoggerService.date(issueUpdatedAt));

    // If the update date is more recent that the last time when the stale label was added
    // It means that an update occurred
    if (isDateMoreRecent(issueUpdatedAt, lastAddedStaleLabelAt)) {
      this.processor.logger.info(`The last update on the issue is more recent that the last time it was stale`);
      this.processor.logger.info(`The stale state should be removed`);

      return true;
    }

    this.processor.logger.info(`There was no update since the last time this issue was stale`);
    this.processor.logger.info(`The stale state should not be removed`);

    return false;
  }

  /**
   * @description
   * Remove the stale state from the issue
   * Remove the stale label from the issue
   * @returns {Promise<void>} A promise
   */
  public async removeStale(): Promise<void> {
    this.processor.logger.info(`Removing the stale state from this issue...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();
    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();

    this.processor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(issuesInputs.issueStaleLabel),
      LoggerFormatService.whiteBright(`to remove from this issue...`)
    );

    const label: IGithubApiLabel | null = await this.githubApiIssueLabelsService$$.fetchLabelByName(
      issuesInputs.issueStaleLabel
    );

    if (!label) {
      this.processor.logger.error(`Could not find the stale label`, LoggerService.value(issuesInputs.issueStaleLabel));

      throw new Error(`Could not find the stale label ${issuesInputs.issueStaleLabel}`);
    }

    this.processor.logger.info(`The stale label was fetched`);
    this.processor.logger.info(`Removing the stale label from this issue...`);

    if (!commonInputs.dryRun) {
      await this.githubApiIssueLabelsService$$.removeLabel(this.processor.githubIssue.id, label.id);

      this.processor.logger.info(`The stale label was removed`);
    } else {
      this.processor.logger.info(`The stale label was not removed due to the dry-run mode`);
    }

    this.processor.logger.notice(`The issue is no longer stale`);
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
