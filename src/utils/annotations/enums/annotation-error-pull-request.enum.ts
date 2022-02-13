export enum EAnnotationErrorPullRequest {
  NO_LABEL_EVENT_FOUND = `Could not find a single added label event for this pull request!`,
  FAILED_DELETE_REFERENCE = `Failed to delete the reference on this pull request!`,
  FAILED_CLOSE = `Failed to close the pull request!`,
  FAILED_DRAFT = `Failed to draft the pull request!`,
  TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED = `Reached the maximum number of added label events supported for now for this pull request. The pagination support is not yet implemented!`,
  NOT_FOUND_STALE_LABEL_EVENT = `Could not find the stale label on this pull request!`,
  FAILED_FETCHING_PULL_REQUESTS = `Failed to fetch the pull requests!`,
  FAILED_FETCHING_ADDED_LABELS_EVENTS = `Failed to fetch the added labels events on this pull request!`,
}
