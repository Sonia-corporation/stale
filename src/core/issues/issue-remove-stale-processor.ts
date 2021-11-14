import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiLabels } from '@github/api/labels/interfaces/github-api-labels.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';

/**
 * @description
 * The processor to remove the stale state from an issue
 */
export class IssueRemoveStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public async removeStale(): Promise<void> {
    this.issueProcessor.logger.info(`Removing the stale state from this issue...`);

    const { issueStaleLabel } = InputsService.getInputs();

    this.issueProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(issueStaleLabel),
      LoggerFormatService.whiteBright(`to remove from this issue...`)
    );

    const label: IGithubApiLabels = await GithubApiLabelsService.fetchLabelByName(issueStaleLabel);

    this.issueProcessor.logger.info(`The stale label was fetched`);
    this.issueProcessor.logger.info(`Removing the stale label from this issue...`);

    if (!InputsService.getInputs().dryRun) {
      await GithubApiLabelsService.removeLabelFromIssue(
        this.issueProcessor.githubIssue.id,
        label.repository.labels.nodes[0].id
      );

      this.issueProcessor.logger.info(`The stale label was removed`);
    } else {
      this.issueProcessor.logger.info(`The stale label was not removed due to the dry-run mode`);
    }

    this.issueProcessor.logger.notice(`The issue is no longer stale`);
  }
}
