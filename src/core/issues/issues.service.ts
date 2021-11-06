import { Issue } from './issue';
import { IGithubApiIssues } from '../../github/api/github-api-issues.interface';
import { GithubApiIssuesService } from '../../github/api/github-api-issues.service';

export class IssuesService {
  public static async process(): Promise<void> {
    const issues: IGithubApiIssues = await GithubApiIssuesService.fetchIssues();

    for (const issue of issues.data.repository.issues.nodes) {
      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single issue at a time
      // eslint-disable-next-line no-await-in-loop
      await new Issue(issue).process();
    }
  }
}
