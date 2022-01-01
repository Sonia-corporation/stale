import { AbstractCloseStaleProcessor } from '@core/processing/abstract-close-stale-processor';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to close an issue
 */
export class IssueCloseStaleProcessor extends AbstractCloseStaleProcessor<IssueProcessor> {
  public readonly githubApiIssuesService$$: GithubApiIssuesService;
  public readonly issueCommentsProcessor$$: IssueCommentsProcessor;

  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
    this.githubApiIssuesService$$ = new GithubApiIssuesService(issueProcessor);
    this.issueCommentsProcessor$$ = new IssueCommentsProcessor(issueProcessor);
  }

  protected _closeItem(itemId: Readonly<IUuid>): Promise<void> {
    return this.githubApiIssuesService$$.closeIssue(itemId);
  }

  protected _processCloseComment(): Promise<void> {
    return this.issueCommentsProcessor$$.processCloseComment();
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }
}
