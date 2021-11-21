import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';

export interface IGithubApiAssigneesPagination {
  readonly nodes: IGithubApiAssignee[];
  readonly totalCount: number;
}
