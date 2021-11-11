import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { DateTime } from 'luxon';

// Days
const NUMBER_OF_DAYS_BEFORE_STALE = 30;

export class IssueStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldStale(): boolean {
    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    const label: IGithubApiGetLabel = await GithubApiLabelsService.fetchLabelByName(
      InputsService.getInputs().issueStaleLabel
    );

    await GithubApiLabelsService.addLabelToIssue(
      this.issueProcessor.githubIssue.id,
      label.repository.labels.nodes[0].id
    );
  }

  public isStaleByUpdateDate$$(): boolean {
    const updatedAt: DateTime = this.issueProcessor.getUpdatedAt();

    return (
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days > NUMBER_OF_DAYS_BEFORE_STALE
    );
  }
}
