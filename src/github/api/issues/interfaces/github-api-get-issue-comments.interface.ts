import { IGithubApiCommentsPagination } from '@github/api/comments/interfaces/github-api-comments-pagination.interface';

export interface IGithubApiGetIssueComments {
  readonly repository: {
    readonly issue: {
      readonly comments: IGithubApiCommentsPagination;
    };
  };
}
