import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractCommentsProcessor } from '@core/processing/abstract-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestCommentsService } from '@github/api/comments/github-api-pull-request-comments.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export class PullRequestCommentsProcessor extends AbstractCommentsProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestCommentsService$$: GithubApiPullRequestCommentsService;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
    this.githubApiPullRequestCommentsService$$ = new GithubApiPullRequestCommentsService(pullRequestProcessor);
  }

  protected _getStaleComment(): IComment | '' {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestStaleComment;
  }

  protected _getCloseComment(): IComment | '' {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestCloseComment;
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected _increaseAddedCommentsCountStatistic(): void {
    PullRequestsStatisticsService.getInstance().increaseAddedPullRequestsCommentsCount();
  }

  protected _addComment(itemId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void> {
    return this.githubApiPullRequestCommentsService$$.addComment(itemId, comment);
  }
}
