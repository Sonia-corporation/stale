import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';
import { GITHUB_API_DELETE_REFERENCE_MUTATION } from '@github/api/references/constants/github-api-delete-reference-mutation';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';

export abstract class AbstractGithubApiReferencesService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }

  public deleteReference(referenceId: Readonly<IUuid>): Promise<void> | never {
    this.processor.logger.info(
      `Deleting the reference`,
      LoggerService.value(referenceId),
      LoggerFormatService.whiteBright(`from this ${this.type}...`)
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_DELETE_REFERENCE_MUTATION, {
        id: referenceId,
      })
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Reference`),
          LoggerService.value(referenceId),
          LoggerFormatService.green(`deleted for this ${this.type}`)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to delete the reference`,
          LoggerService.value(referenceId),
          LoggerFormatService.red(`from this ${this.type}`)
        );

        throw error;
      });
  }

  protected abstract _increaseCalledApiMutationsCount(): void;
}
