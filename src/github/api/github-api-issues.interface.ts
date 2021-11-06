import { IGitHubApiIssue } from './github-api-issue.interface';

export interface IGithubApiIssues {
  readonly repository: {
    readonly issues: {
      readonly nodes: IGitHubApiIssue[];
      readonly pageInfo: {
        readonly hasNextPage: boolean;
      };
      readonly totalCount: number;
    };
  };
}
