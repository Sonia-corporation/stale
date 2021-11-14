import { IGithubApiTimelineItemsIssueLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-event.interface';

export interface IGithubApiTimelineItemsIssueLabeledEvents {
  readonly repository: {
    readonly issue: {
      readonly timelineItems: {
        readonly filteredCount: number;
        readonly nodes: IGithubApiTimelineItemsIssueLabeledEvent[];
        readonly pageCount: number;
      };
    };
  };
}
