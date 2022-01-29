import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { AbstractGithubApiCommentsService } from '@github/api/comments/abstract-github-api-comments.service';

export class GithubApiIssueCommentsService extends AbstractGithubApiCommentsService<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  protected _increaseCalledApiMutationsCount(): void {
    IssuesStatisticsService.getInstance().increaseCalledApiIssuesMutationsCount();
  }
}
