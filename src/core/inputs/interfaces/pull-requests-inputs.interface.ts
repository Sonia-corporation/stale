import { IInputs } from '@core/inputs/types/inputs';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IPullRequestsInputs extends IInputs {
  readonly pullRequestAddLabelsAfterClose: string[];
  readonly pullRequestAddLabelsAfterStale: string[];
  readonly pullRequestCloseComment: IComment | '';
  readonly pullRequestDaysBeforeClose: number;
  readonly pullRequestDaysBeforeStale: number;
  readonly pullRequestDeleteBranchAfterClose: boolean;
  readonly pullRequestIgnoreAllAssignees: boolean;
  readonly pullRequestIgnoreAllLabels: boolean;
  readonly pullRequestIgnoreAllMilestones: boolean;
  readonly pullRequestIgnoreAllProjectCards: boolean;
  readonly pullRequestIgnoreAnyAssignees: string[];
  readonly pullRequestIgnoreAnyLabels: string[];
  readonly pullRequestIgnoreAnyMilestones: string[];
  readonly pullRequestIgnoreAnyProjectCards: string[];
  readonly pullRequestIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly pullRequestIgnoreDraft: boolean;
  readonly pullRequestLimitApiMutationsCount: number;
  readonly pullRequestLimitApiQueriesCount: number;
  readonly pullRequestOnlyAnyAssignees: string[];
  readonly pullRequestOnlyAnyMilestones: string[];
  readonly pullRequestOnlyAnyProjectCards: string[];
  readonly pullRequestOnlyWithAssignees: boolean;
  readonly pullRequestOnlyWithMilestones: boolean;
  readonly pullRequestOnlyWithProjectCards: boolean;
  readonly pullRequestProcessing: boolean;
  readonly pullRequestStaleComment: IComment | '';
  readonly pullRequestStaleLabel: string;
  readonly pullRequestToDraftInsteadOfStale: boolean;
}
