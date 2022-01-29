import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { AbstractGithubApiLabelsService } from '@github/api/labels/abstract-github-api-labels.service';

export class GithubApiIssueLabelsService extends AbstractGithubApiLabelsService<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  protected _increaseCalledApiMutationsCount(): void {
    IssuesStatisticsService.getInstance().increaseCalledApiIssuesMutationsCount();
  }

  protected _increaseCalledApiQueriesCount(): void {
    IssuesStatisticsService.getInstance().increaseCalledApiIssuesQueriesCount();
  }
}
