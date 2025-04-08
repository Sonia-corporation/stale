import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';

export interface IGithubApiProjectsPagination {
  readonly nodes: IGithubApiProject[];
  readonly totalCount: number;
}
