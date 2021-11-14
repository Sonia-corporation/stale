import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';

/**
 * @description
 * The processor to check if an issue is stale
 */
export class IssueIsStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public isStale(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue is already stale...`);

    const staleLabel: IGithubApiLabel | undefined = this._getStaleLabel();

    if (staleLabel) {
      this.issueProcessor.logger.info(`The stale label is already added on this issue`);

      return true;
    }

    this.issueProcessor.logger.info(`The stale label is not yet on this issue`);

    return false;
  }

  private _getStaleLabel(): IGithubApiLabel | undefined {
    const { issueStaleLabel } = InputsService.getInputs();

    return this.issueProcessor.githubIssue.labels.nodes.find(
      (label: Readonly<IGithubApiLabel>): boolean => label.name === issueStaleLabel
    );
  }
}
