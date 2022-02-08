import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { AbstractGithubApiTimelineItemsService } from '@github/api/timeline-items/abstract-github-api-timeline-items.service';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorIssue } from '@utils/annotations/enums/annotation-error-issue.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';

export class GithubApiIssueTimelineItemsService extends AbstractGithubApiTimelineItemsService<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  public fetchIssueAddedLabels(
    issueNumber: Readonly<IGithubApiIssueNumber>
  ): Promise<IGithubApiTimelineItemsIssueLabeledEvents> | never {
    this.processor.logger.info(
      `Fetching the added labels events on the issue`,
      LoggerService.value(issueNumber),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiTimelineItemsIssueLabeledEvents>(GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY, {
        issueNumber,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then(
        (
          response: Readonly<IGithubApiTimelineItemsIssueLabeledEvents>
        ): IGithubApiTimelineItemsIssueLabeledEvents | never => {
          const { filteredCount, pageCount } = response.repository.issue.timelineItems;

          IssuesStatisticsService.getInstance().increaseCalledApiIssuesQueriesCount();

          if (pageCount === 0) {
            this.processor.logger.error(
              `Could not find a single added label event for the issue`,
              LoggerService.value(issueNumber)
            );
            AnnotationsService.error(EAnnotationErrorIssue.NO_LABEL_EVENT_FOUND);
            throw new Error(`Could not find a single added label event for the issue ${issueNumber}`);
          }

          // @todo handle the pagination
          if (filteredCount > pageCount) {
            this.processor.logger.error(
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            AnnotationsService.error(EAnnotationErrorIssue.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED);
            throw new Error(`Reached the maximum number of added label events supported for now`);
          }

          this.processor.logger.info(
            LoggerFormatService.green(`Found`),
            LoggerService.value(pageCount),
            LoggerFormatService.green(`added label event${pageCount > 1 ? `s` : ``}`)
          );

          return response;
        }
      )
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to fetch the added labels events on the issue`,
          LoggerService.value(issueNumber)
        );
        AnnotationsService.error(EAnnotationErrorIssue.FAILED_FETCHING_ADDED_LABELS_EVENTS);

        throw error;
      });
  }
}
