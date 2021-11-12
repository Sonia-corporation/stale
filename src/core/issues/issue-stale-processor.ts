import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

// Days
const NUMBER_OF_DAYS_BEFORE_STALE = 30;

export class IssueStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldStale(): boolean {
    LoggerService.info(`Checking if the issue should be stale...`);

    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    LoggerService.info(`Adding the stale state to this issue...`);

    const { issueStaleLabel } = InputsService.getInputs();

    LoggerService.info(
      `Fetching the stale label`,
      LoggerFormatService.cyan(issueStaleLabel),
      LoggerFormatService.whiteBright(`to add on this issue...`)
    );

    const label: IGithubApiGetLabel = await GithubApiLabelsService.fetchLabelByName(issueStaleLabel);

    LoggerService.info(`The stale label was fetched`);
    LoggerService.info(`Adding the stale label to this issue...`);

    await GithubApiLabelsService.addLabelToIssue(
      this.issueProcessor.githubIssue.id,
      label.repository.labels.nodes[0].id
    );

    LoggerService.info(`The stale label was added`);
    LoggerService.notice(`The issue is now stale`);
  }

  public isStaleByUpdateDate$$(): boolean {
    LoggerService.info(`Checking if the issue should be stale based on the update date...`);

    const updatedAt: DateTime = this.issueProcessor.getUpdatedAt();

    LoggerService.info(
      `The issue was updated for the last time the`,
      LoggerFormatService.cyan(updatedAt.toLocaleString(DateTime.DATETIME_SHORT))
    );

    const isStale: boolean =
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days > NUMBER_OF_DAYS_BEFORE_STALE;

    if (isStale) {
      LoggerService.info(
        `The issue should be stale since it was not updated in the last`,
        LoggerFormatService.cyan(_.toString(NUMBER_OF_DAYS_BEFORE_STALE)),
        LoggerFormatService.whiteBright(`days`)
      );
    } else {
      LoggerService.info(
        `The issue should not be stale since it was updated in the last`,
        LoggerFormatService.cyan(_.toString(NUMBER_OF_DAYS_BEFORE_STALE)),
        LoggerFormatService.whiteBright(`days`)
      );
    }

    return isStale;
  }
}
