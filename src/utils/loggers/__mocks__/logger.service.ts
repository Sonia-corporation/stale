import { EInputs } from '@core/inputs/inputs.enum';
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
    return `date-${date.toLocaleString(DateTime.DATETIME_SHORT)}`;
  }
}
