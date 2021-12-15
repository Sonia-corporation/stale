import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export class GithubApiPullRequestCommentsService {
  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public addCommentToPullRequest(pullRequestId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void> | never {
    this.pullRequestProcessor.logger.info(
      `Adding the comment`,
      LoggerService.value(comment),
      LoggerFormatService.whiteBright(`on the pull request`),
      `${LoggerService.value(pullRequestId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_COMMENT_MUTATION, {
        comment,
        id: pullRequestId,
      })
      .then((): void => {
        this.pullRequestProcessor.logger.info(
          LoggerFormatService.green(`Comment`),
          LoggerService.value(comment),
          LoggerFormatService.green(`added to the pull request`),
          LoggerService.value(pullRequestId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.pullRequestProcessor.logger.error(
          `Failed to add the comment`,
          LoggerService.value(comment),
          LoggerFormatService.red(`on the pull request`),
          LoggerService.value(pullRequestId)
        );

        throw error;
      });
  }
}
