import { IUuid } from '@utils/types/uuid';

export interface IGithubApiLabel {
  readonly id: IUuid;
  readonly name: string;
}
