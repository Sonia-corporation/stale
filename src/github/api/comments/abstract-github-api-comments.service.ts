import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export abstract class AbstractGithubApiCommentsService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }

  public addComment(targetId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void> | never {
    this.processor.logger.info(
      `Adding the comment`,
      LoggerService.value(comment),
      LoggerFormatService.whiteBright(`on the ${this._type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_COMMENT_MUTATION, {
        comment,
        id: targetId,
      })
      .then((): void => {
        this.processor.logger.info(
          LoggerFormatService.green(`Comment`),
          LoggerService.value(comment),
          LoggerFormatService.green(`added to the ${this._type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to add the comment`,
          LoggerService.value(comment),
          LoggerFormatService.red(`on the ${this._type}`),
          LoggerService.value(targetId)
        );

        throw error;
      });
  }
}
