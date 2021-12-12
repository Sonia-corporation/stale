import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import * as core from '@actions/core';

/**
 * @description
 * Used to get the common inputs coming from action
 */
export class CommonInputsService {
  public static inputs$$: ICommonInputs | undefined = undefined;

  public static initialize(): CommonInputsService {
    CommonInputsService.setInputs();
    CommonInputsService.logInputs();

    return CommonInputsService;
  }

  public static setInputs(): ICommonInputs {
    CommonInputsService.inputs$$ = {
      dryRun: core.getBooleanInput(EInputs.DRY_RUN, { required: false }),
      githubToken: core.getInput(EInputs.GITHUB_TOKEN, { required: false }),
    };

    return CommonInputsService.inputs$$;
  }

  public static logInputs(): CommonInputsService {
    CoreInputsService.logInputs(`Common inputs`, CommonInputsService.getInputs());

    return CommonInputsService;
  }

  public static getInputs(): ICommonInputs | never {
    if (!CommonInputsService.inputs$$) {
      throw new Error(`The common inputs are unset`);
    }

    return CommonInputsService.inputs$$;
  }
}
