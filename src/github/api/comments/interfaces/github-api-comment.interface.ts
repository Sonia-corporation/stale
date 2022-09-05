import { IUuid } from '@utils/types/uuid';

export interface IGithubApiComment {
  readonly body: string;
  readonly id: IUuid;
}
