import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssueCommentsService } from '@github/api/comments/github-api-issue-comments.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class IssueCommentsProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiIssueCommentsService$$: GithubApiIssueCommentsService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiIssueCommentsService$$ = new GithubApiIssueCommentsService(this.issueProcessor);
  }

  public async processStaleComment(): Promise<void> {
    this.issueProcessor.logger.info(`Checking if a stale comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (issuesInputs.issueStaleComment === ``) {
      this.issueProcessor.logger.info(`The stale comment is unset. Continuing...`);

      return;
    }

    this.issueProcessor.logger.info(`The stale comment is set to`, LoggerService.value(issuesInputs.issueStaleComment));

    if (!commonInputs.dryRun) {
      this.issueProcessor.logger.info(`Adding the stale comment...`);

      await this.githubApiIssueCommentsService$$.addCommentToIssue(
        this.issueProcessor.githubIssue.id,
        issuesInputs.issueStaleComment
      );
    }

    IssuesStatisticsService.getInstance().increaseAddedIssuesCommentsCount();
    this.issueProcessor.logger.notice(`Stale comment added`);
  }

  public async processCloseComment(): Promise<void> {
    this.issueProcessor.logger.info(`Checking if a close comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (issuesInputs.issueCloseComment === ``) {
      this.issueProcessor.logger.info(`The close comment is unset. Continuing...`);

      return;
    }

    this.issueProcessor.logger.info(`The close comment is set to`, LoggerService.value(issuesInputs.issueCloseComment));

    if (!commonInputs.dryRun) {
      this.issueProcessor.logger.info(`Adding the close comment...`);

      await this.githubApiIssueCommentsService$$.addCommentToIssue(
        this.issueProcessor.githubIssue.id,
        issuesInputs.issueCloseComment
      );
    }

    IssuesStatisticsService.getInstance().increaseAddedIssuesCommentsCount();
    this.issueProcessor.logger.notice(`Close comment added`);
  }
}
