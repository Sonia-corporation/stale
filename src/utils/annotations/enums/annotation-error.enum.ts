export enum EAnnotationError {
  WRONG_INPUT_VALUE = `Wrong value given to an input!`,
  NOT_FOUND_LABEL = `Could not find a label from your repository!`,
  NOT_FOUND_STALE_LABEL_EVENT = `Could not find the stale label in the added labels events!`,
  FAILED_FETCHING_LABELS_MATCHING_SEARCH = `Failed to fetch the labels matching the searched label!`,
  FAILED_FETCHING_LABEL = `Failed to fetch the label!`,
  NOT_FOUND_STALE_LABEL = `Could not find the stale label!`,
  FAILED_ADDING_COMMENT = `Failed to add the comment!`,
  FAILED_FINDING_LABELS_MATCHING_SEARCH = `Could not find a single label matching the searched label!`,
  COULD_NOT_FETCH_LABEL = `Could not fetch the label!`,
  FAILED_ADDING_LABEL = `Failed to add the label!`,
  FAILED_ADDING_LABELS = `Failed to add the labels!`,
  FAILED_REMOVING_LABEL = `Failed to remove the label!`,
}
