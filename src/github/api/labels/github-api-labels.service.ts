import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { IGithubApiLabels } from '@github/api/labels/interfaces/github-api-labels.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { IUuid } from '@utils/dates/uuid';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiLabelsService {
  public static fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabels> | never {
    LoggerService.info(
      `Fetching the label`,
      LoggerService.value(labelName),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiLabels>(GITHUB_API_LABEL_BY_NAME_QUERY, {
        labelName,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiLabels>): IGithubApiLabels | never => {
        const { totalCount } = response.repository.labels;

        if (totalCount === 0) {
          LoggerService.error(`Could not find a single label matching`, LoggerService.value(labelName));
          throw new Error(`Could not find a single label matching ${labelName}`);
        }

        if (response.repository.labels.nodes[0].name !== labelName) {
          LoggerService.error(
            `Could find a label`,
            LoggerService.value(response.repository.labels.nodes[0].name),
            LoggerFormatService.red(`which is not exactly identical to`),
            LoggerService.value(labelName)
          );

          // @todo handle the pagination
          if (totalCount > 1) {
            LoggerService.warning(
              `Found`,
              LoggerService.value(_.toString(totalCount)),
              LoggerFormatService.whiteBright(
                `labels during the search (by name or description). The pagination support is not yet implemented!`
              )
            );
          }

          throw new Error(`Could not find the label ${labelName}`);
        }

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the label`, LoggerService.value(labelName));

        throw error;
      });
  }

  public static addLabelToIssue(issueId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    LoggerService.info(
      `Adding the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`on the issue`),
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_LABEL_MUTATION, {
        issueId,
        labelId,
      })
      .then((): void => {
        LoggerService.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`added to the issue`),
          LoggerService.value(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(
          `Failed to add the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`on the issue`),
          LoggerService.value(issueId)
        );

        throw error;
      });
  }

  public static removeLabelFromIssue(issueId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    LoggerService.info(
      `Removing the label`,
      LoggerService.value(labelId),
      LoggerFormatService.whiteBright(`from the issue`),
      `${LoggerService.value(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_REMOVE_LABEL_MUTATION, {
        issueId,
        labelId,
      })
      .then((): void => {
        LoggerService.info(
          LoggerFormatService.green(`Label`),
          LoggerService.value(labelId),
          LoggerFormatService.green(`removed from the issue`),
          LoggerService.value(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(
          `Failed to remove the label`,
          LoggerService.value(labelId),
          LoggerFormatService.red(`from the issue`),
          LoggerService.value(issueId)
        );

        throw error;
      });
  }
}
