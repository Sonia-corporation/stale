import { IInputs } from '@core/inputs/types/inputs';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IIssuesInputs extends IInputs {
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
