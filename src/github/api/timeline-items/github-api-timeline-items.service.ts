import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';

export class GithubApiTimelineItemsService {
  public static fetchIssueAddedLabels(
    issueNumber: Readonly<IGithubApiIssueNumber>
  ): Promise<IGithubApiTimelineItemsIssueLabeledEvents> | never {
    LoggerService.info(
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

          if (pageCount === 0) {
            LoggerService.error(
              `Could not find a single added label event for the issue`,
              LoggerService.value(issueNumber)
            );
            throw new Error(`Could not find a single added label event for the issue ${issueNumber}`);
          }

          // @todo handle the pagination
          if (filteredCount > pageCount) {
            LoggerService.error(
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            throw new Error(`Reached the maximum number of added label events supported for now`);
          }

          LoggerService.info(
            LoggerFormatService.green(`Found`),
            LoggerService.value(pageCount),
            LoggerFormatService.green(`added label event${pageCount > 1 ? `s` : ``}`)
          );

          return response;
        }
      )
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the added labels events on the issue`, LoggerService.value(issueNumber));

        throw error;
      });
  }
}
