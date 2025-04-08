import { AbstractInputsService } from '@core/inputs/abstract-inputs.service';
import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { getParsedCloseReason } from '@utils/close/get-parsed-close-reason';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Used to get the issues inputs coming from action
 */
export class IssuesInputsService extends AbstractInputsService<IIssuesInputs> {
  private static _instance: IssuesInputsService;

  public static getInstance(): IssuesInputsService {
    if (_.isNil(IssuesInputsService._instance)) {
      IssuesInputsService._instance = new IssuesInputsService();
    }

    return IssuesInputsService._instance;
  }

  protected readonly _inputsName: `issues` = `issues`;

  public setInputs(): IIssuesInputs {
    this.inputs$$ = {
      issueAddLabelsAfterClose: core.getMultilineInput(EInputs.ISSUE_ADD_LABELS_AFTER_CLOSE, { required: false }),
      issueAddLabelsAfterStale: core.getMultilineInput(EInputs.ISSUE_ADD_LABELS_AFTER_STALE, { required: false }),
      issueCloseComment: core.getInput(EInputs.ISSUE_CLOSE_COMMENT, { required: false }),
      issueCloseReason: CoreInputsService.getEnumInput$$(
        EInputs.ISSUE_CLOSE_REASON,
        getParsedCloseReason,
        ECloseReason.NOT_PLANNED,
        { required: false }
      ),
      issueDaysBeforeClose: CoreInputsService.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_CLOSE, { required: false }),
      issueDaysBeforeStale: CoreInputsService.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_STALE, { required: false }),
      issueIgnoreAllAssignees: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_ASSIGNEES, { required: false }),
      issueIgnoreAllLabels: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_LABELS, { required: false }),
      issueIgnoreAllMilestones: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_MILESTONES, { required: false }),
      issueIgnoreAllProjects: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_PROJECTS, { required: false }),
      issueIgnoreAnyAssignees: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_ASSIGNEES, { required: false }),
      issueIgnoreAnyLabels: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_LABELS, { required: false }),
      issueIgnoreAnyMilestones: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_MILESTONES, { required: false }),
      issueIgnoreAnyProjects: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_PROJECTS, { required: false }),
      issueIgnoreBeforeCreationDate: core.getInput(EInputs.ISSUE_IGNORE_BEFORE_CREATION_DATE, { required: false }),
      issueLimitApiMutationsCount: CoreInputsService.getNumberInput$$(EInputs.ISSUE_LIMIT_API_MUTATIONS_COUNT, {
        required: false,
      }),
      issueLimitApiQueriesCount: CoreInputsService.getNumberInput$$(EInputs.ISSUE_LIMIT_API_QUERIES_COUNT, {
        required: false,
      }),
      issueOnlyAnyAssignees: core.getMultilineInput(EInputs.ISSUE_ONLY_ANY_ASSIGNEES, { required: false }),
      issueOnlyAnyMilestones: core.getMultilineInput(EInputs.ISSUE_ONLY_ANY_MILESTONES, { required: false }),
      issueOnlyAnyProjects: core.getMultilineInput(EInputs.ISSUE_ONLY_ANY_PROJECTS, { required: false }),
      issueOnlyWithAssignees: core.getBooleanInput(EInputs.ISSUE_ONLY_WITH_ASSIGNEES, { required: false }),
      issueOnlyWithMilestones: core.getBooleanInput(EInputs.ISSUE_ONLY_WITH_MILESTONES, { required: false }),
      issueOnlyWithProjects: core.getBooleanInput(EInputs.ISSUE_ONLY_WITH_PROJECTS, { required: false }),
      issueProcessing: core.getBooleanInput(EInputs.ISSUE_PROCESSING, { required: false }),
      issueRemoveLabelsAfterClose: core.getMultilineInput(EInputs.ISSUE_REMOVE_LABELS_AFTER_CLOSE, { required: false }),
      issueRemoveLabelsAfterStale: core.getMultilineInput(EInputs.ISSUE_REMOVE_LABELS_AFTER_STALE, { required: false }),
      issueStaleComment: core.getInput(EInputs.ISSUE_STALE_COMMENT, { required: false }),
      issueStaleLabel: core.getInput(EInputs.ISSUE_STALE_LABEL, { required: false }),
    };

    return this.inputs$$;
  }
}
