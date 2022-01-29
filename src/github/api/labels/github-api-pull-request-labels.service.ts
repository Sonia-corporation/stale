import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiLabelsService } from '@github/api/labels/abstract-github-api-labels.service';

export class GithubApiPullRequestLabelsService extends AbstractGithubApiLabelsService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }
}
