import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class IssueLogger {
  public readonly issueNumber: IGithubApiIssueNumber;

  public constructor(issueNumber: Readonly<IGithubApiIssueNumber>) {
    this.issueNumber = issueNumber;
  }

  public debug(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.debug(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public info(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.info(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public notice(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.notice(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public warning(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.warning(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public error(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.error(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public async group(name: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return LoggerService.group(`${this.getPrefix$$()} ${LoggerFormatService.whiteBright(name)}`, fn);
  }

  public startGroup(...name: ReadonlyArray<string>): IssueLogger {
    LoggerService.startGroup(`${this.getPrefix$$()}`, LoggerFormatService.whiteBright(name.join(` `)));

    return this;
  }

  public endGroup(): IssueLogger {
    LoggerService.endGroup();

    return this;
  }

  public getPrefix$$(): string {
    return LoggerFormatService.red(`[#${this.issueNumber}]`);
  }
}
