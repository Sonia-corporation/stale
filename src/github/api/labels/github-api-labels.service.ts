import { GITHUB_API_ADD_LABEL_TO_ISSUE_MUTATION } from '@github/api/labels/constants/github-api-add-label-to-issue-mutation';
import { GITHUB_API_GET_LABEL_QUERY } from '@github/api/labels/constants/github-api-get-label-query';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { IUuid } from '@utils/dates/uuid';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiLabelsService {
  public static fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiGetLabel> | never {
    LoggerService.info(
      `Fetching the label`,
      LoggerFormatService.cyan(labelName),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiGetLabel>(GITHUB_API_GET_LABEL_QUERY, {
        labelName,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiGetLabel>): IGithubApiGetLabel | never => {
        const { totalCount } = response.repository.labels;

        if (totalCount === 0) {
          LoggerService.error(`Could not find a single label matching`, LoggerFormatService.cyan(labelName));
          throw new Error(`Could not find a single label matching ${labelName}`);
        }

        if (response.repository.labels.nodes[0].name !== labelName) {
          LoggerService.error(
            `Could find a label`,
            LoggerFormatService.cyan(response.repository.labels.nodes[0].name),
            LoggerFormatService.red(`which is not exactly identical to`),
            LoggerFormatService.cyan(labelName)
          );

          // @todo handle the pagination
          if (totalCount > 1) {
            LoggerService.warning(
              `Found`,
              LoggerFormatService.cyan(_.toString(totalCount)),
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
        LoggerService.error(`Failed to fetch the label`, LoggerFormatService.cyan(labelName));

        throw error;
      });
  }

  public static addLabelToIssue(issueId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> | never {
    LoggerService.info(
      `Adding the label`,
      LoggerFormatService.cyan(labelId),
      LoggerFormatService.whiteBright(`on the issue`),
      `${LoggerFormatService.cyan(issueId)}${LoggerFormatService.whiteBright(`...`)}`
    );

    return OctokitService.getOctokit()
      .graphql<unknown>(GITHUB_API_ADD_LABEL_TO_ISSUE_MUTATION, {
        issueId,
        labelId,
      })
      .then((): void => {
        LoggerService.info(
          LoggerFormatService.green(`Label`),
          LoggerFormatService.cyan(labelId),
          LoggerFormatService.green(`added to issue`),
          LoggerFormatService.cyan(issueId)
        );
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(
          `Failed to add the label`,
          LoggerFormatService.cyan(labelId),
          LoggerFormatService.red(`on the issue`),
          LoggerFormatService.cyan(issueId)
        );

        throw error;
      });
  }
}
