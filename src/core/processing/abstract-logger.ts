import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export abstract class AbstractLogger {
  public readonly itemNumber: number;

  protected constructor(itemNumber: Readonly<number>) {
    this.itemNumber = itemNumber;
  }

  public debug(...message: ReadonlyArray<string>): AbstractLogger {
    LoggerService.debug(this.getPrefix$$(), LoggerFormatService.whiteBright(_.join(message, ` `)));

    return this;
  }

  public info(...message: ReadonlyArray<string>): AbstractLogger {
    LoggerService.info(this.getPrefix$$(), LoggerFormatService.whiteBright(_.join(message, ` `)));

    return this;
  }

  public warning(...message: ReadonlyArray<string>): AbstractLogger {
    LoggerService.warning(this.getPrefix$$(), LoggerFormatService.whiteBright(_.join(message, ` `)));

    return this;
  }

  public error(...message: ReadonlyArray<string>): AbstractLogger {
    LoggerService.error(this.getPrefix$$(), LoggerFormatService.whiteBright(_.join(message, ` `)));

    return this;
  }

  public async group(name: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return LoggerService.group(`${this.getPrefix$$()} ${LoggerFormatService.whiteBright(name)}`, fn);
  }

  public startGroup(...name: ReadonlyArray<string>): AbstractLogger {
    LoggerService.startGroup(`${this.getPrefix$$()}`, LoggerFormatService.whiteBright(_.join(name, ` `)));

    return this;
  }

  public endGroup(): AbstractLogger {
    LoggerService.endGroup();

    return this;
  }

  public getPrefix$$(): string {
    return this._setPrefixColor(`[#${this.itemNumber}]`);
  }

  /**
   * @description
   * Used to define a color for the prefix
   * Normally, intended using {@link LoggerFormatService}
   * @param {Readonly<string>} prefix The prefix to color
   * @returns {string} The colored prefix
   * @protected
   */
  protected abstract _setPrefixColor(prefix: Readonly<string>): string;
}
