import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorIssue } from '@utils/annotations/enums/annotation-error-issue.enum';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
import { IAnnotationsProperties } from '@utils/annotations/types/annotations-properties';
import { LoggerAnnotationsService } from '@utils/loggers/logger-annotations.service';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger-format.service`);

describe(`AnnotationsService`, (): void => {
  describe(`notice()`, (): void => {
    let loggerAnnotationsServiceNoticeSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerAnnotationsServiceNoticeSpy = jest.spyOn(LoggerAnnotationsService, `notice`).mockImplementation();
    });

    it(`should log the notice`, (): void => {
      expect.assertions(2);

      AnnotationsService.notice(`dummy notice`);

      expect(loggerAnnotationsServiceNoticeSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceNoticeSpy).toHaveBeenCalledWith(`dummy notice`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.notice(`dummy notice`);

      expect(result).toStrictEqual(AnnotationsService);
    });
  });

  describe(`warning()`, (): void => {
    let properties: IAnnotationsProperties;

    let loggerAnnotationsServiceWarningSpy: jest.SpyInstance;

    beforeEach((): void => {
      properties = createHydratedMock<IAnnotationsProperties>();

      loggerAnnotationsServiceWarningSpy = jest.spyOn(LoggerAnnotationsService, `warning`).mockImplementation();
    });

    it(`should log the warning`, (): void => {
      expect.assertions(2);

      AnnotationsService.warning(EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED, properties);

      expect(loggerAnnotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceWarningSpy).toHaveBeenCalledWith(
        EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED,
        properties
      );
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.warning(
        EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED,
        properties
      );

      expect(result).toStrictEqual(AnnotationsService);
    });
  });

  describe(`error()`, (): void => {
    let properties: IAnnotationsProperties;

    let loggerAnnotationsServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      properties = createHydratedMock<IAnnotationsProperties>();

      loggerAnnotationsServiceErrorSpy = jest.spyOn(LoggerAnnotationsService, `error`).mockImplementation();
    });

    it(`should log the error`, (): void => {
      expect.assertions(2);

      AnnotationsService.error(
        EAnnotationErrorIssue.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED,
        properties
      );

      expect(loggerAnnotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceErrorSpy).toHaveBeenCalledWith(
        EAnnotationErrorIssue.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED,
        properties
      );
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.error(
        EAnnotationErrorIssue.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED,
        properties
      );

      expect(result).toStrictEqual(AnnotationsService);
    });
  });
});
