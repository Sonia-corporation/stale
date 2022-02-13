import { IAnnotationsProperties } from '@utils/annotations/types/annotations-properties';
import { LoggerAnnotationsService } from '@utils/loggers/logger-annotations.service';
import * as core from '@actions/core';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger-format.service`);

describe(`LoggerAnnotationsService`, (): void => {
  describe(`notice()`, (): void => {
    let coreNoticeSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreNoticeSpy = jest.spyOn(core, `notice`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message`, (): void => {
        expect.assertions(2);

        LoggerAnnotationsService.notice(`dummy message`);

        expect(coreNoticeSpy).toHaveBeenCalledTimes(1);
        expect(coreNoticeSpy).toHaveBeenCalledWith(`dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages`, (): void => {
        expect.assertions(2);

        LoggerAnnotationsService.notice(`dummy message 1`, `dummy message 2`);

        expect(coreNoticeSpy).toHaveBeenCalledTimes(1);
        expect(coreNoticeSpy).toHaveBeenCalledWith(`dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerAnnotationsService.notice(`dummy message`);

      expect(result).toStrictEqual(LoggerAnnotationsService);
    });
  });

  describe(`warning()`, (): void => {
    let coreWarningSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreWarningSpy = jest.spyOn(core, `warning`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message`, (): void => {
        expect.assertions(2);

        LoggerAnnotationsService.warning(`dummy message`);

        expect(coreWarningSpy).toHaveBeenCalledTimes(1);
        expect(coreWarningSpy).toHaveBeenCalledWith(`dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages`, (): void => {
        expect.assertions(2);

        LoggerAnnotationsService.warning(`dummy message 1`, `dummy message 2`);

        expect(coreWarningSpy).toHaveBeenCalledTimes(1);
        expect(coreWarningSpy).toHaveBeenCalledWith(`dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerAnnotationsService.warning(`dummy message`);

      expect(result).toStrictEqual(LoggerAnnotationsService);
    });
  });

  describe(`error()`, (): void => {
    let properties: IAnnotationsProperties;

    let coreErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      properties = createHydratedMock<IAnnotationsProperties>();

      coreErrorSpy = jest.spyOn(core, `error`).mockImplementation();
    });

    it(`should log the message`, (): void => {
      expect.assertions(2);

      LoggerAnnotationsService.error(`dummy message`, properties);

      expect(coreErrorSpy).toHaveBeenCalledTimes(1);
      expect(coreErrorSpy).toHaveBeenCalledWith(`dummy message`, properties);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerAnnotationsService.error(`dummy message`, properties);

      expect(result).toStrictEqual(LoggerAnnotationsService);
    });
  });
});
