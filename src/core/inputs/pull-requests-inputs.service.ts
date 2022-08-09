import { AbstractInputsService } from '@core/inputs/abstract-inputs.service';
import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Used to get the pull requests inputs coming from action
 */
export class PullRequestsInputsService extends AbstractInputsService<IPullRequestsInputs> {
  private static _instance: PullRequestsInputsService;

  public static getInstance(): PullRequestsInputsService {
    if (_.isNil(PullRequestsInputsService._instance)) {
      PullRequestsInputsService._instance = new PullRequestsInputsService();
    }

    return PullRequestsInputsService._instance;
  }

  protected readonly _inputsName: `pull requests` = `pull requests`;

  public setInputs(): IPullRequestsInputs {
    this.inputs$$ = {
      pullRequestAddLabelsAfterClose: core.getMultilineInput(EInputs.PULL_REQUEST_ADD_LABELS_AFTER_CLOSE, {
        required: false,
      }),
      pullRequestAddLabelsAfterStale: core.getMultilineInput(EInputs.PULL_REQUEST_ADD_LABELS_AFTER_STALE, {
        required: false,
      }),
      pullRequestCloseComment: core.getInput(EInputs.PULL_REQUEST_CLOSE_COMMENT, { required: false }),
      pullRequestDaysBeforeClose: CoreInputsService.getNumberInput$$(EInputs.PULL_REQUEST_DAYS_BEFORE_CLOSE, {
        required: false,
      }),
      pullRequestDaysBeforeStale: CoreInputsService.getNumberInput$$(EInputs.PULL_REQUEST_DAYS_BEFORE_STALE, {
        required: false,
      }),
      pullRequestDeleteBranchAfterClose: core.getBooleanInput(EInputs.PULL_REQUEST_DELETE_BRANCH_AFTER_CLOSE, {
        required: false,
      }),
      pullRequestIgnoreAllAssignees: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES, {
        required: false,
      }),
      pullRequestIgnoreAllLabels: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS, { required: false }),
      pullRequestIgnoreAllMilestones: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_MILESTONES, {
        required: false,
      }),
      pullRequestIgnoreAllProjectCards: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS, {
        required: false,
      }),
      pullRequestIgnoreAnyAssignees: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_ASSIGNEES, {
        required: false,
      }),
      pullRequestIgnoreAnyLabels: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_LABELS, { required: false }),
      pullRequestIgnoreAnyMilestones: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_MILESTONES, {
        required: false,
      }),
      pullRequestIgnoreAnyProjectCards: core.getMultilineInput(EInputs.PULL_REQUEST_IGNORE_ANY_PROJECT_CARDS, {
        required: false,
      }),
      pullRequestIgnoreBeforeCreationDate: core.getInput(EInputs.PULL_REQUEST_IGNORE_BEFORE_CREATION_DATE, {
        required: false,
      }),
      pullRequestIgnoreDraft: core.getBooleanInput(EInputs.PULL_REQUEST_IGNORE_DRAFT, {
        required: false,
      }),
      pullRequestLimitApiMutationsCount: CoreInputsService.getNumberInput$$(
        EInputs.PULL_REQUEST_LIMIT_API_MUTATIONS_COUNT,
        {
          required: false,
        }
      ),
      pullRequestLimitApiQueriesCount: CoreInputsService.getNumberInput$$(
        EInputs.PULL_REQUEST_LIMIT_API_QUERIES_COUNT,
        {
          required: false,
        }
      ),
      pullRequestOnlyAnyAssignees: core.getMultilineInput(EInputs.PULL_REQUEST_ONLY_ANY_ASSIGNEES, {
        required: false,
      }),
      pullRequestOnlyAnyMilestones: core.getMultilineInput(EInputs.PULL_REQUEST_ONLY_ANY_MILESTONES, {
        required: false,
      }),
      pullRequestOnlyAnyProjectCards: core.getMultilineInput(EInputs.PULL_REQUEST_ONLY_ANY_PROJECT_CARDS, {
        required: false,
      }),
      pullRequestOnlyWithAssignees: core.getBooleanInput(EInputs.PULL_REQUEST_ONLY_WITH_ASSIGNEES, {
        required: false,
      }),
      pullRequestProcessing: core.getBooleanInput(EInputs.PULL_REQUEST_PROCESSING, { required: false }),
      pullRequestStaleComment: core.getInput(EInputs.PULL_REQUEST_STALE_COMMENT, { required: false }),
      pullRequestStaleLabel: core.getInput(EInputs.PULL_REQUEST_STALE_LABEL, { required: false }),
      pullRequestToDraftInsteadOfStale: core.getBooleanInput(EInputs.PULL_REQUEST_TO_DRAFT_INSTEAD_OF_STALE, {
        required: false,
      }),
    };

    return this.inputs$$;
  }
}
