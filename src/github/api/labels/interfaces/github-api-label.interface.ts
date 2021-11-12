import { IUuid } from '@utils/dates/uuid';

export interface IGithubApiLabel {
  readonly id: IUuid;
  readonly name: string;
}
