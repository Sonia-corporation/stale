import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueCloseComment: IComment | '';
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllAssignees: boolean;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAllProjectCards: boolean;
  readonly issueIgnoreAnyAssignees: string[];
  readonly issueIgnoreAnyLabels: string[];
  readonly issueIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly issueStaleComment: IComment | '';
  readonly issueStaleLabel: string;
}
