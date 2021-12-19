import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { AbstractGithubApiLabelsService } from '@github/api/labels/abstract-github-api-labels.service';

export class GithubApiIssueLabelsService extends AbstractGithubApiLabelsService<IssueProcessor> {
  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    super(issueProcessor);
  }
}
