export interface IGithubApiIssues {
  readonly data: {
    readonly repository: {
      readonly issues: {
        readonly nodes: IGitHubApiIssue[];
        readonly pageInfo: {
          readonly hasNextPage: boolean;
        };
        readonly totalCount: number;
      };
    };
  };
}

export interface IGitHubApiIssue {
  readonly createdAt: string;
  readonly locked: boolean;
  readonly number: number;
  readonly updatedAt: string;
  readonly url: string;
}
