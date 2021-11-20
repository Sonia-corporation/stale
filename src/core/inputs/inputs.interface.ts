export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAnyLabels: string[];
  readonly issueStaleLabel: string;
}
