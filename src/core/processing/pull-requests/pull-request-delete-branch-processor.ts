import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestReferencesService } from '@github/api/references/github-api-pull-request-references.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { AbstractProcessor } from '@utils/processors/abstract-processor';

/**
 * @description
 * The processor to delete a pull request branch
 */
export class PullRequestDeleteBranchProcessor extends AbstractProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestReferencesService$$: GithubApiPullRequestReferencesService;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
    this.githubApiPullRequestReferencesService$$ = new GithubApiPullRequestReferencesService(pullRequestProcessor);
  }

  public async delete(): Promise<void> {
    this.processor.logger.info(`Processing to delete the pull request branch...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestDeleteBranchAfterClose) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_DELETE_BRANCH_AFTER_CLOSE),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_DELETE_BRANCH_AFTER_CLOSE),
      LoggerFormatService.whiteBright(`is enabled. The branch should be deleted...`)
    );
    this.processor.logger.info(
      `Deleting the branch`,
      LoggerService.value(`${this.processor.item.headRef.name}${LoggerFormatService.whiteBright(`...`)}`)
    );

    if (!CommonInputsService.getInstance().getInputs().dryRun) {
      await this.githubApiPullRequestReferencesService$$.deleteReference(this.processor.item.headRef.id);

      this.processor.logger.notice(
        `The branch`,
        LoggerService.value(this.processor.item.headRef.name),
        LoggerFormatService.whiteBright(`was deleted`)
      );
      PullRequestsStatisticsService.getInstance().increaseDeletedPullRequestsBranchesCount();
    } else {
      this.processor.logger.info(`The pull request branch was not deleted due to the dry-run mode`);
    }
  }
}
