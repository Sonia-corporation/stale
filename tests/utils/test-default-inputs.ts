import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { IAllInputs } from '@core/inputs/types/all-inputs';
import faker from 'faker';

export const TEST_DEFAULT_INPUTS: IAllInputs = {
  dryRun: false,
  githubToken: faker.datatype.uuid(),
  issueAddLabelsAfterClose: [],
  issueAddLabelsAfterStale: [],
  issueCloseComment: `close-comment`,
  issueCloseReason: ECloseReason.NOT_PLANNED,
  issueDaysBeforeClose: 10,
  issueDaysBeforeStale: 30,
  issueIgnoreAllAssignees: false,
  issueIgnoreAllLabels: false,
  issueIgnoreAllMilestones: false,
  issueIgnoreAllProjects: false,
  issueIgnoreAnyAssignees: [`issue-ignore-any-assignee-1`, `issue-ignore-any-assignee-2`],
  issueIgnoreAnyLabels: [`issue-ignore-any-label-1`, `issue-ignore-any-label-2`],
  issueIgnoreAnyMilestones: [`issue-ignore-any-milestone-1`, `issue-ignore-any-milestone-2`],
  issueIgnoreAnyProjects: [`issue-ignore-any-project-1`, `issue-ignore-any-project-2`],
  issueIgnoreBeforeCreationDate: ``,
  issueLimitApiMutationsCount: -1,
  issueLimitApiQueriesCount: -1,
  issueOnlyAnyAssignees: [],
  issueOnlyAnyMilestones: [],
  issueOnlyAnyProjects: [],
  issueOnlyWithAssignees: false,
  issueOnlyWithMilestones: false,
  issueOnlyWithProjects: false,
  issueProcessing: true,
  issueRemoveLabelsAfterClose: [],
  issueRemoveLabelsAfterStale: [],
  issueStaleComment: `stale-comment`,
  issueStaleLabel: `stale`,
  pullRequestAddLabelsAfterClose: [],
  pullRequestAddLabelsAfterStale: [],
  pullRequestCloseComment: `close-comment`,
  pullRequestDaysBeforeClose: 10,
  pullRequestDaysBeforeStale: 30,
  pullRequestDeleteBranchAfterClose: false,
  pullRequestIgnoreAllAssignees: false,
  pullRequestIgnoreAllLabels: false,
  pullRequestIgnoreAllMilestones: false,
  pullRequestIgnoreAllProjects: false,
  pullRequestIgnoreAnyAssignees: [`pull-request-ignore-any-assignee-1`, `pull-request-ignore-any-assignee-2`],
  pullRequestIgnoreAnyLabels: [`pull-request-ignore-any-label-1`, `pull-request-ignore-any-label-2`],
  pullRequestIgnoreAnyMilestones: [`pull-request-ignore-any-milestone-1`, `pull-request-ignore-any-milestone-2`],
  pullRequestIgnoreAnyProjects: [`pull-request-ignore-any-project-1`, `pull-request-ignore-any-project-2`],
  pullRequestIgnoreBeforeCreationDate: ``,
  pullRequestIgnoreDraft: false,
  pullRequestLimitApiMutationsCount: -1,
  pullRequestLimitApiQueriesCount: -1,
  pullRequestOnlyAnyAssignees: [],
  pullRequestOnlyAnyMilestones: [],
  pullRequestOnlyAnyProjects: [],
  pullRequestOnlyWithAssignees: false,
  pullRequestOnlyWithMilestones: false,
  pullRequestOnlyWithProjects: false,
  pullRequestProcessing: true,
  pullRequestRemoveLabelsAfterClose: [],
  pullRequestRemoveLabelsAfterStale: [],
  pullRequestStaleComment: `stale-comment`,
  pullRequestStaleLabel: `stale`,
  pullRequestToDraftInsteadOfStale: false,
};
