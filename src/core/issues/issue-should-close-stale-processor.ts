import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { addXDaysToDate } from '@utils/dates/add-x-days-to-date';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to check if a stale issue should be closed
 */
export class IssueShouldCloseStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldClose(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue should be close...`);

    const { issueDaysBeforeClose } = InputsService.getInputs();
    const issueUpdatedAt: DateTime = this.issueProcessor.getUpdatedAt();
    const issueShouldClosedAt: DateTime = addXDaysToDate(issueUpdatedAt, issueDaysBeforeClose);

    this.issueProcessor.logger.info(
      `A stale issue should be closed after`,
      LoggerService.value(issueDaysBeforeClose),
      LoggerFormatService.whiteBright(`day${issueDaysBeforeClose > 1 ? `s` : ``}`)
    );
    this.issueProcessor.logger.info(`The issue was updated for the last time the`, LoggerService.date(issueUpdatedAt));
    this.issueProcessor.logger.info(
      `The issue should be closed if not updated until`,
      LoggerService.date(issueShouldClosedAt)
    );

    if (isDateMoreRecent(issueShouldClosedAt, DateTime.now())) {
      this.issueProcessor.logger.info(`The issue should remain stale`);

      return false;
    }

    this.issueProcessor.logger.info(
      `The last update on the issue was made more than`,
      LoggerService.value(issueDaysBeforeClose),
      LoggerFormatService.whiteBright(`day${issueDaysBeforeClose > 1 ? `s` : ``} ago`)
    );
    this.issueProcessor.logger.info(`The issue should be closed`);

    return true;
  }
}
