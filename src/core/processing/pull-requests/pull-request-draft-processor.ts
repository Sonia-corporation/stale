import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { AbstractProcessor } from '@utils/processors/abstract-processor';

/**
 * @description
 * The processor to draft a pull request
 */
export class PullRequestDraftProcessor extends AbstractProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestsService$$: GithubApiPullRequestsService;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
    this.githubApiPullRequestsService$$ = new GithubApiPullRequestsService(pullRequestProcessor);
  }

  public async draft(): Promise<void> {
    this.processor.logger.info(`Converting this pull request to draft...`);

    await this.githubApiPullRequestsService$$.draftPullRequest(this.processor.item.id);

    this.processor.logger.notice(`The pull request is now a draft pull request`);
    PullRequestsStatisticsService.getInstance().increaseDraftPullRequestsCount();
  }

  public shouldDraftInsteadOfStale(): boolean {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestToDraftInsteadOfStale) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_TO_DRAFT_INSTEAD_OF_STALE),
        LoggerFormatService.whiteBright(
          `is disabled. Skipping the draft processing and start the stale processing instead...`
        )
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_TO_DRAFT_INSTEAD_OF_STALE),
      LoggerFormatService.whiteBright(`is enabled. Starting the draft processing instead of the stale processing...`)
    );

    return true;
  }
}
