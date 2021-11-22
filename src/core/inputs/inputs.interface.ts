import { IIso8601Date } from '@utils/dates/iso-8601';

export interface IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
  readonly issueDaysBeforeClose: number;
  readonly issueDaysBeforeStale: number;
  readonly issueIgnoreAllAssignees: boolean;
  readonly issueIgnoreAllLabels: boolean;
  readonly issueIgnoreAnyLabels: string[];
  readonly issueIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly issueStaleLabel: string;
}
