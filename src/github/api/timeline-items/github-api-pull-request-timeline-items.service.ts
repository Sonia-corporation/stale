import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { AbstractGithubApiTimelineItemsService } from '@github/api/timeline-items/abstract-github-api-timeline-items.service';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorPullRequest } from '@utils/annotations/enums/annotation-error-pull-request.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';

export class GithubApiPullRequestTimelineItemsService extends AbstractGithubApiTimelineItemsService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  public fetchPullRequestAddedLabels(
    pullRequestNumber: Readonly<IGithubApiPullRequestNumber>
  ): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> | never {
    this.processor.logger.info(
      `Fetching the added labels events on the pull request`,
      LoggerService.value(pullRequestNumber),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiTimelineItemsPullRequestLabeledEvents>(
        GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY,
        {
          owner: context.repo.owner,
          pullRequestNumber,
          repository: context.repo.repo,
        }
      )
      .then(
        (
          response: Readonly<IGithubApiTimelineItemsPullRequestLabeledEvents>
        ): IGithubApiTimelineItemsPullRequestLabeledEvents | never => {
          const { filteredCount, pageCount } = response.repository.pullRequest.timelineItems;

          PullRequestsStatisticsService.getInstance().increaseCalledApiPullRequestsQueriesCount();

          if (pageCount === 0) {
            this.processor.logger.error(
              `Could not find a single added label event for the pull request`,
              LoggerService.value(pullRequestNumber)
            );
            AnnotationsService.error(EAnnotationErrorPullRequest.NO_LABEL_EVENT_FOUND, {
              file: `github-api-pull-request-timeline-items.service.ts`,
              startLine: 41,
              title: `Error`,
            });
            throw new Error(`Could not find a single added label event for the pull request ${pullRequestNumber}`);
          }

          // TODO handle the pagination
          if (filteredCount > pageCount) {
            this.processor.logger.error(
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            AnnotationsService.error(
              EAnnotationErrorPullRequest.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `github-api-pull-request-timeline-items.service.ts`,
                startLine: 41,
                title: `Error`,
              }
            );
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
          `Failed to fetch the added labels events on the pull request`,
          LoggerService.value(pullRequestNumber)
        );
        AnnotationsService.error(EAnnotationErrorPullRequest.FAILED_FETCHING_ADDED_LABELS_EVENTS, {
          file: `github-api-pull-request-timeline-items.service.ts`,
          startLine: 83,
          title: `Error`,
        });

        throw error;
      });
  }
}
