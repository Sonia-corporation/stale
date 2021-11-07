import { InputsService } from './inputs/inputs.service';
import { IssuesService } from './issues/issues.service';
import { OctokitService } from '../github/octokit/octokit.service';
import { LoggerFormatService } from '../utils/loggers/logger-format.service';
import { LoggerService } from '../utils/loggers/logger.service';
import * as core from '@actions/core';

export class StaleService {
  public static async initialize(): Promise<StaleService> {
    try {
      InputsService.initialize();
      OctokitService.initialize();
      await IssuesService.process();

      LoggerService.info(LoggerFormatService.green(`The stale processing is over`));
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
