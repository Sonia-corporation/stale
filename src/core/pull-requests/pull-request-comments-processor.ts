import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestCommentsService } from '@github/api/comments/github-api-pull-request-comments.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class PullRequestCommentsProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;
  public readonly githubApiPullRequestCommentsService$$: GithubApiPullRequestCommentsService;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
    this.githubApiPullRequestCommentsService$$ = new GithubApiPullRequestCommentsService(this.pullRequestProcessor);
  }

  public async processStaleComment(): Promise<void> {
    this.pullRequestProcessor.logger.info(`Checking if a stale comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (pullRequestsInputs.pullRequestStaleComment === ``) {
      this.pullRequestProcessor.logger.info(`The stale comment is unset. Continuing...`);

      return;
    }

    this.pullRequestProcessor.logger.info(
      `The stale comment is set to`,
      LoggerService.value(pullRequestsInputs.pullRequestStaleComment)
    );

    if (!commonInputs.dryRun) {
      this.pullRequestProcessor.logger.info(`Adding the stale comment...`);

      await this.githubApiPullRequestCommentsService$$.addCommentToPullRequest(
        this.pullRequestProcessor.githubPullRequest.id,
        pullRequestsInputs.pullRequestStaleComment
      );
    }

    PullRequestsStatisticsService.increaseAddedPullRequestsCommentsCount();
    this.pullRequestProcessor.logger.notice(`Stale comment added`);
  }

  public async processCloseComment(): Promise<void> {
    this.pullRequestProcessor.logger.info(`Checking if a close comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (pullRequestsInputs.pullRequestCloseComment === ``) {
      this.pullRequestProcessor.logger.info(`The close comment is unset. Continuing...`);

      return;
    }

    this.pullRequestProcessor.logger.info(
      `The close comment is set to`,
      LoggerService.value(pullRequestsInputs.pullRequestCloseComment)
    );

    if (!commonInputs.dryRun) {
      this.pullRequestProcessor.logger.info(`Adding the close comment...`);

      await this.githubApiPullRequestCommentsService$$.addCommentToPullRequest(
        this.pullRequestProcessor.githubPullRequest.id,
        pullRequestsInputs.pullRequestCloseComment
      );
    }

    PullRequestsStatisticsService.increaseAddedPullRequestsCommentsCount();
    this.pullRequestProcessor.logger.notice(`Close comment added`);
  }
}
