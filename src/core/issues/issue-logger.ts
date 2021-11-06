import { IGithubApiIssueNumber } from '../../github/api/github-api-issue-number';
import { LoggerFormatService } from '../../utils/logger/logger-format.service';
import { LoggerService } from '../../utils/logger/logger.service';

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

  public getPrefix$$(): string {
    return LoggerFormatService.red(`[#${this.issueNumber}]`);
  }
}
