import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractStaleProcessor } from '@core/processing/abstract-stale-processor';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IUuid } from '@utils/types/uuid';

/**
 * @description
 * The processor to stale a pull request
 */
export class PullRequestStaleProcessor extends AbstractStaleProcessor<PullRequestProcessor> {
  public readonly githubApiPullRequestLabelsService$$: GithubApiPullRequestLabelsService;
  public readonly pullRequestCommentsProcessor$$: PullRequestCommentsProcessor;

  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
    this.githubApiPullRequestLabelsService$$ = new GithubApiPullRequestLabelsService(this.processor);
    this.pullRequestCommentsProcessor$$ = new PullRequestCommentsProcessor(this.processor);
  }

  protected _getDaysBeforeStale(): number {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestDaysBeforeStale;
  }

  protected _getStaleLabel(): string {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestStaleLabel;
  }

  protected _getItemId(): IUuid {
    return this.processor.item.id;
  }

  protected async _addLabel(targetId: Readonly<IUuid>, labelId: Readonly<IUuid>): Promise<void> {
    await this.githubApiPullRequestLabelsService$$.addLabel(targetId, labelId);
  }

  protected _processStaleComment(): Promise<void> {
    return this.pullRequestCommentsProcessor$$.processStaleComment();
  }

  protected _fetchLabelByName(labelName: Readonly<string>): Promise<IGithubApiLabel | null> {
    return this.githubApiPullRequestLabelsService$$.fetchLabelByName(labelName);
  }

  protected _getExtraLabelsToAddName(): string[] {
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    return pullRequestsInputs.pullRequestAddLabelsAfterStale;
  }

  protected _getExtraLabelsToRemoveName(): string[] {
    // @todo
    return [];
  }

  protected async _addExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void> {
    await this.githubApiPullRequestLabelsService$$.addLabels(targetId, labelsId);
  }

  protected async _removeExtraLabels(targetId: Readonly<IUuid>, labelsId: ReadonlyArray<IUuid>): Promise<void> {
    await this.githubApiPullRequestLabelsService$$.removeLabels(targetId, labelsId);
  }

  protected _increaseAddedLabelsCountStatistic(count: Readonly<number> = 1): void {
    PullRequestsStatisticsService.getInstance().increaseAddedPullRequestsLabelsCount(count);
  }

  protected _increaseRemovedLabelsCountStatistic(_count: Readonly<number> = 1): void {
    // @todo
  }
}
