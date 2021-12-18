import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueCommentsProcessor } from '@core/issues/issue-comments-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to stale an issue
 */
export class IssueStaleProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiIssueLabelsService$$: GithubApiIssueLabelsService;
  public readonly issueCommentsProcessor$$: IssueCommentsProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiIssueLabelsService$$ = new GithubApiIssueLabelsService(this.issueProcessor);
    this.issueCommentsProcessor$$ = new IssueCommentsProcessor(this.issueProcessor);
  }

  public shouldStale(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue should be stale...`);

    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    this.issueProcessor.logger.info(`Adding the stale state to this issue...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInputs();

    this.issueProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(issuesInputs.issueStaleLabel),
      LoggerFormatService.whiteBright(`to add on this issue...`)
    );

    const label: IGithubApiLabel | null = await this.githubApiIssueLabelsService$$.fetchLabelByName(
      issuesInputs.issueStaleLabel
    );

    if (!label) {
      this.issueProcessor.logger.error(
        `Could not find the stale label`,
        LoggerService.value(issuesInputs.issueStaleLabel)
      );

      throw new Error(`Could not find the stale label ${issuesInputs.issueStaleLabel}`);
    }

    this.issueProcessor.logger.info(`The stale label was fetched`);
    this.issueProcessor.logger.info(`Adding the stale label to this issue...`);

    if (!commonInputs.dryRun) {
      await this.githubApiIssueLabelsService$$.addLabelToIssue(this.issueProcessor.githubIssue.id, label.id);

      this.issueProcessor.logger.info(`The stale label was added`);
    } else {
      this.issueProcessor.logger.info(`The stale label was not added due to the dry-run mode`);
    }

    await this.issueCommentsProcessor$$.processStaleComment();

    this.issueProcessor.logger.notice(`The issue is now stale`);
  }

  public isStaleByUpdateDate$$(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue should be stale based on the update date...`);

    const updatedAt: DateTime = this.issueProcessor.getUpdatedAt();
    const inputs: IIssuesInputs = IssuesInputsService.getInputs();

    this.issueProcessor.logger.info(`The issue was updated for the last time the`, LoggerService.date(updatedAt));

    const numberOfDaysBeforeStale: number = inputs.issueDaysBeforeStale;
    const daysDifference: number = _.round(
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days,
      1
    );
    const isStale: boolean = daysDifference > numberOfDaysBeforeStale;

    if (isStale) {
      this.issueProcessor.logger.info(
        `The issue should be stale since it was not updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    } else {
      this.issueProcessor.logger.info(
        `The issue should not be stale since it was updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    }

    this.issueProcessor.logger.debug(
      `The difference is`,
      LoggerService.value(_.toString(daysDifference)),
      LoggerFormatService.whiteBright(`day${daysDifference > 1 ? `s` : ``}`)
    );

    return isStale;
  }
}
