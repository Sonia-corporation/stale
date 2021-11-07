import { IGithubApiIssue } from '@github/api/issues/github-api-issue.interface';

export interface IGithubApiIssues {
  readonly repository: {
    readonly issues: {
      readonly nodes: IGithubApiIssue[];
      readonly pageInfo: {
        readonly endCursor: string;
        readonly hasNextPage: boolean;
      };
      readonly totalCount: number;
    };
  };
}
