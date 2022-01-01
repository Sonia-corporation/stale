import { AbstractInputsService } from '@core/inputs/abstract-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Used to get the common inputs coming from action
 */
export class CommonInputsService extends AbstractInputsService<ICommonInputs> {
  private static _instance: CommonInputsService;

  public static getInstance(): CommonInputsService {
    if (_.isNil(CommonInputsService._instance)) {
      CommonInputsService._instance = new CommonInputsService();
    }

    return CommonInputsService._instance;
  }

  protected readonly _inputsName: `common` = `common`;

  public setInputs(): ICommonInputs {
    this.inputs$$ = {
      dryRun: core.getBooleanInput(EInputs.DRY_RUN, { required: false }),
      githubToken: core.getInput(EInputs.GITHUB_TOKEN, { required: false }),
    };

    return this.inputs$$;
  }
}
