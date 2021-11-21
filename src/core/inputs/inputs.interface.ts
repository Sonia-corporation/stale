export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllAssignees: boolean;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAnyLabels: string[];
  readonly issueStaleLabel: string;
}
