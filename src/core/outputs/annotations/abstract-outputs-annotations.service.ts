import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export abstract class AbstractOutputsAnnotationsService {
  /**
   * @description
   * The name of the outputs that will be stored inside this service
   * Used only for the logs
   * @type {'issues' | 'pull requests'}
   * @protected
   */
  protected abstract readonly _outputsName: 'issues' | 'pull requests';

  public noticeAllOutputs(): AbstractOutputsAnnotationsService {
    LoggerService.info(`Logging the ${_.lowerCase(this._outputsName)} outputs annotations as notices...`);

    this._noticeAllOutputs();

    LoggerService.info(`${_.upperFirst(this._outputsName)} outputs annotations logged`);

    return this;
  }

  protected abstract _noticeAllOutputs(): void;
}
