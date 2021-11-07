import { LoggerFormatService } from '@utils/loggers/logger-format.service';

describe(`LoggerFormatService`, (): void => {
  describe(`whiteBright()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in white bright`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.whiteBright(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `whiteBright`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`yellowBright()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in yellow bright`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.yellowBright(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `yellowBright`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`magenta()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in magenta`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.magenta(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `magenta`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`cyan()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in cyan`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.cyan(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `cyan`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`yellow()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in yellow`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.yellow(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `yellow`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`white()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in white`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.white(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `white`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`green()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in green`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.green(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `green`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`red()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in red`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.red(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `red`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`blue()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message colored in blue`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.blue(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `blue`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`bold()`, (): void => {
    let formatSpy: jest.SpyInstance;

    beforeEach((): void => {
      formatSpy = jest.spyOn(LoggerFormatService, `format`).mockReturnValue(`formatted message`);
    });

    it(`should return the message formatted in bold`, (): void => {
      expect.assertions(3);

      const result = LoggerFormatService.bold(`dummy message`);

      expect(formatSpy).toHaveBeenCalledTimes(1);
      expect(formatSpy).toHaveBeenCalledWith(`dummy message`, `bold`);
      expect(result).toStrictEqual(`formatted message`);
    });
  });

  describe(`format()`, (): void => {
    it(`should return the message formatted with the given style`, (): void => {
      expect.assertions(1);

      const result = LoggerFormatService.format(`dummy message`, `bold`);

      expect(result).toContain(`dummy message`);
    });
  });
});
