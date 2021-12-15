import { IGithubApiTimelineItemsPullRequestLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-event.interface';

export interface IGithubApiTimelineItemsPullRequestLabeledEvents {
  readonly repository: {
    readonly pullRequest: {
      readonly timelineItems: {
        readonly filteredCount: number;
        readonly nodes: IGithubApiTimelineItemsPullRequestLabeledEvent[];
        readonly pageCount: number;
      };
    };
  };
}
