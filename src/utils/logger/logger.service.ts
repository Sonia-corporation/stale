import { LoggerFormatService } from './logger-format.service';
import { EInputs } from '../../core/inputs/inputs.enum';
import { createInputLink } from '../link/create-input-link';
import core from '@actions/core';

/**
 * @description
 * Utility to log
 */
export class LoggerService {
  public static debug(...message: ReadonlyArray<string>): LoggerService {
    core.debug(LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public static notice(...message: ReadonlyArray<string>): LoggerService {
    core.notice(LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public static warning(...message: ReadonlyArray<string>): LoggerService {
    core.warning(LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public static error(...message: ReadonlyArray<string>): LoggerService {
    core.error(LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public static async group(message: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return core.group(LoggerFormatService.whiteBright(message), fn);
  }

  public static startGroup(name: Readonly<string>): LoggerService {
    core.startGroup(LoggerFormatService.whiteBright(name));

    return this;
  }

  public static endGroup(): LoggerService {
    core.endGroup();

    return this;
  }

  public static input(input: Readonly<EInputs>): string {
    return LoggerFormatService.magenta(createInputLink(input));
  }
}
