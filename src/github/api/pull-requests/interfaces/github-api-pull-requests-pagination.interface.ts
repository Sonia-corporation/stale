import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';

export interface IGithubApiPullRequestsPagination {
  readonly nodes: IGithubApiPullRequest[];
  readonly pageInfo: {
    readonly endCursor: string;
    readonly hasNextPage: boolean;
  };
  readonly totalCount: number;
}
