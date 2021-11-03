import { EInputs } from './inputs.enum';
import { IInputs } from './inputs.interface';
import { LoggerFormatService } from '../../utils/logger/logger-format.service';
import { LoggerService } from '../../utils/logger/logger.service';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Used to get the inputs coming from action
 */
export class InputsService {
  public static inputs: IInputs | undefined = undefined;

  public static initialize(): InputsService {
    InputsService.setInputs();
    InputsService.logInputs();

    return InputsService;
  }

  public static setInputs(): IInputs {
    InputsService.inputs = {
      githubToken: core.getInput(`github-token`, { required: true }),
    };

    return InputsService.inputs;
  }

  public static logInputs(): InputsService {
    LoggerService.startGroup(`Inputs`);

    _.forEach(InputsService.inputs, (value: Readonly<string | boolean>, key: Readonly<string>): void => {
      LoggerService.debug(
        LoggerFormatService.white(`├──`),
        LoggerService.input(_.kebabCase(key) as EInputs),
        LoggerFormatService.cyan(value)
      );
    });

    LoggerService.endGroup();

    return InputsService;
  }
}
