import { EInputs } from '@core/inputs/inputs.enum';
import { MOCK_DATE_FORMAT } from '@utils/loggers/mock-date-format';
import { DateTime } from 'luxon';

export class LoggerService {
  public static debug(): LoggerService {
    return LoggerService;
  }

  public static info(): LoggerService {
    return LoggerService;
  }

  public static notice(): LoggerService {
    return LoggerService;
  }

  public static warning(): LoggerService {
    return LoggerService;
  }

  public static error(): LoggerService {
    return LoggerService;
  }

  public static async group(): Promise<void> {
    return Promise.resolve();
  }

  public static startGroup(): LoggerService {
    return LoggerService;
  }

  public static endGroup(): LoggerService {
    return LoggerService;
  }

  public static input(input: Readonly<EInputs>): string {
    return `input-${input}`;
  }

  public static value(value: Readonly<string | boolean | string[]>): string {
    return `value-${value}`;
  }

  public static date(date: Readonly<DateTime>): string {
    // Predefined format only for the tests
    // To avoid having issues locally versus in the CI
    return `date-${date.toFormat(MOCK_DATE_FORMAT)}`;
  }
}
