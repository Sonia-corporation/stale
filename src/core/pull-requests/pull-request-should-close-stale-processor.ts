import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { addXDaysToDate } from '@utils/dates/add-x-days-to-date';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to check if a stale pull request should be closed
 */
export class PullRequestShouldCloseStaleProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public shouldClose(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if the pull request should be close...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();
    const pullRequestUpdatedAt: DateTime = this.pullRequestProcessor.getUpdatedAt();
    const pullRequestShouldClosedAt: DateTime = addXDaysToDate(
      pullRequestUpdatedAt,
      pullRequestsInputs.pullRequestDaysBeforeClose
    );

    this.pullRequestProcessor.logger.info(
      `A stale pull request should be closed after`,
      LoggerService.value(pullRequestsInputs.pullRequestDaysBeforeClose),
      LoggerFormatService.whiteBright(`day${pullRequestsInputs.pullRequestDaysBeforeClose > 1 ? `s` : ``}`)
    );
    this.pullRequestProcessor.logger.info(
      `The pull request was updated for the last time the`,
      LoggerService.date(pullRequestUpdatedAt)
    );
    this.pullRequestProcessor.logger.info(
      `The pull request should be closed if not updated until`,
      LoggerService.date(pullRequestShouldClosedAt)
    );

    if (isDateMoreRecent(pullRequestShouldClosedAt, DateTime.now())) {
      this.pullRequestProcessor.logger.info(`The pull request should remain stale`);

      return false;
    }

    this.pullRequestProcessor.logger.info(
      `The last update on the pull request was made more than`,
      LoggerService.value(pullRequestsInputs.pullRequestDaysBeforeClose),
      LoggerFormatService.whiteBright(`day${pullRequestsInputs.pullRequestDaysBeforeClose > 1 ? `s` : ``} ago`)
    );
    this.pullRequestProcessor.logger.info(`The pull request should be closed`);

    return true;
  }
}
