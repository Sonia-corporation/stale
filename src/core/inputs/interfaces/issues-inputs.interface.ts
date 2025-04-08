import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { IInputs } from '@core/inputs/types/inputs';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IIssuesInputs extends IInputs {
  readonly issueAddLabelsAfterClose: string[];
  readonly issueAddLabelsAfterStale: string[];
  readonly issueCloseComment: IComment | '';
  readonly issueCloseReason: ECloseReason;
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllAssignees: boolean;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAllMilestones: boolean;
  readonly issueIgnoreAllProjects: boolean;
  readonly issueIgnoreAnyAssignees: string[];
  readonly issueIgnoreAnyLabels: string[];
  readonly issueIgnoreAnyMilestones: string[];
  readonly issueIgnoreAnyProjects: string[];
  readonly issueIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly issueLimitApiMutationsCount: number;
  readonly issueLimitApiQueriesCount: number;
  readonly issueOnlyAnyAssignees: string[];
  readonly issueOnlyAnyMilestones: string[];
  readonly issueOnlyAnyProjects: string[];
  readonly issueOnlyWithAssignees: boolean;
  readonly issueOnlyWithMilestones: boolean;
  readonly issueOnlyWithProjects: boolean;
  readonly issueProcessing: boolean;
  readonly issueRemoveLabelsAfterClose: string[];
  readonly issueRemoveLabelsAfterStale: string[];
  readonly issueStaleComment: IComment | '';
  readonly issueStaleLabel: string;
}
