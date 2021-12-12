import { IGithubApiPullRequestsPagination } from '@github/api/pull-requests/interfaces/github-api-pull-requests-pagination.interface';

export interface IGithubApiGetPullRequests {
  readonly repository: {
    readonly pullRequests: IGithubApiPullRequestsPagination;
  };
}
