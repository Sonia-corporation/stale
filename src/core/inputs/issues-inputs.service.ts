import { CoreInputsService } from '@core/inputs/core-inputs.service';
import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import * as core from '@actions/core';

/**
 * @description
 * Used to get the issues inputs coming from action
 */
export class IssuesInputsService {
  public static inputs$$: IIssuesInputs | undefined = undefined;

  public static initialize(): IssuesInputsService {
    IssuesInputsService.setInputs();
    IssuesInputsService.logInputs();

    return IssuesInputsService;
  }

  public static setInputs(): IIssuesInputs {
    IssuesInputsService.inputs$$ = {
      issueCloseComment: core.getInput(EInputs.ISSUE_CLOSE_COMMENT, { required: false }),
      issueDaysBeforeClose: CoreInputsService.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_CLOSE, { required: false }),
      issueDaysBeforeStale: CoreInputsService.getNumberInput$$(EInputs.ISSUE_DAYS_BEFORE_STALE, { required: false }),
      issueIgnoreAllAssignees: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_ASSIGNEES, { required: false }),
      issueIgnoreAllLabels: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_LABELS, { required: false }),
      issueIgnoreAllProjectCards: core.getBooleanInput(EInputs.ISSUE_IGNORE_ALL_PROJECT_CARDS, { required: false }),
      issueIgnoreAnyAssignees: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_ASSIGNEES, { required: false }),
      issueIgnoreAnyLabels: core.getMultilineInput(EInputs.ISSUE_IGNORE_ANY_LABELS, { required: false }),
      issueIgnoreBeforeCreationDate: core.getInput(EInputs.ISSUE_IGNORE_BEFORE_CREATION_DATE, { required: false }),
      issueStaleComment: core.getInput(EInputs.ISSUE_STALE_COMMENT, { required: false }),
      issueStaleLabel: core.getInput(EInputs.ISSUE_STALE_LABEL, { required: false }),
    };

    return IssuesInputsService.inputs$$;
  }

  public static logInputs(): IssuesInputsService {
    CoreInputsService.logInputs(`Issues inputs`, IssuesInputsService.getInputs());

    return IssuesInputsService;
  }

  public static getInputs(): IIssuesInputs | never {
    if (!IssuesInputsService.inputs$$) {
      throw new Error(`The issues inputs are unset`);
    }

    return IssuesInputsService.inputs$$;
  }
}
