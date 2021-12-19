import { IssueProcessor } from '@core/issues/issue-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';
import _ from 'lodash';

export abstract class AbstractGithubApiCommentsService<TProcessor extends IssueProcessor | PullRequestProcessor> {
  public readonly processor: TProcessor;
  private readonly _targetType: 'issue' | 'pull request';

  protected constructor(processor: TProcessor) {
    this.processor = processor;
    this._targetType = this.processor.type;
  }

  public addComment(targetId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void> | never {
    this.processor.logger.info(
      `Adding the comment`,
      LoggerService.value(comment),
      LoggerFormatService.whiteBright(`on the ${_.toLower(this._targetType)}`),
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
          LoggerFormatService.green(`added to the ${_.toLower(this._targetType)}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to add the comment`,
          LoggerService.value(comment),
          LoggerFormatService.red(`on the ${_.toLower(this._targetType)}`),
          LoggerService.value(targetId)
        );

        throw error;
      });
  }
}
