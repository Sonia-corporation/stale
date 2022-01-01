import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractShouldCloseStaleProcessor } from '@core/processing/abstract-should-close-stale-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';

/**
 * @description
 * The processor to check if a stale issue should be closed
 */
export class IssueShouldCloseStaleProcessor extends AbstractShouldCloseStaleProcessor<IssueProcessor> {
  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    super(issueProcessor);
  }

  protected _getDaysBeforeClose(): number {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueDaysBeforeClose;
  }
}
