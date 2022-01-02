import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { AbstractGithubApiReferencesService } from '@github/api/references/abstract-github-api-references.service';

export class GithubApiPullRequestReferencesService extends AbstractGithubApiReferencesService<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }
}
