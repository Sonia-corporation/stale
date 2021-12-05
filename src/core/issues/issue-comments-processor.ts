import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { StatisticsService } from '@core/statistics/statistics.service';
import { GithubApiCommentsService } from '@github/api/comments/github-api-comments.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class IssueCommentsProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiCommentsService$$: GithubApiCommentsService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiCommentsService$$ = new GithubApiCommentsService(this.issueProcessor);
  }

  public async processStaleComment(): Promise<void> {
    this.issueProcessor.logger.info(`Checking if a stale comment should be added...`);

    const inputs: IInputs = InputsService.getInputs();

    if (inputs.issueStaleComment === ``) {
      this.issueProcessor.logger.info(`The stale comment is unset. Continuing...`);

      return;
    }

    this.issueProcessor.logger.info(`The stale comment is set to`, LoggerService.value(inputs.issueStaleComment));

    if (!inputs.dryRun) {
      this.issueProcessor.logger.info(`Adding the stale comment...`);

      await this.githubApiCommentsService$$.addCommentToIssue(
        this.issueProcessor.githubIssue.id,
        inputs.issueStaleComment
      );
    }

    StatisticsService.increaseAddedIssuesCommentsCount();
    this.issueProcessor.logger.notice(`Stale comment added`);
  }
}
