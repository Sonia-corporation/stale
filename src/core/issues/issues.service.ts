import { IssueProcessor } from './issue-processor';
import { IGithubApiIssues } from '../../github/api/issues/github-api-issues.interface';
import { GithubApiIssuesService } from '../../github/api/issues/github-api-issues.service';
import { LoggerFormatService } from '../../utils/loggers/logger-format.service';
import { LoggerService } from '../../utils/loggers/logger.service';

export class IssuesService {
  public static async process(): Promise<void> {
    const issues: IGithubApiIssues = await GithubApiIssuesService.fetchIssues();

    for (const issue of issues.repository.issues.nodes) {
      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single issue at a time
      // eslint-disable-next-line no-await-in-loop
      await new IssueProcessor(issue).process();
    }

    LoggerService.info(LoggerFormatService.green(`All issues were processed`));
  }
}
