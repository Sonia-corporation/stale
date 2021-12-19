import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class PullRequestLogger {
  public readonly pullRequestNumber: IGithubApiPullRequestNumber;

  public constructor(pullRequestNumber: Readonly<IGithubApiPullRequestNumber>) {
    this.pullRequestNumber = pullRequestNumber;
  }

  public debug(...message: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.debug(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public info(...message: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.info(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public notice(...message: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.notice(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public warning(...message: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.warning(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public error(...message: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.error(this.getPrefix$$(), LoggerFormatService.whiteBright(message.join(` `)));

    return this;
  }

  public async group(name: Readonly<string>, fn: () => Promise<void>): Promise<void> {
    return LoggerService.group(`${this.getPrefix$$()} ${LoggerFormatService.whiteBright(name)}`, fn);
  }

  public startGroup(...name: ReadonlyArray<string>): PullRequestLogger {
    LoggerService.startGroup(`${this.getPrefix$$()}`, LoggerFormatService.whiteBright(name.join(` `)));

    return this;
  }

  public endGroup(): PullRequestLogger {
    LoggerService.endGroup();

    return this;
  }

  public getPrefix$$(): string {
    return LoggerFormatService.blue(`[#${this.pullRequestNumber}]`);
  }
}
