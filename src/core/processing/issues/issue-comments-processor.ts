import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractCommentsProcessor } from '@core/processing/abstract-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssueCommentsService } from '@github/api/comments/github-api-issue-comments.service';
import { ICommentHeaderOptions } from '@utils/interfaces/comment-header-options.interface';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export class IssueCommentsProcessor extends AbstractCommentsProcessor<IssueProcessor> {
  public readonly githubApiIssueCommentsService$$: GithubApiIssueCommentsService;

  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
    this.githubApiIssueCommentsService$$ = new GithubApiIssueCommentsService(issueProcessor);
  }

  protected _getStaleComment(): IComment | '' {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueStaleComment;
  }

  protected _getCloseComment(): IComment | '' {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueCloseComment;
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected _increaseAddedCommentsCountStatistic(): void {
    IssuesStatisticsService.getInstance().increaseAddedIssuesCommentsCount();
  }

  protected _addComment(
    itemId: Readonly<IUuid>,
    comment: Readonly<IComment>,
    commentHeaderOptions: Readonly<ICommentHeaderOptions>
  ): Promise<void> {
    return this.githubApiIssueCommentsService$$.addComment(itemId, comment, commentHeaderOptions);
  }
}
