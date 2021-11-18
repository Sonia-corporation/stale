import { IGithubApiIssuesPagination } from '@github/api/issues/interfaces/github-api-issues-pagination.interface';

export interface IGithubApiGetIssues {
  readonly repository: {
    readonly issues: IGithubApiIssuesPagination;
  };
}
