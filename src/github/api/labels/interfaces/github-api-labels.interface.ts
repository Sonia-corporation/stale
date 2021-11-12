import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';

export interface IGithubApiLabels {
  readonly repository: {
    readonly labels: IGithubApiLabelsPagination;
  };
}
