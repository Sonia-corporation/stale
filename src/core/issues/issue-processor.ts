import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueLogger } from '@core/issues/issue-logger';
import { IGithubApiIssue } from '@github/api/issues/github-api-issue.interface';
import { createLink } from '@utils/links/create-link';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import _ from 'lodash';

export class IssueProcessor {
  public readonly githubIssue: IGithubApiIssue;
  public readonly logger: IssueLogger;

  public constructor(issue: Readonly<IGithubApiIssue>) {
    this.githubIssue = issue;
    this.logger = new IssueLogger(this.githubIssue.number);
  }

  public async process(): Promise<void> {
    this.logger.startGroup(
      `Processing issue`,
      `${LoggerFormatService.magenta(createLink(_.toString(this.githubIssue.number), this.githubIssue.url))}...`
    );

    if (this.shouldIgnore$$()) {
      this.logger.info(`Ignored`);
      this.stopProcessing$$();

      return;
    }

    this.stopProcessing$$();

    return Promise.resolve();
  }

  public stopProcessing$$(): void {
    this.logger.info(`Processing stopped`);
    this.logger.endGroup();
  }

  public shouldIgnore$$(): boolean {
    return new IssueIgnoreProcessor(this).shouldIgnore();
  }
}
