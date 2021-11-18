import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';

export interface IGithubApiGetLabels {
  readonly repository: {
    readonly labels: IGithubApiLabelsPagination;
  };
}
