import { IGithubApiGetLabel } from '@github/api/labels/github-api-get-label.interface';
import { OctokitService } from '@github/octokit/octokit.service';
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
      .graphql<IGithubApiGetLabel>(
        `
        query MyQuery($owner: String!, $repository: String!, $labelName: String!) {
          repository(name: $repository, owner: $owner) {
            labels(query: $labelName, first: 1) {
              totalCount
              nodes {
                id
                name
              }
            }
          }
        }
      `,
        {
          labelName,
          owner: context.repo.owner,
          repository: context.repo.repo,
        }
      )
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
}
