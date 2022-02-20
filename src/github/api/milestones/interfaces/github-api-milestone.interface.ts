import { IUuid } from '@utils/types/uuid';

export interface IGithubApiMilestone {
  readonly id: IUuid;
  readonly number: number;
  readonly state: 'CLOSED' | 'OPEN';
  readonly title: string;
}
