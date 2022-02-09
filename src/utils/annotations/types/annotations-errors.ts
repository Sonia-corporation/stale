import { EAnnotationErrorIssue } from '@utils/annotations/enums/annotation-error-issue.enum';
import { EAnnotationErrorPullRequest } from '@utils/annotations/enums/annotation-error-pull-request.enum';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';

export type IAnnotationsErrors = EAnnotationError | EAnnotationErrorIssue | EAnnotationErrorPullRequest;
