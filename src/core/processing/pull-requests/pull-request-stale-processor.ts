import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to stale a pull request
 */
export class PullRequestStaleProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;
  public readonly githubApiPullRequestLabelsService$$: GithubApiPullRequestLabelsService;
  public readonly pullRequestCommentsProcessor$$: PullRequestCommentsProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
    this.githubApiPullRequestLabelsService$$ = new GithubApiPullRequestLabelsService(this.pullRequestProcessor);
    this.pullRequestCommentsProcessor$$ = new PullRequestCommentsProcessor(this.pullRequestProcessor);
  }

  public shouldStale(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if the pull request should be stale...`);

    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    this.pullRequestProcessor.logger.info(`Adding the stale state to this pull request...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInstance().getInputs();
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    this.pullRequestProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(pullRequestsInputs.pullRequestStaleLabel),
      LoggerFormatService.whiteBright(`to add on this pull request...`)
    );

    const label: IGithubApiLabel | null = await this.githubApiPullRequestLabelsService$$.fetchLabelByName(
      pullRequestsInputs.pullRequestStaleLabel
    );

    if (!label) {
      this.pullRequestProcessor.logger.error(
        `Could not find the stale label`,
        LoggerService.value(pullRequestsInputs.pullRequestStaleLabel)
      );

      throw new Error(`Could not find the stale label ${pullRequestsInputs.pullRequestStaleLabel}`);
    }

    this.pullRequestProcessor.logger.info(`The stale label was fetched`);
    this.pullRequestProcessor.logger.info(`Adding the stale label to this pull request...`);

    if (!commonInputs.dryRun) {
      await this.githubApiPullRequestLabelsService$$.addLabel(this.pullRequestProcessor.githubPullRequest.id, label.id);

      this.pullRequestProcessor.logger.info(`The stale label was added`);
    } else {
      this.pullRequestProcessor.logger.info(`The stale label was not added due to the dry-run mode`);
    }

    await this.pullRequestCommentsProcessor$$.processStaleComment();

    this.pullRequestProcessor.logger.notice(`The pull request is now stale`);
  }

  public isStaleByUpdateDate$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if the pull request should be stale based on the update date...`);

    const updatedAt: DateTime = this.pullRequestProcessor.getUpdatedAt();
    const inputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    this.pullRequestProcessor.logger.info(
      `The pull request was updated for the last time the`,
      LoggerService.date(updatedAt)
    );

    const numberOfDaysBeforeStale: number = inputs.pullRequestDaysBeforeStale;
    const daysDifference: number = _.round(
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days,
      1
    );
    const isStale: boolean = daysDifference > numberOfDaysBeforeStale;

    if (isStale) {
      this.pullRequestProcessor.logger.info(
        `The pull request should be stale since it was not updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    } else {
      this.pullRequestProcessor.logger.info(
        `The pull request should not be stale since it was updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    }

    this.pullRequestProcessor.logger.debug(
      `The difference is`,
      LoggerService.value(_.toString(daysDifference)),
      LoggerFormatService.whiteBright(`day${daysDifference > 1 ? `s` : ``}`)
    );

    return isStale;
  }
}
