import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractShouldCloseProcessor } from '@core/processing/abstract-should-close-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';

/**
 * @description
 * The processor to check if a stale pull request should be closed
 */
export class PullRequestShouldCloseProcessor extends AbstractShouldCloseProcessor<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  protected _getDaysBeforeClose(): number {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestDaysBeforeClose;
  }
}
