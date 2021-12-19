import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';

/**
 * @description
 * The processor to close a pull request
 */
export class PullRequestCloseStaleProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;
  public readonly githubApiPullRequestsService$$: GithubApiPullRequestsService;
  public readonly pullRequestCommentsProcessor$$: PullRequestCommentsProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
    this.githubApiPullRequestsService$$ = new GithubApiPullRequestsService(this.pullRequestProcessor);
    this.pullRequestCommentsProcessor$$ = new PullRequestCommentsProcessor(this.pullRequestProcessor);
  }

  public async close(): Promise<void> {
    this.pullRequestProcessor.logger.info(`Closing this pull request...`);

    if (!CommonInputsService.getInstance().getInputs().dryRun) {
      await this.githubApiPullRequestsService$$.closePullRequest(this.pullRequestProcessor.githubPullRequest.id);
      this.pullRequestProcessor.logger.info(`The pull request was closed`);
    } else {
      this.pullRequestProcessor.logger.info(`The pull request was not closed due to the dry-run mode`);
    }

    await this.pullRequestCommentsProcessor$$.processCloseComment();

    this.pullRequestProcessor.logger.notice(`The pull request is now closed`);
  }
}
