export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueIgnoreAnyLabels: string[];
  readonly issueStaleLabel: string;
}
