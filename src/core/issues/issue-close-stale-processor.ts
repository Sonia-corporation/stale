import { InputsService } from '@core/inputs/inputs.service';
import { IssueCommentsProcessor } from '@core/issues/issue-comments-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';

/**
 * @description
 * The processor to close an issue
 */
export class IssueCloseStaleProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiIssuesService$$: GithubApiIssuesService;
  public readonly issueCommentsProcessor$$: IssueCommentsProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiIssuesService$$ = new GithubApiIssuesService(this.issueProcessor);
    this.issueCommentsProcessor$$ = new IssueCommentsProcessor(this.issueProcessor);
  }

  public async close(): Promise<void> {
    this.issueProcessor.logger.info(`Closing this issue...`);

    if (!InputsService.getInputs().dryRun) {
      await this.githubApiIssuesService$$.closeIssue(this.issueProcessor.githubIssue.id);
      this.issueProcessor.logger.info(`The issue was closed`);
    } else {
      this.issueProcessor.logger.info(`The issue was not closed due to the dry-run mode`);
    }

    await this.issueCommentsProcessor$$.processCloseComment();

    this.issueProcessor.logger.notice(`The issue is now closed`);
  }
}
