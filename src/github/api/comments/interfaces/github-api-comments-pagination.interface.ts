import { IGithubApiComment } from '@github/api/comments/interfaces/github-api-comment.interface';

export interface IGithubApiCommentsPagination {
  readonly nodes: IGithubApiComment[];
  readonly pageInfo: {
    readonly endCursor: string;
    readonly hasNextPage: boolean;
  };
  readonly totalCount: number;
}
