import { EOutputs } from '@core/outputs/outputs.enum';
import { StatisticsService } from '@core/statistics/statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class OutputsService {
  public static setOutputs(): OutputsService {
    LoggerService.info(`Creating the outputs...`);

    core.setOutput(EOutputs.ALREADY_STALE_ISSUES_COUNT, StatisticsService.alreadyStaleIssuesCount$$);
    core.setOutput(EOutputs.IGNORED_ISSUES_COUNT, StatisticsService.ignoredIssuesCount$$);
    core.setOutput(EOutputs.UNALTERED_ISSUES_COUNT, StatisticsService.unalteredIssuesCount$$);
    core.setOutput(EOutputs.STALE_ISSUES_COUNT, StatisticsService.staleIssuesCount$$);
    core.setOutput(EOutputs.PROCESSED_ISSUES_COUNT, StatisticsService.processedIssuesCount$$);
    core.setOutput(EOutputs.REMOVE_STALE_ISSUES_COUNT, StatisticsService.removeStaleIssuesCount$$);
    core.setOutput(EOutputs.CLOSE_ISSUES_COUNT, StatisticsService.closeIssuesCount$$);

    LoggerService.info(`Outputs created`);

    return OutputsService;
  }
}
