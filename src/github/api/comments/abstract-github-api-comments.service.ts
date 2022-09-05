import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-remove-issue-comment-mutation';
import { GITHUB_API_REMOVE_PULL_REQUEST_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-remove-pull-request-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { ECommentType } from '@utils/enums/comment-type.enum';
import { ICommentHeaderOptions } from '@utils/interfaces/comment-header-options.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

const COMMENT_EOL = `\r\n`;
const COMMENT_HEADER_START = `<!-- SONIA-STALE-COMMENT-HEADER:START -->${COMMENT_EOL}`;
const COMMENT_HEADER_END = `<!-- SONIA-STALE-COMMENT-HEADER:END -->${COMMENT_EOL}${COMMENT_EOL}`;
const COMMENT_TYPE_MAP: Record<ECommentType, IComment> = {
  [ECommentType.CLOSE]: `<!-- Close comment -->${COMMENT_EOL}`,
  [ECommentType.STALE]: `<!-- Stale comment -->${COMMENT_EOL}`,
};

export abstract class AbstractGithubApiCommentsService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }

  public addComment(
    targetId: Readonly<IUuid>,
    comment: Readonly<IComment>,
    commentHeaderOptions: Readonly<ICommentHeaderOptions>
  ): Promise<void> | never {
    this.processor.logger.info(
      `Adding the comment`,
      LoggerService.value(comment),
      LoggerFormatService.whiteBright(`on the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_COMMENT_MUTATION, {
        comment: this._addCommentHeader(comment, commentHeaderOptions),
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
          startLine: 57,
          title: `Error`,
        });

        throw error;
      });
  }

  public removeComment(targetId: Readonly<IUuid>, commentId: Readonly<IUuid>): Promise<void> | never {
    this.processor.logger.info(
      `Removing the comment`,
      LoggerService.value(commentId),
      LoggerFormatService.whiteBright(`from the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(
        this.type === `issue`
          ? GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION
          : GITHUB_API_REMOVE_PULL_REQUEST_COMMENT_MUTATION,
        {
          id: commentId,
        }
      )
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Comment`),
          LoggerService.value(commentId),
          LoggerFormatService.green(`removed from the ${this.type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to remove the comment`,
          LoggerService.value(commentId),
          LoggerFormatService.red(`from the ${this.type}`),
          LoggerService.value(targetId)
        );
        AnnotationsService.error(
          this.type === `issue`
            ? EAnnotationError.FAILED_REMOVING_ISSUE_COMMENT
            : EAnnotationError.FAILED_REMOVING_PULL_REQUEST_COMMENT,
          {
            file: `abstract-github-api-comments.service.ts`,
            startLine: 101,
            title: `Error`,
          }
        );

        throw error;
      });
  }

  private _addCommentHeader(comment: Readonly<IComment>, options: Readonly<ICommentHeaderOptions>): IComment {
    return `${this._createCommentHeader(options)}${comment}`;
  }

  private _createCommentHeader(options: Readonly<ICommentHeaderOptions>): IComment {
    return `${COMMENT_HEADER_START}${this._getHeaderOptions(options)}${COMMENT_HEADER_END}`;
  }

  private _getHeaderOptions(options: Readonly<ICommentHeaderOptions>): IComment {
    let headerOptions: IComment = ``;

    headerOptions += COMMENT_TYPE_MAP[options.commentType];

    return headerOptions;
  }

  protected abstract _increaseCalledApiMutationsCount(): void;
}
