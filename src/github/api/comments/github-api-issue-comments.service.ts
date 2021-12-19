import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { AbstractGithubApiCommentsService } from '@github/api/comments/abstract-github-api-comments.service';

export class GithubApiIssueCommentsService extends AbstractGithubApiCommentsService<IssueProcessor> {
  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    super(issueProcessor);
  }
}
