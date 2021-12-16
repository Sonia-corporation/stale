import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import * as core from '@actions/core';

/**
 * @description
 * Used to get the pull requests inputs coming from action
 */
export class PullRequestsInputsService {
  public static inputs$$: IPullRequestsInputs | undefined = undefined;

  public static initialize(): PullRequestsInputsService {
    PullRequestsInputsService.setInputs();
    PullRequestsInputsService.logInputs();

    return PullRequestsInputsService;
  }

  public static setInputs(): IPullRequestsInputs {
    PullRequestsInputsService.inputs$$ = {
      pullRequestCloseComment: core.getInput(EInputs.PULL_REQUEST_CLOSE_COMMENT, { required: false }),
      pullRequestDaysBeforeClose: CoreInputsService.getNumberInput$$(EInputs.PULL_REQUEST_DAYS_BEFORE_CLOSE, {
        required: false,
      }),
      pullRequestDaysBeforeStale: CoreInputsService.getNumberInput$$(EInputs.PULL_REQUEST_DAYS_BEFORE_STALE, {
        required: false,
      }),
      pullRequestIgnoreAllAssignees: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES, {
        required: false,
      }),
      pullRequestIgnoreAllLabels: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS, { required: false }),
      pullRequestIgnoreAllProjectCards: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS, {
        required: false,
      }),
      pullRequestIgnoreAnyAssignees: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_ASSIGNEES, {
        required: false,
      }),
      pullRequestIgnoreAnyLabels: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_LABELS, { required: false }),
      pullRequestIgnoreBeforeCreationDate: core.getInput(EInputs.PULL_REQUEST_IGNORE_BEFORE_CREATION_DATE, {
        required: false,
      }),
      pullRequestStaleComment: core.getInput(EInputs.PULL_REQUEST_STALE_COMMENT, { required: false }),
      pullRequestStaleLabel: core.getInput(EInputs.PULL_REQUEST_STALE_LABEL, { required: false }),
    };

    return PullRequestsInputsService.inputs$$;
  }

  public static logInputs(): PullRequestsInputsService {
    CoreInputsService.logInputs(`Pull requests inputs`, PullRequestsInputsService.getInputs());

    return PullRequestsInputsService;
  }

  public static getInputs(): IPullRequestsInputs | never {
    if (!PullRequestsInputsService.inputs$$) {
      throw new Error(`The pull requests inputs are unset`);
    }

    return PullRequestsInputsService.inputs$$;
  }
}
