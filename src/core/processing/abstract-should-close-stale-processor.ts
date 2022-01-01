import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { addXDaysToDate } from '@utils/dates/add-x-days-to-date';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { AbstractProcessor } from '@utils/processors/abstract-processor';
import { DateTime } from 'luxon';

export abstract class AbstractShouldCloseStaleProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  public shouldClose(): boolean {
    this.processor.logger.info(`Checking if the ${this.type} should be close...`);

    const daysBeforeClose: number = this._getDaysBeforeClose();
    const updatedAt: DateTime = this.processor.getUpdatedAt();
    const shouldClosedAt: DateTime = addXDaysToDate(updatedAt, daysBeforeClose);

    this.processor.logger.info(
      `A stale ${this.type} should be closed after`,
      LoggerService.value(daysBeforeClose),
      LoggerFormatService.whiteBright(`day${daysBeforeClose > 1 ? `s` : ``}`)
    );
    this.processor.logger.info(`The ${this.type} was updated for the last time the`, LoggerService.date(updatedAt));
    this.processor.logger.info(
      `The ${this.type} should be closed if not updated until`,
      LoggerService.date(shouldClosedAt)
    );

    if (isDateMoreRecent(shouldClosedAt, DateTime.now())) {
      this.processor.logger.info(`The ${this.type} should remain stale`);

      return false;
    }

    this.processor.logger.info(
      `The last update on the ${this.type} was made more than`,
      LoggerService.value(daysBeforeClose),
      LoggerFormatService.whiteBright(`day${daysBeforeClose > 1 ? `s` : ``} ago`)
    );
    this.processor.logger.info(`The ${this.type} should be closed`);

    return true;
  }

  protected abstract _getDaysBeforeClose(): number;
}
