import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractProcessingService } from '@core/processing/abstract-processing.service';
import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export class IssuesService extends AbstractProcessingService<IGithubApiGetIssues> {
  private static _instance: IssuesService;

  public static getInstance(): IssuesService {
    if (_.isNil(IssuesService._instance)) {
      IssuesService._instance = new IssuesService();
    }

    return IssuesService._instance;
  }

  protected readonly _itemType: 'issue' = `issue`;

  public isProcessingEnabled$$(): boolean {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (!issuesInputs.issueProcessing) {
      LoggerService.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_PROCESSING),
        LoggerFormatService.whiteBright(`is disabled. Skipping the processing of issues...`)
      );

      return false;
    }

    LoggerService.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_PROCESSING),
      LoggerFormatService.whiteBright(`is enabled. Continuing...`)
    );

    return true;
  }

  public hasReachedQueriesLimit$$(): boolean {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    // If the option is above or equal to 0
    // Negative number is equivalent of disabling this feature
    if (issuesInputs.issueLimitApiQueriesCount >= 0) {
      return IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount > issuesInputs.issueLimitApiQueriesCount;
    }

    return false;
  }

  public hasReachedMutationsLimit$$(): boolean {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    // If the option is above or equal to 0
    // Negative number is equivalent of disabling this feature
    if (issuesInputs.issueLimitApiMutationsCount >= 0) {
      return (
        IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount > issuesInputs.issueLimitApiMutationsCount
      );
    }

    return false;
  }

  protected _increaseProcessedItemsCount(): void {
    IssuesStatisticsService.getInstance().increaseProcessedIssuesCount();
  }

  protected _process(issue: Readonly<IGithubApiIssue>): Promise<void> {
    return new IssueProcessor(issue, new IssueLogger(issue.number)).process();
  }

  protected _getItems(fromPageId: Readonly<string | undefined>): Promise<IGithubApiGetIssues> {
    return GithubApiIssuesService.fetchIssues(fromPageId);
  }
}
