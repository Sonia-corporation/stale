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
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { GithubApiLabelsCacheService } from '@utils/cache/github-api-labels.cache.service';
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
          AnnotationsService.error(EAnnotationError.FAILED_FINDING_LABELS_MATCHING_SEARCH, {
            file: `abstract-github-api-labels.service.ts`,
            startLine: 56,
            title: `Error`,
          });

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
        AnnotationsService.error(EAnnotationError.FAILED_FETCHING_LABELS_MATCHING_SEARCH, {
          file: `abstract-github-api-labels.service.ts`,
          startLine: 74,
          title: `Error`,
        });

        throw error;
      });
  }

  public fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    this.processor.logger.info(
      `Fetching the label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    if (this.hasLabelInCache$$(labelName)) {
      return Promise.resolve(this.loadLabelFromCache$$(labelName));
    }

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
          AnnotationsService.error(EAnnotationError.COULD_NOT_FETCH_LABEL, {
            file: `abstract-github-api-labels.service.ts`,
            startLine: 102,
            title: `Error`,
          });
          this.processor.logger.debug(`Are you sure it exists in your repository?`);

          return null;
        }

        this.processor.logger.info(LoggerFormatService.green(`Found the label`), LoggerService.value(labelName));

        this.addLabelToCache$$(response.repository.label);

        return response.repository.label;
      })
      .catch((error: Readonly<Error>): never => {
        this.processor.logger.error(`Failed to fetch the label`, LoggerService.value(labelName));
        AnnotationsService.error(EAnnotationError.FAILED_FETCHING_LABEL, {
          file: `abstract-github-api-labels.service.ts`,
          startLine: 118,
          title: `Error`,
        });

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
        AnnotationsService.error(EAnnotationError.FAILED_ADDING_LABEL, {
          file: `abstract-github-api-labels.service.ts`,
          startLine: 157,
          title: `Error`,
        });

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
        AnnotationsService.error(EAnnotationError.FAILED_ADDING_LABELS, {
          file: `abstract-github-api-labels.service.ts`,
          startLine: 196,
          title: `Error`,
        });

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
        AnnotationsService.error(EAnnotationError.FAILED_REMOVING_LABEL, {
          file: `abstract-github-api-labels.service.ts`,
          startLine: 235,
          title: `Error`,
        });

        throw error;
      });
  }

  public hasLabelInCache$$(labelName: Readonly<string>): boolean {
    this.processor.logger.info(
      `Checking if the label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`exists in the cache`)
    );

    return GithubApiLabelsCacheService.has(labelName);
  }

  public addLabelToCache$$(label: Readonly<IGithubApiLabel>): void {
    this.processor.logger.info(
      `Adding the label`,
      LoggerService.value(label.name),
      LoggerFormatService.whiteBright(`to the cache`)
    );

    GithubApiLabelsCacheService.set(label.name, label);
  }

  public loadLabelFromCache$$(labelName: Readonly<string>): IGithubApiLabel | never {
    const label: IGithubApiLabel = GithubApiLabelsCacheService.get(labelName);

    this.processor.logger.info(
      `The label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`was found in the cache`)
    );
    this.processor.logger.info(
      `Returning the cached version`,
      LoggerFormatService.white(`->`),
      LoggerService.value(label.id)
    );

    return label;
  }

  protected abstract _increaseCalledApiQueriesCount(): void;

  protected abstract _increaseCalledApiMutationsCount(): void;
}
