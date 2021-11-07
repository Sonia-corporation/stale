import { IGithubApiIssueNumber } from '../../github/api/issues/github-api-issue-number';
import { LoggerFormatService } from '../../utils/loggers/logger-format.service';
import { LoggerService } from '../../utils/loggers/logger.service';

export class IssueLogger {
  public readonly issueNumber: IGithubApiIssueNumber;

  public constructor(issueNumber: Readonly<IGithubApiIssueNumber>) {
    this.issueNumber = issueNumber;
  }

  public debug(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.debug(this.getPrefix$$(), ...message);

    return this;
  }

  public info(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.info(this.getPrefix$$(), ...message);

    return this;
  }

  public notice(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.notice(this.getPrefix$$(), ...message);

    return this;
  }

  public warning(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.warning(this.getPrefix$$(), ...message);

    return this;
  }

  public error(...message: ReadonlyArray<string>): IssueLogger {
    LoggerService.error(this.getPrefix$$(), ...message);

    return this;
  }

  public async group(name: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return LoggerService.group(`${this.getPrefix$$()} ${name}`, fn);
  }

  public startGroup(name: Readonly<string>): IssueLogger {
    LoggerService.startGroup(`${this.getPrefix$$()} ${name}`);

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
