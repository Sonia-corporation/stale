import { AbstractCloseStaleProcessor } from '@core/processing/abstract-close-stale-processor';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to close a pull request
 */
export class PullRequestCloseStaleProcessor extends AbstractCloseStaleProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestsService$$: GithubApiPullRequestsService;
  public readonly pullRequestCommentsProcessor$$: PullRequestCommentsProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    super(pullRequestProcessor);
    this.githubApiPullRequestsService$$ = new GithubApiPullRequestsService(pullRequestProcessor);
    this.pullRequestCommentsProcessor$$ = new PullRequestCommentsProcessor(pullRequestProcessor);
  }

  protected _processCloseComment(): Promise<void> {
    return this.pullRequestCommentsProcessor$$.processCloseComment();
  }

  protected _closeItem(itemId: Readonly<IUuid>): Promise<void> {
    return this.githubApiPullRequestsService$$.closePullRequest(itemId);
  }

  protected _getItemId(): IUuid {
    return this.processor.githubPullRequest.id;
  }
}
