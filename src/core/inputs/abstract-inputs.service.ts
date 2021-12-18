import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { IInputs } from '@core/inputs/types/inputs';
import _ from 'lodash';

/**
 * @description
 * Common service between the different inputs service
 * Used to avoid code duplication
 */
export abstract class AbstractInputsService<TInputs extends IInputs> {
  /**
   * @description
   * The name of the inputs that will be stored inside this service
   * Used only for the logs
   * @type {string}
   */
  public abstract readonly inputsName: string;

  /**
   * @description
   * The inputs stored in this service
   * @template TInputs
   * @type {TInputs | undefined}
   */
  public inputs$$: TInputs | undefined = undefined;

  /**
   * @description
   * Initialize the service by:
   * - setting up the inputs
   * - logging the newly set inputs
   * @template TInputs
   * @returns {AbstractInputsService<TInputs>} The newly set inputs
   */
  public initialize(): AbstractInputsService<TInputs> {
    this.setInputs();
    this.logInputs();

    return this;
  }

  /**
   * @description
   * Log the current inputs (humanized)
   * @template TInputs
   * @returns {AbstractInputsService<TInputs>} The service
   */
  public logInputs(): AbstractInputsService<TInputs> {
    CoreInputsService.logInputs(`${_.upperFirst(this.inputsName)} inputs`, this.getInputs());

    return this;
  }

  /**
   * @description
   * Return the inputs if they are set or throw
   * Useful to avoid handling optional inputs
   * @template TInputs
   * @returns {TInputs} The inputs
   */
  public getInputs(): TInputs | never {
    if (!this.inputs$$) {
      throw new Error(`The ${_.toLower(this.inputsName)} inputs are unset`);
    }

    return this.inputs$$;
  }

  public abstract setInputs(): TInputs;
}
