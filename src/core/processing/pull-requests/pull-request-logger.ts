import { AbstractLogger } from '@core/processing/abstract-logger';
import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';

export class PullRequestLogger extends AbstractLogger {
  public constructor(pullRequestNumber: Readonly<IGithubApiPullRequestNumber>) {
    super(pullRequestNumber);
  }

  protected _setPrefixColor(prefix: Readonly<string>): string {
    return LoggerFormatService.blue(prefix);
  }
}
