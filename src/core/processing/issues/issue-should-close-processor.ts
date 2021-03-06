import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractShouldCloseProcessor } from '@core/processing/abstract-should-close-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';

/**
 * @description
 * The processor to check if a stale issue should be closed
 */
export class IssueShouldCloseProcessor extends AbstractShouldCloseProcessor<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  protected _getDaysBeforeClose(): number {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueDaysBeforeClose;
  }
}
