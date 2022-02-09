import { EAnnotationNotice } from '@utils/annotations/enums/annotation-notice.enum';
import { IAnnotationsErrors } from '@utils/annotations/types/annotations-errors';
import { IAnnotationsWarnings } from '@utils/annotations/types/annotations-warnings';
import { LoggerAnnotationsService } from '@utils/loggers/logger-annotations.service';

/**
 * @description
 * Utility to log annotations
 * No ANSI characters should be used
 * Annotations are not compatible to colours logs
 * See the [issue #422](https://github.com/Sonia-corporation/stale/issues/422)
 */
export class AnnotationsService {
  public static notice(annotation: Readonly<EAnnotationNotice>): AnnotationsService {
    LoggerAnnotationsService.notice(annotation);

    return AnnotationsService;
  }

  public static warning(annotation: Readonly<IAnnotationsWarnings>): AnnotationsService {
    LoggerAnnotationsService.warning(annotation);

    return AnnotationsService;
  }

  public static error(annotation: Readonly<IAnnotationsErrors>): AnnotationsService {
    LoggerAnnotationsService.error(annotation);

    return AnnotationsService;
  }
}
