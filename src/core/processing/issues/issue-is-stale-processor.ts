import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractIsStaleProcessor } from '@core/processing/abstract-is-stale-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

/**
 * @description
 * The processor to check if an issue is stale
 */
export class IssueIsStaleProcessor extends AbstractIsStaleProcessor<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  protected _getInputStaleLabel(): string {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueStaleLabel;
  }

  protected _getLabels(): IGithubApiLabel[] {
    return this.processor.item.labels.nodes;
  }
}
