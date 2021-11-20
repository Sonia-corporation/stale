import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';

/**
 * @description
 * The processor to close an issue
 */
export class IssueCloseStaleProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiIssuesService$$: GithubApiIssuesService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiIssuesService$$ = new GithubApiIssuesService(this.issueProcessor);
  }

  public async close(): Promise<void> {
    this.issueProcessor.logger.info(`Closing this issue...`);

    if (!InputsService.getInputs().dryRun) {
      await this.githubApiIssuesService$$.closeIssue(this.issueProcessor.githubIssue.id);
    }

    this.issueProcessor.logger.notice(`Closed`);
  }
}
