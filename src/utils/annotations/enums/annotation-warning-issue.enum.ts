export enum EAnnotationWarningIssue {
  WRONG_INPUT_VALUE = `Wrong value given to an input!`,
  TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED = `Found too many labels attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`,
  TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED = `Found too many assignees attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`,
  TOO_MANY_PROJECTS_PAGINATION_NOT_IMPLEMENTED = `Found too many projects attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`,
}
