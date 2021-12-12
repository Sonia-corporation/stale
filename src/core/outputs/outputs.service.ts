import { EOutputs } from '@core/outputs/outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class OutputsService {
  public static setOutputs(): OutputsService {
    LoggerService.info(`Creating the outputs...`);

    core.setOutput(EOutputs.ALREADY_STALE_ISSUES_COUNT, IssuesStatisticsService.alreadyStaleIssuesCount$$);
    core.setOutput(EOutputs.IGNORED_ISSUES_COUNT, IssuesStatisticsService.ignoredIssuesCount$$);
    core.setOutput(EOutputs.UNALTERED_ISSUES_COUNT, IssuesStatisticsService.unalteredIssuesCount$$);
    core.setOutput(EOutputs.STALE_ISSUES_COUNT, IssuesStatisticsService.staleIssuesCount$$);
    core.setOutput(EOutputs.PROCESSED_ISSUES_COUNT, IssuesStatisticsService.processedIssuesCount$$);
    core.setOutput(EOutputs.REMOVE_STALE_ISSUES_COUNT, IssuesStatisticsService.removeStaleIssuesCount$$);
    core.setOutput(EOutputs.CLOSE_ISSUES_COUNT, IssuesStatisticsService.closedIssuesCount$$);
    core.setOutput(EOutputs.ADDED_ISSUES_COMMENTS_COUNT, IssuesStatisticsService.addedIssuesCommentsCount$$);

    LoggerService.info(`Outputs created`);

    return OutputsService;
  }
}
