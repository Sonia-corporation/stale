import { IGitHubApiIssue } from '../../github/api/github-api-issues.interface';
import { LoggerService } from '../../utils/logger/logger.service';

export class IssueProcessor {
  public githubIssue$$: IGitHubApiIssue;

  public constructor(issue: Readonly<IGitHubApiIssue>) {
    this.githubIssue$$ = issue;
  }

  public async process(): Promise<void> {
    LoggerService.info(`Processing issue ${this.githubIssue$$.number}`);

    return Promise.resolve();
  }
}
