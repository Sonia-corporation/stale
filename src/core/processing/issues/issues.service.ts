import { AbstractProcessingService } from '@core/processing/abstract-processing.service';
import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
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
