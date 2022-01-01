import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractIsStaleProcessor } from '@core/processing/abstract-is-stale-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

/**
 * @description
 * The processor to check if a pull request is stale
 */
export class PullRequestIsStaleProcessor extends AbstractIsStaleProcessor<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  protected _getInputStaleLabel(): string {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestStaleLabel;
  }

  protected _getLabels(): IGithubApiLabel[] {
    return this.processor.item.labels.nodes;
  }
}
