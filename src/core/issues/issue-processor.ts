import { IssueLogger } from '@core/issues/issue-logger';
import { IGitHubApiIssue } from '@github/api/issues/github-api-issue.interface';
import { createLink } from '@utils/links/create-link';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import _ from 'lodash';

export class IssueProcessor {
  public readonly githubIssue$$: IGitHubApiIssue;
  public readonly logger$$: IssueLogger;

  public constructor(issue: Readonly<IGitHubApiIssue>) {
    this.githubIssue$$ = issue;
    this.logger$$ = new IssueLogger(this.githubIssue$$.number);
  }

  public async process(): Promise<void> {
    this.logger$$.startGroup(
      `Processing issue`,
      LoggerFormatService.magenta(createLink(_.toString(this.githubIssue$$.number), this.githubIssue$$.url))
    );
    this.logger$$.endGroup();

    return Promise.resolve();
  }
}
