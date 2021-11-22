import { IInputs } from '@core/inputs/inputs.interface';
import faker from 'faker';

export const TEST_DEFAULT_INPUTS: IInputs = {
  dryRun: false,
  githubToken: faker.datatype.uuid(),
  issueDaysBeforeClose: 10,
  issueDaysBeforeStale: 30,
  issueIgnoreAllAssignees: false,
  issueIgnoreAllLabels: false,
  issueIgnoreAnyLabels: [`issue-ignore-any-label-1`, `issue-ignore-any-label-2`],
  issueIgnoreBeforeCreationDate: ``,
  issueStaleLabel: `stale`,
};
