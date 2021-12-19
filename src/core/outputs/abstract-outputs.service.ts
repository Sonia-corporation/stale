import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export abstract class AbstractOutputsService {
  /**
   * @description
   * The name of the outputs that will be stored inside this service
   * Used only for the logs
   * @type {'issues' | 'pull requests'}
   * @protected
   */
  protected abstract readonly _outputsName: 'issues' | 'pull requests';

  public setOutputs(): AbstractOutputsService {
    LoggerService.info(`Creating the ${_.lowerCase(this._outputsName)} outputs...`);

    this._setOutputs();

    LoggerService.info(`${_.upperFirst(this._outputsName)} outputs created`);

    return this;
  }

  protected abstract _setOutputs(): void;
}
