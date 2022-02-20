import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';

export interface IGithubApiProjectCardsPagination {
  readonly nodes: IGithubApiProjectCard[];
  readonly totalCount: number;
}
