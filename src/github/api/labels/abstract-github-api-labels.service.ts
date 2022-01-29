import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiService } from '@github/api/abstract-github-api.service';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_ADD_LABELS_MUTATION } from '@github/api/labels/constants/github-api-add-labels-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';

export abstract class AbstractGithubApiLabelsService<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractGithubApiService<TProcessor> {
  protected constructor(processor: TProcessor) {
    super(processor);
  }

  /**
   * @description
   * Fetch some labels by name or description
   * @todo handle the pagination to check the other labels as well
   * @param {Readonly<string>} labelName The name of the label to search for
   * @returns {Promise<IGithubApiGetLabels>} The stale label
   */
  public fetchLabelsByName(labelName: Readonly<string>): Promise<IGithubApiGetLabels> {
    this.processor.logger.info(
      `Fetching the labels matching`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetLabels>(GITHUB_API_LABELS_BY_NAME_QUERY, {
        labelName,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetLabels>): IGithubApiGetLabels | never => {
        const { totalCount } = response.repository.labels;

        this._increaseCalledApiQueriesCount();

        if (totalCount === 0) {
          this.processor.logger.error(`Could not find a single label matching`, LoggerService.value(labelName));
          throw new Error(`Could not find a single label matching ${labelName}`);
        }

        this.processor.logger.info(
          LoggerFormatService.green(`Found the labels matching`),
          LoggerService.value(labelName)
        );

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(`Failed to fetch the labels matching`, LoggerService.value(labelName));

        throw error;
      });
  }

  public fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    this.processor.logger.info(
      `Fetching the label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetLabel>(GITHUB_API_LABEL_BY_NAME_QUERY, {
        labelName,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetLabel>): IGithubApiLabel | null => {
        this._increaseCalledApiQueriesCount();

        if (!response.repository.label) {
          this.processor.logger.error(`Could not fetch the label`, LoggerService.value(labelName));
          this.processor.logger.debug(`Are you sure it exists in your repository?`);
        }

        this.processor.logger.info(LoggerFormatService.green(`Found the label`), LoggerService.value(labelName));

        return response.repository.label;
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(`Failed to fetch the label`, LoggerService.value(labelName));

        throw error;
      });
  }

  public addLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    this.processor.logger.info(
      `Adding the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`on the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_LABEL_MUTATION, {
        id: targetId,
        labelId,
      })
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`added to the ${this.type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to add the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`on the ${this.type}`),
          LoggerService.value(targetId)
        );

        throw error;
      });
  }

  public addLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void> | never {
    this.processor.logger.info(
      `Adding the labels`,
      LoggerService.value(labelsId),
      LoggerFormatService.whiteBright(`on the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_LABELS_MUTATION, {
        id: targetId,
        labelsId,
      })
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Labels`),
          LoggerService.value(labelsId),
          LoggerFormatService.green(`added to the ${this.type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to add the labels`,
          LoggerService.value(labelsId),
          LoggerFormatService.red(`on the ${this.type}`),
          LoggerService.value(targetId)
        );

        throw error;
      });
  }

  public removeLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    this.processor.logger.info(
      `Removing the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`from the ${this.type}`),
      `${LoggerService.value(targetId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_REMOVE_LABEL_MUTATION, {
        id: targetId,
        labelId,
      })
      .then((): void => {
        this._increaseCalledApiMutationsCount();
        this.processor.logger.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`removed from the ${this.type}`),
          LoggerService.value(targetId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(
          `Failed to remove the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`from the ${this.type}`),
          LoggerService.value(targetId)
        );

        throw error;
      });
  }

  protected abstract _increaseCalledApiQueriesCount(): void;

  protected abstract _increaseCalledApiMutationsCount(): void;
}
