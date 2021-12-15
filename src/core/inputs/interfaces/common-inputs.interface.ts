import { IInputs } from '@core/inputs/types/inputs';

export interface ICommonInputs extends IInputs {
  readonly dryRun: boolean;
  readonly githubToken: string;
}
