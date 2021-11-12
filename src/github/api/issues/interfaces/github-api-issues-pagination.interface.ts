import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';

export interface IGithubApiIssuesPagination {
  readonly nodes: IGithubApiIssue[];
  readonly pageInfo: {
    readonly endCursor: string;
    readonly hasNextPage: boolean;
  };
  readonly totalCount: number;
}
