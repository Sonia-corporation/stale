import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

export interface IGithubApiGetLabel {
  readonly repository: {
    readonly label: IGithubApiLabel | null;
  };
}
