import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
import { LoggerAnnotationsService } from '@utils/loggers/logger-annotations.service';

jest.mock(`@utils/loggers/logger-format.service`);

describe(`AnnotationsService`, (): void => {
  describe(`notice()`, (): void => {
    let loggerAnnotationsServiceNoticeSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerAnnotationsServiceNoticeSpy = jest.spyOn(LoggerAnnotationsService, `notice`).mockImplementation();
    });

    it(`should log the notice`, (): void => {
      expect.assertions(2);

      AnnotationsService.notice(`dummy message`);

      expect(loggerAnnotationsServiceNoticeSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceNoticeSpy).toHaveBeenCalledWith(`dummy message`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.notice();

      expect(result).toStrictEqual(AnnotationsService);
    });
  });

  describe(`warning()`, (): void => {
    let loggerAnnotationsServiceWarningSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerAnnotationsServiceWarningSpy = jest.spyOn(LoggerAnnotationsService, `warning`).mockImplementation();
    });

    it(`should log the warning`, (): void => {
      expect.assertions(2);

      AnnotationsService.warning(EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED);

      expect(loggerAnnotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceWarningSpy).toHaveBeenCalledWith(
        EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED
      );
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.warning();

      expect(result).toStrictEqual(AnnotationsService);
    });
  });

  describe(`error()`, (): void => {
    let loggerAnnotationsServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerAnnotationsServiceErrorSpy = jest.spyOn(LoggerAnnotationsService, `error`).mockImplementation();
    });

    it(`should log the error`, (): void => {
      expect.assertions(2);

      AnnotationsService.error(`dummy message`);

      expect(loggerAnnotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerAnnotationsServiceErrorSpy).toHaveBeenCalledWith(`dummy message`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = AnnotationsService.error();

      expect(result).toStrictEqual(AnnotationsService);
    });
  });
});
