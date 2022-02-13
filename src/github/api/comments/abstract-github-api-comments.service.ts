import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
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
      LoggerFormatService.whiteBright(`on the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_COMMENT_MUTATION, {
        comment,
        id: targetId,
      })
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Comment`),
          LoggerService.value(comment),
          LoggerFormatService.green(`added to the ${this.type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to add the comment`,
          LoggerService.value(comment),
          LoggerFormatService.red(`on the ${this.type}`),
          LoggerService.value(targetId)
        );
        AnnotationsService.error(EAnnotationError.FAILED_ADDING_COMMENT, {
          file: `abstract-github-api-comments.service.ts`,
          startLine: 42,
          title: `Error`,
        });

        throw error;
      });
  }

  protected abstract _increaseCalledApiMutationsCount(): void;
}
