import { InputsService } from './inputs/inputs.service';
import { LoggerService } from '../utils/logger/logger.service';
import * as core from '@actions/core';

export class StaleService {
  public static initialize(): StaleService {
    try {
      InputsService.initialize();
    } catch (error: unknown) {
      if (error instanceof Error) {
        LoggerService.error(`[${error.name}] ${error.message}`);

        if (error.stack) {
          LoggerService.debug(error.stack);
        }

        core.setFailed(`Stale action failed with error ${error.message}`);
      } else {
        const errorMessage = `Stale action failed with error ${error}`;

        LoggerService.error(errorMessage);
        core.setFailed(errorMessage);
      }
    }

    return StaleService;
  }
}
