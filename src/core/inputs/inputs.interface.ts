export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAnyLabels: string[];
  readonly issueStaleLabel: string;
}
