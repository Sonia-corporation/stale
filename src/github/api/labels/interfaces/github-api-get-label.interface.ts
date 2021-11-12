import { IGithubApiGetLabelPagination } from '@github/api/labels/interfaces/github-api-get-label-pagination.interface';

export interface IGithubApiGetLabel {
  readonly repository: {
    readonly labels: IGithubApiGetLabelPagination;
  };
}
