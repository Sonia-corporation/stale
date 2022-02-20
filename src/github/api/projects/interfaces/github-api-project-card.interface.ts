import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { IUuid } from '@utils/types/uuid';

export interface IGithubApiProjectCard {
  readonly id: IUuid;
  readonly project: IGithubApiProject;
}
