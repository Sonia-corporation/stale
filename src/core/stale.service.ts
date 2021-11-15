import { InputsService } from '@core/inputs/inputs.service';
import { IssuesService } from '@core/issues/issues.service';
import { OutputsService } from '@core/outputs/outputs.service';
import { StatisticsService } from '@core/statistics/statistics.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class StaleService {
  public static async initialize(): Promise<StaleService> {
    try {
      LoggerService.info(`Starting the stale process...`);
      StatisticsService.initialize();
      InputsService.initialize();
      OctokitService.initialize();
      await IssuesService.process();
      LoggerService.info(LoggerFormatService.green(`The stale processing is over`));
      StatisticsService.logsAllStatistics();
      OutputsService.setOutputs();
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
