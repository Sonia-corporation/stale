import { EInputs } from '@core/inputs/inputs.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import * as core from '@actions/core';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * Utility to log
 */
export class LoggerService {
  public static debug(...message: ReadonlyArray<string>): LoggerService {
    core.debug(LoggerFormatService.whiteBright(message.join(` `)));

    return LoggerService;
  }

  public static info(...message: ReadonlyArray<string>): LoggerService {
    core.info(LoggerFormatService.whiteBright(message.join(` `)));

    return LoggerService;
  }

  public static notice(...message: ReadonlyArray<string>): LoggerService {
    core.notice(LoggerFormatService.whiteBright(message.join(` `)));

    return LoggerService;
  }

  public static warning(...message: ReadonlyArray<string>): LoggerService {
    core.warning(LoggerFormatService.yellow(message.join(` `)));

    return LoggerService;
  }

  public static error(...message: ReadonlyArray<string>): LoggerService {
    core.error(LoggerFormatService.red(message.join(` `)));

    return LoggerService;
  }

  public static async group(name: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return core.group(LoggerFormatService.whiteBright(name), fn);
  }

  public static startGroup(...name: ReadonlyArray<string>): LoggerService {
    core.startGroup(LoggerFormatService.whiteBright(name.join(` `)));

    return LoggerService;
  }

  public static endGroup(): LoggerService {
    core.endGroup();

    return LoggerService;
  }

  /**
   * @description
   * Very specific log used to show an input as a link
   * @param {Readonly<EInputs>} input The input to display
   * @returns {string} The input as a link in magenta
   */
  public static input(input: Readonly<EInputs>): string {
    return LoggerFormatService.magenta(input);
  }

  /**
   * @description
   * Very specific log used to show a value
   * @param {Readonly<string | number | boolean | string[]>} value The value to display
   * @returns {string} The value in cyan
   */
  public static value(value: Readonly<string | number | boolean | string[]>): string {
    let formattedValue: string;

    if (_.isArray(value)) {
      formattedValue = _.join(value, `, `);
    } else {
      formattedValue = _.toString(value);
    }

    return LoggerFormatService.cyan(formattedValue);
  }

  /**
   * @description
   * Very specific log used to show a date
   * @param {Readonly<DateTime>} date The date to display
   * @returns {string} The date in cyan
   */
  public static date(date: Readonly<DateTime>): string {
    return LoggerFormatService.cyan(date.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS));
  }
}
