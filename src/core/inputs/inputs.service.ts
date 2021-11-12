import { EInputs } from '@core/inputs/inputs.enum';
import { IInputs } from '@core/inputs/inputs.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Used to get the inputs coming from action
 */
export class InputsService {
  public static inputs$$: IInputs | undefined = undefined;

  public static initialize(): InputsService {
    InputsService.setInputs();
    InputsService.logInputs();

    return InputsService;
  }

  public static setInputs(): IInputs {
    InputsService.inputs$$ = {
      dryRun: core.getBooleanInput(EInputs.DRY_RUN, { required: false }),
      githubToken: core.getInput(EInputs.GITHUB_TOKEN, { required: false }),
      issueStaleLabel: core.getInput(EInputs.ISSUE_STALE_LABEL, { required: false }),
    };

    return InputsService.inputs$$;
  }

  public static logInputs(): InputsService {
    LoggerService.startGroup(`Inputs`);

    _.forIn(
      InputsService.inputs$$,
      (value: Readonly<string | boolean>, inputName: Readonly<string>, inputs: Readonly<IInputs>): void => {
        const lastInputName: string | undefined = _.findLastKey(inputs, (): true => true);

        LoggerService.info(
          LoggerFormatService.white(inputName === lastInputName ? ETreeRows.LAST : ETreeRows.ANY),
          LoggerService.input(_.kebabCase(inputName) as EInputs),
          LoggerService.value(value)
        );
      }
    );

    LoggerService.endGroup();

    return InputsService;
  }

  public static getInputs(): IInputs | never {
    if (!InputsService.inputs$$) {
      throw new Error(`The inputs are unset`);
    }

    return InputsService.inputs$$;
  }
}
