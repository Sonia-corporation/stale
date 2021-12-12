import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class IssuesOutputsService {
  public static setOutputs(): IssuesOutputsService {
    LoggerService.info(`Creating the issues outputs...`);

    core.setOutput(EIssuesOutputs.ALREADY_STALE_ISSUES_COUNT, IssuesStatisticsService.alreadyStaleIssuesCount$$);
    core.setOutput(EIssuesOutputs.IGNORED_ISSUES_COUNT, IssuesStatisticsService.ignoredIssuesCount$$);
    core.setOutput(EIssuesOutputs.UNALTERED_ISSUES_COUNT, IssuesStatisticsService.unalteredIssuesCount$$);
    core.setOutput(EIssuesOutputs.STALE_ISSUES_COUNT, IssuesStatisticsService.staleIssuesCount$$);
    core.setOutput(EIssuesOutputs.PROCESSED_ISSUES_COUNT, IssuesStatisticsService.processedIssuesCount$$);
    core.setOutput(EIssuesOutputs.REMOVE_STALE_ISSUES_COUNT, IssuesStatisticsService.removeStaleIssuesCount$$);
    core.setOutput(EIssuesOutputs.CLOSE_ISSUES_COUNT, IssuesStatisticsService.closedIssuesCount$$);
    core.setOutput(EIssuesOutputs.ADDED_ISSUES_COMMENTS_COUNT, IssuesStatisticsService.addedIssuesCommentsCount$$);

    LoggerService.info(`Issues outputs created`);

    return IssuesOutputsService;
  }
}
