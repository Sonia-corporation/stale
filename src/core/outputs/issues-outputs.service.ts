import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

export class IssuesOutputsService {
  public static setOutputs(): IssuesOutputsService {
    LoggerService.info(`Creating the issues outputs...`);

    core.setOutput(
      EIssuesOutputs.ALREADY_STALE_ISSUES_COUNT,
      IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$
    );
    core.setOutput(EIssuesOutputs.IGNORED_ISSUES_COUNT, IssuesStatisticsService.getInstance().ignoredIssuesCount$$);
    core.setOutput(EIssuesOutputs.UNALTERED_ISSUES_COUNT, IssuesStatisticsService.getInstance().unalteredIssuesCount$$);
    core.setOutput(EIssuesOutputs.STALE_ISSUES_COUNT, IssuesStatisticsService.getInstance().staleIssuesCount$$);
    core.setOutput(EIssuesOutputs.PROCESSED_ISSUES_COUNT, IssuesStatisticsService.getInstance().processedIssuesCount$$);
    core.setOutput(
      EIssuesOutputs.REMOVE_STALE_ISSUES_COUNT,
      IssuesStatisticsService.getInstance().removeStaleIssuesCount$$
    );
    core.setOutput(EIssuesOutputs.CLOSE_ISSUES_COUNT, IssuesStatisticsService.getInstance().closedIssuesCount$$);
    core.setOutput(
      EIssuesOutputs.ADDED_ISSUES_COMMENTS_COUNT,
      IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$
    );

    LoggerService.info(`Issues outputs created`);

    return IssuesOutputsService;
  }
}
