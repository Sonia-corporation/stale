import { IssueProcessor } from '@core/issues/issue-processor';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
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

export class GithubApiLabelsService {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  /**
   * @description
   * Fetch some labels by name or description
   * @todo handle the pagination to check the other labels as well
   * @param {Readonly<string>} labelName The name of the label to search for
   * @returns {Promise<IGithubApiGetLabels>} The stale label
   */
  public fetchLabelsByName(labelName: Readonly<string>): Promise<IGithubApiGetLabels> {
    this.issueProcessor.logger.info(
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

        if (totalCount === 0) {
          this.issueProcessor.logger.error(`Could not find a single label matching`, LoggerService.value(labelName));
          throw new Error(`Could not find a single label matching ${labelName}`);
        }

        this.issueProcessor.logger.info(
          LoggerFormatService.green(`Found the labels matching`),
          LoggerService.value(labelName)
        );

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(`Failed to fetch the labels matching`, LoggerService.value(labelName));

        throw error;
      });
  }

  public fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    this.issueProcessor.logger.info(
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
        if (!response.repository.label) {
          this.issueProcessor.logger.error(`Could not fetch the label`, LoggerService.value(labelName));
        }

        this.issueProcessor.logger.info(LoggerFormatService.green(`Found the label`), LoggerService.value(labelName));

        return response.repository.label;
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(`Failed to fetch the label`, LoggerService.value(labelName));

        throw error;
      });
  }

  public addLabelToIssue(issueId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    this.issueProcessor.logger.info(
      `Adding the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`on the issue`),
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_LABEL_MUTATION, {
        id: issueId,
        labelId,
      })
      .then((): void => {
        this.issueProcessor.logger.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`added to the issue`),
          LoggerService.value(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(
          `Failed to add the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`on the issue`),
          LoggerService.value(issueId)
        );

        throw error;
      });
  }

  public removeLabelFromIssue(issueId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    this.issueProcessor.logger.info(
      `Removing the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`from the issue`),
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_REMOVE_LABEL_MUTATION, {
        id: issueId,
        labelId,
      })
      .then((): void => {
        this.issueProcessor.logger.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`removed from the issue`),
          LoggerService.value(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(
          `Failed to remove the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`from the issue`),
          LoggerService.value(issueId)
        );

        throw error;
      });
  }
}
