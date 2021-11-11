import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

export interface IGithubApiGetLabelPagination {
  readonly nodes: IGithubApiLabel[];
  readonly totalCount: number;
}
