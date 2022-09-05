import { IGithubApiComment } from '@github/api/comments/interfaces/github-api-comment.interface';

export interface IGithubApiCommentsPagination {
  readonly nodes: IGithubApiComment[];
  readonly totalCount: number;
}
