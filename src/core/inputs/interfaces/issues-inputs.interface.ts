import { IInputs } from '@core/inputs/types/inputs';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IIssuesInputs extends IInputs {
  readonly issueAddLabelsAfterClose: string[];
  readonly issueAddLabelsAfterStale: string[];
  readonly issueCloseComment: IComment | '';
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllAssignees: boolean;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAllMilestones: boolean;
  readonly issueIgnoreAllProjectCards: boolean;
  readonly issueIgnoreAnyAssignees: string[];
  readonly issueIgnoreAnyLabels: string[];
  readonly issueIgnoreAnyMilestones: string[];
  readonly issueIgnoreAnyProjectCards: string[];
  readonly issueIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly issueLimitApiMutationsCount: number;
  readonly issueLimitApiQueriesCount: number;
  readonly issueOnlyAnyAssignees: string[];
  readonly issueOnlyAnyMilestones: string[];
  readonly issueOnlyAnyProjectCards: string[];
  readonly issueProcessing: boolean;
  readonly issueStaleComment: IComment | '';
  readonly issueStaleLabel: string;
}
