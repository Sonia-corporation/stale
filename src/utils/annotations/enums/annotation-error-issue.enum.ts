export enum EAnnotationErrorIssue {
  NO_LABEL_EVENT_FOUND = `Could not find a single added label event for this issue!`,
  TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED = `Reached the maximum number of added label events supported for now for this issue. The pagination support is not yet implemented!`,
  FAILED_CLOSE = `Failed to close the issue!`,
  NOT_FOUND_STALE_LABEL_EVENT = `Could not find the stale label on this issue!`,
  FAILED_FETCHING_ISSUES = `Failed to fetch the issues!`,
  FAILED_FETCHING_ADDED_LABELS_EVENTS = `Failed to fetch the added labels events on this issue!`,
}
