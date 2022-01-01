import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractStaleProcessor } from '@core/processing/abstract-stale-processor';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to stale an issue
 */
export class IssueStaleProcessor extends AbstractStaleProcessor<IssueProcessor> {
  public readonly githubApiIssueLabelsService$$: GithubApiIssueLabelsService;

  public readonly issueCommentsProcessor$$: IssueCommentsProcessor;
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
    this.githubApiIssueLabelsService$$ = new GithubApiIssueLabelsService(issueProcessor);
    this.issueCommentsProcessor$$ = new IssueCommentsProcessor(issueProcessor);
  }

  protected _getDaysBeforeStale(): number {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueDaysBeforeStale;
  }

  protected _getStaleLabel(): string {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueStaleLabel;
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected _addLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> {
    return this.githubApiIssueLabelsService$$.addLabel(targetId, labelId);
  }

  protected _processStaleComment(): Promise<void> {
    return this.issueCommentsProcessor$$.processStaleComment();
  }

  protected _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    return this.githubApiIssueLabelsService$$.fetchLabelByName(labelName);
  }
}
