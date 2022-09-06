import { IGithubApiCommentsPagination } from '@github/api/comments/interfaces/github-api-comments-pagination.interface';

export interface IGithubApiGetPullRequestComments {
  readonly repository: {
    readonly pullRequest: {
      readonly comments: IGithubApiCommentsPagination;
    };
  };
}
