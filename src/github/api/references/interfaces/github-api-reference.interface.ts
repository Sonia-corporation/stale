import { IUuid } from '@utils/types/uuid';

export interface IGithubApiReference {
  readonly id: IUuid;
  readonly name: string;
}
