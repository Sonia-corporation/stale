import { EInputs } from '@core/inputs/inputs.enum';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger-format.service`);

describe(`LoggerService`, (): void => {
  describe(`debug()`, (): void => {
    let coreDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreDebugSpy = jest.spyOn(core, `debug`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.debug(`dummy message`);

        expect(coreDebugSpy).toHaveBeenCalledTimes(1);
        expect(coreDebugSpy).toHaveBeenCalledWith(`whiteBright-dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.debug(`dummy message 1`, `dummy message 2`);

        expect(coreDebugSpy).toHaveBeenCalledTimes(1);
        expect(coreDebugSpy).toHaveBeenCalledWith(`whiteBright-dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.debug();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`info()`, (): void => {
    let coreInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreInfoSpy = jest.spyOn(core, `info`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.info(`dummy message`);

        expect(coreInfoSpy).toHaveBeenCalledTimes(1);
        expect(coreInfoSpy).toHaveBeenCalledWith(`whiteBright-dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.info(`dummy message 1`, `dummy message 2`);

        expect(coreInfoSpy).toHaveBeenCalledTimes(1);
        expect(coreInfoSpy).toHaveBeenCalledWith(`whiteBright-dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.info();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`notice()`, (): void => {
    let coreNoticeSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreNoticeSpy = jest.spyOn(core, `notice`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.notice(`dummy message`);

        expect(coreNoticeSpy).toHaveBeenCalledTimes(1);
        expect(coreNoticeSpy).toHaveBeenCalledWith(`whiteBright-dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.notice(`dummy message 1`, `dummy message 2`);

        expect(coreNoticeSpy).toHaveBeenCalledTimes(1);
        expect(coreNoticeSpy).toHaveBeenCalledWith(`whiteBright-dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.notice();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`warning()`, (): void => {
    let coreWarningSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreWarningSpy = jest.spyOn(core, `warning`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message in yellow`, (): void => {
        expect.assertions(2);

        LoggerService.warning(`dummy message`);

        expect(coreWarningSpy).toHaveBeenCalledTimes(1);
        expect(coreWarningSpy).toHaveBeenCalledWith(`yellow-dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages in yellow`, (): void => {
        expect.assertions(2);

        LoggerService.warning(`dummy message 1`, `dummy message 2`);

        expect(coreWarningSpy).toHaveBeenCalledTimes(1);
        expect(coreWarningSpy).toHaveBeenCalledWith(`yellow-dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.warning();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`error()`, (): void => {
    let coreErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreErrorSpy = jest.spyOn(core, `error`).mockImplementation();
    });

    describe(`when there is one given message`, (): void => {
      it(`should log the message in red`, (): void => {
        expect.assertions(2);

        LoggerService.error(`dummy message`);

        expect(coreErrorSpy).toHaveBeenCalledTimes(1);
        expect(coreErrorSpy).toHaveBeenCalledWith(`red-dummy message`);
      });
    });

    describe(`when there is multiple given messages`, (): void => {
      it(`should merge, separate by a space and log the messages in red`, (): void => {
        expect.assertions(2);

        LoggerService.error(`dummy message 1`, `dummy message 2`);

        expect(coreErrorSpy).toHaveBeenCalledTimes(1);
        expect(coreErrorSpy).toHaveBeenCalledWith(`red-dummy message 1 dummy message 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.error();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`group()`, (): void => {
    let coreGroupSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreGroupSpy = jest.spyOn(core, `group`).mockImplementation();
    });

    it(`should log the group name in white bright`, async (): Promise<void> => {
      expect.assertions(3);

      await LoggerService.group(`dummy name`, (): Promise<void> => Promise.resolve());

      expect(coreGroupSpy).toHaveBeenCalledTimes(1);
      expect(coreGroupSpy.mock.calls[0][0]).toStrictEqual(`whiteBright-dummy name`);
      expect(coreGroupSpy.mock.calls[0][1]).toBeFunction();
    });
  });

  describe(`startGroup()`, (): void => {
    let coreStartGroupSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreStartGroupSpy = jest.spyOn(core, `startGroup`).mockImplementation();
    });

    describe(`when there is one given group name`, (): void => {
      it(`should log the group name in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.startGroup(`dummy name`);

        expect(coreStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(coreStartGroupSpy).toHaveBeenCalledWith(`whiteBright-dummy name`);
      });
    });

    describe(`when there is multiple given group names`, (): void => {
      it(`should log the group name in white bright`, (): void => {
        expect.assertions(2);

        LoggerService.startGroup(`dummy name 1`, `dummy name 2`);

        expect(coreStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(coreStartGroupSpy).toHaveBeenCalledWith(`whiteBright-dummy name 1 dummy name 2`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.startGroup(`dummy message`);

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`endGroup()`, (): void => {
    let coreEndGroupSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEndGroupSpy = jest.spyOn(core, `endGroup`).mockImplementation();
    });

    it(`should close the current group logger`, (): void => {
      expect.assertions(2);

      LoggerService.endGroup();

      expect(coreEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(coreEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = LoggerService.endGroup();

      expect(result).toStrictEqual(LoggerService);
    });
  });

  describe(`input()`, (): void => {
    it(`should return the input in magenta`, (): void => {
      expect.assertions(1);

      const result = LoggerService.input(EInputs.GITHUB_TOKEN);

      expect(result).toStrictEqual(`magenta-github-token`);
    });
  });
});
