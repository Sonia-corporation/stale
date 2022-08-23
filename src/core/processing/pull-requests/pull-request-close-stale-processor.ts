import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractCloseStaleProcessor } from '@core/processing/abstract-close-stale-processor';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to close a pull request
 */
export class PullRequestCloseStaleProcessor extends AbstractCloseStaleProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestsService$$: GithubApiPullRequestsService;
  public readonly pullRequestCommentsProcessor$$: PullRequestCommentsProcessor;
  public readonly githubApiPullRequestLabelsService$$: GithubApiPullRequestLabelsService;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
    this.githubApiPullRequestsService$$ = new GithubApiPullRequestsService(pullRequestProcessor);
    this.pullRequestCommentsProcessor$$ = new PullRequestCommentsProcessor(pullRequestProcessor);
    this.githubApiPullRequestLabelsService$$ = new GithubApiPullRequestLabelsService(pullRequestProcessor);
  }

  protected _processCloseComment(): Promise<void> {
    return this.pullRequestCommentsProcessor$$.processCloseComment();
  }

  protected _closeItem(itemId: Readonly<IUuid>): Promise<void> {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return this.githubApiPullRequestsService$$.closePullRequest(itemId, pullRequestsInputs.pullRequestCloseReason);
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    return this.githubApiPullRequestLabelsService$$.fetchLabelByName(labelName);
  }

  protected _getExtraLabelsName(): string[] {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestAddLabelsAfterClose;
  }

  protected async _addExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void> {
    await this.githubApiPullRequestLabelsService$$.addLabels(targetId, labelsId);
  }

  protected _increaseAddedLabelsCountStatistic(count: Readonly<number>): void {
    PullRequestsStatisticsService.getInstance().increaseAddedPullRequestsLabelsCount(count);
  }
}
