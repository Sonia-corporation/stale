import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

/**
 * @description
 * The processor to check if a pull request is stale
 */
export class PullRequestIsStaleProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public isStale(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if the pull request is already stale...`);

    const staleLabel: IGithubApiLabel | undefined = this._getStaleLabel();

    if (staleLabel) {
      this.pullRequestProcessor.logger.info(`The stale label is already added on this pull request`);

      return true;
    }

    this.pullRequestProcessor.logger.info(`The stale label is not yet on this pull request`);

    return false;
  }

  private _getStaleLabel(): IGithubApiLabel | undefined {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return this.pullRequestProcessor.githubPullRequest.labels.nodes.find(
      (label: Readonly<IGithubApiLabel>): boolean => label.name === pullRequestsInputs.pullRequestStaleLabel
    );
  }
}
