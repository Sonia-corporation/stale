import { IUuid } from '@utils/types/uuid';

export interface IGithubApiProject {
  readonly id: IUuid;
  readonly title: string;
}
