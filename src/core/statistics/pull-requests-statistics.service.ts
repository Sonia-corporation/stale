import { AbstractStatisticsService } from '@core/statistics/abstract-statistics.service';
import _ from 'lodash';

type IStat =
  | 'Processed pull requests'
  | 'Ignored pull requests'
  | 'Stale pull requests'
  | 'Remove stale pull requests'
  | 'Already stale pull requests'
  | 'Unaltered pull requests'
  | 'Closed pull requests'
  | 'Deleted pull requests branches'
  | 'Added pull requests comments';

export class PullRequestsStatisticsService extends AbstractStatisticsService<IStat> {
  private static _instance: PullRequestsStatisticsService;

  public static getInstance(): PullRequestsStatisticsService {
    if (_.isNil(PullRequestsStatisticsService._instance)) {
      PullRequestsStatisticsService._instance = new PullRequestsStatisticsService();
    }

    return PullRequestsStatisticsService._instance;
  }

  public processedPullRequestsCount$$: number = 0;
  public ignoredPullRequestsCount$$: number = 0;
  public unalteredPullRequestsCount$$: number = 0;
  public stalePullRequestsCount$$: number = 0;
  public alreadyStalePullRequestsCount$$: number = 0;
  public removeStalePullRequestsCount$$: number = 0;
  public closedPullRequestsCount$$: number = 0;
  public deletedPullRequestsBranchesCount$$: number = 0;
  public addedPullRequestsCommentsCount$$: number = 0;
  protected readonly _statisticsName: 'pull requests' = `pull requests`;

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {PullRequestsStatisticsService} The service
   */
  public initialize(): PullRequestsStatisticsService {
    this.processedPullRequestsCount$$ = 0;
    this.ignoredPullRequestsCount$$ = 0;
    this.unalteredPullRequestsCount$$ = 0;
    this.stalePullRequestsCount$$ = 0;
    this.alreadyStalePullRequestsCount$$ = 0;
    this.removeStalePullRequestsCount$$ = 0;
    this.closedPullRequestsCount$$ = 0;
    this.deletedPullRequestsBranchesCount$$ = 0;
    this.addedPullRequestsCommentsCount$$ = 0;

    return this;
  }

  public increaseProcessedPullRequestsCount(): PullRequestsStatisticsService {
    this.processedPullRequestsCount$$++;

    return this;
  }

  public increaseIgnoredPullRequestsCount(): PullRequestsStatisticsService {
    this.ignoredPullRequestsCount$$++;

    return this;
  }

  public increaseUnalteredPullRequestsCount(): PullRequestsStatisticsService {
    this.unalteredPullRequestsCount$$++;

    return this;
  }

  public increaseStalePullRequestsCount(): PullRequestsStatisticsService {
    this.stalePullRequestsCount$$++;

    return this;
  }

  public increaseAlreadyStalePullRequestsCount(): PullRequestsStatisticsService {
    this.alreadyStalePullRequestsCount$$++;

    return this;
  }

  public increaseRemoveStalePullRequestsCount(): PullRequestsStatisticsService {
    this.removeStalePullRequestsCount$$++;

    return this;
  }

  public increaseClosedPullRequestsCount(): PullRequestsStatisticsService {
    this.closedPullRequestsCount$$++;

    return this;
  }

  public increaseDeletedPullRequestsBranchesCount(): PullRequestsStatisticsService {
    this.deletedPullRequestsBranchesCount$$++;

    return this;
  }

  public increaseAddedPullRequestsCommentsCount(): PullRequestsStatisticsService {
    this.addedPullRequestsCommentsCount$$++;

    return this;
  }

  protected _getAllStatisticsMap(): Map<IStat, number> {
    return new Map<IStat, number>()
      .set(`Processed pull requests`, this.processedPullRequestsCount$$)
      .set(`Ignored pull requests`, this.ignoredPullRequestsCount$$)
      .set(`Unaltered pull requests`, this.unalteredPullRequestsCount$$)
      .set(`Stale pull requests`, this.stalePullRequestsCount$$)
      .set(`Already stale pull requests`, this.alreadyStalePullRequestsCount$$)
      .set(`Remove stale pull requests`, this.removeStalePullRequestsCount$$)
      .set(`Closed pull requests`, this.closedPullRequestsCount$$)
      .set(`Deleted pull requests branches`, this.deletedPullRequestsBranchesCount$$)
      .set(`Added pull requests comments`, this.addedPullRequestsCommentsCount$$);
  }
}
