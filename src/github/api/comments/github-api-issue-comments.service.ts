import { IssueProcessor } from '@core/issues/issue-processor';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IComment } from '@utils/types/comment';
import { IUuid } from '@utils/types/uuid';

export class GithubApiIssueCommentsService {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public addCommentToIssue(issueId: Readonly<IUuid>, comment: Readonly<IComment>): Promise<void> | never {
    this.issueProcessor.logger.info(
      `Adding the comment`,
      LoggerService.value(comment),
      LoggerFormatService.whiteBright(`on the issue`),
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_COMMENT_MUTATION, {
        comment,
        id: issueId,
      })
      .then((): void => {
        this.issueProcessor.logger.info(
          LoggerFormatService.green(`Comment`),
          LoggerService.value(comment),
          LoggerFormatService.green(`added to the issue`),
          LoggerService.value(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(
          `Failed to add the comment`,
          LoggerService.value(comment),
          LoggerFormatService.red(`on the issue`),
          LoggerService.value(issueId)
        );

        throw error;
      });
  }
}
