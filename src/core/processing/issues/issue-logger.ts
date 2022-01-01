import { AbstractLogger } from '@core/processing/abstract-logger';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';

export class IssueLogger extends AbstractLogger {
  public constructor(issueNumber: Readonly<IGithubApiIssueNumber>) {
    super(issueNumber);
  }

  protected _setPrefixColor(prefix: Readonly<string>): string {
    return LoggerFormatService.red(prefix);
  }
}
