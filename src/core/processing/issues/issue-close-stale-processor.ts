import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractCloseStaleProcessor } from '@core/processing/abstract-close-stale-processor';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to close an issue
 */
export class IssueCloseStaleProcessor extends AbstractCloseStaleProcessor<IssueProcessor> {
  public readonly githubApiIssuesService$$: GithubApiIssuesService;
  public readonly issueCommentsProcessor$$: IssueCommentsProcessor;
  public readonly githubApiIssueLabelsService$$: GithubApiIssueLabelsService;

  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
    this.githubApiIssuesService$$ = new GithubApiIssuesService(issueProcessor);
    this.issueCommentsProcessor$$ = new IssueCommentsProcessor(issueProcessor);
    this.githubApiIssueLabelsService$$ = new GithubApiIssueLabelsService(issueProcessor);
  }

  protected _closeItem(itemId: Readonly<IUuid>): Promise<void> {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return this.githubApiIssuesService$$.closeIssue(itemId, issuesInputs.issueCloseReason);
  }

  protected _processCloseComment(): Promise<void> {
    return this.issueCommentsProcessor$$.processCloseComment();
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    return this.githubApiIssueLabelsService$$.fetchLabelByName(labelName);
  }

  protected _getExtraLabelsName(): string[] {
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    return issuesInputs.issueAddLabelsAfterClose;
  }

  protected async _addExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void> {
    await this.githubApiIssueLabelsService$$.addLabels(targetId, labelsId);
  }

  protected _increaseAddedLabelsCountStatistic(count: Readonly<number>): void {
    IssuesStatisticsService.getInstance().increaseAddedIssuesLabelsCount(count);
  }
}
