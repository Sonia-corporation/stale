import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

export interface IGithubApiLabelsPagination {
  readonly nodes: IGithubApiLabel[];
  readonly totalCount: number;
}
