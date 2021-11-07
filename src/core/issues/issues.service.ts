import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiIssues } from '@github/api/issues/github-api-issues.interface';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export class IssuesService {
  public static async process(): Promise<void> {
    await IssuesService.processBatches();

    LoggerService.info(LoggerFormatService.green(`All the issues were processed`));
  }

  public static async processBatches(batch: Readonly<number> = 1, fromPageCursor?: Readonly<string>): Promise<void> {
    LoggerService.info(
      `Fetching the issues batch ${LoggerFormatService.cyan(_.toString(batch))}${LoggerFormatService.whiteBright(
        `...`
      )}`
    );

    const issues: IGithubApiIssues | never = await GithubApiIssuesService.fetchIssues(fromPageCursor);
    const issuesCount: number = issues.repository.issues.nodes.length;

    LoggerService.info(
      `Found`,
      LoggerFormatService.cyan(_.toString(issuesCount)),
      LoggerFormatService.whiteBright(`issue${issuesCount > 1 ? `s` : ``} in this batch`)
    );

    for (const issue of issues.repository.issues.nodes) {
      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single issue at a time
      // eslint-disable-next-line no-await-in-loop
      await new IssueProcessor(issue).process();
    }

    LoggerService.info(
      LoggerFormatService.green(`Issues batch`),
      LoggerFormatService.cyan(_.toString(batch)),
      LoggerFormatService.green(`processed`)
    );

    if (issues.repository.issues.pageInfo.hasNextPage) {
      LoggerService.info(`Continuing with the next batch of issues`);

      await IssuesService.processBatches(++batch, issues.repository.issues.pageInfo.endCursor);
    } else {
      LoggerService.info(LoggerFormatService.green(`All the issues batches were processed`));
    }
  }
}
