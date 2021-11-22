import { EInputs } from '@core/inputs/inputs.enum';
import { IInputs } from '@core/inputs/inputs.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { isFiniteNumber } from '@utils/numbers/is-finite-number';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import * as core from '@actions/core';
import { InputOptions } from '@actions/core';
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
      issueDaysBeforeClose: this.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_CLOSE, { required: false }),
      issueDaysBeforeStale: this.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_STALE, { required: false }),
      issueIgnoreAllAssignees: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_ASSIGNEES, { required: false }),
      issueIgnoreAllLabels: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_LABELS, { required: false }),
      issueIgnoreAnyLabels: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_LABELS, { required: false }),
      issueIgnoreBeforeCreationDate: core.getInput(EInputs.ISSUE_IGNORE_BEFORE_CREATION_DATE, { required: false }),
      issueStaleLabel: core.getInput(EInputs.ISSUE_STALE_LABEL, { required: false }),
    };

    return InputsService.inputs$$;
  }

  public static logInputs(): InputsService {
    LoggerService.startGroup(`Inputs`);

    _.forIn(
      InputsService.inputs$$,
      (
        value: Readonly<string | number | boolean | string[]>,
        inputName: Readonly<string>,
        inputs: Readonly<IInputs>
      ): void => {
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

  public static getNumberInput$$(input: Readonly<EInputs>, options?: Readonly<InputOptions>): number {
    const inputValue: string = core.getInput(input, options);
    const value: number = _.parseInt(inputValue);

    if (!isFiniteNumber(value)) {
      LoggerService.error(
        `Wrong value given to the input`,
        LoggerService.value(input),
        LoggerFormatService.white(`->`),
        LoggerService.value(inputValue)
      );

      throw new Error(`Wrong value given to the input number ${input}`);
    }

    return value;
  }
}
