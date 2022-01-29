import { AbstractStatisticsService } from '@core/statistics/abstract-statistics.service';
import _ from 'lodash';

type IStat =
  | 'Processed issues'
  | 'Ignored issues'
  | 'Stale issues'
  | 'Remove stale issues'
  | 'Already stale issues'
  | 'Unaltered issues'
  | 'Closed issues'
  | 'Added issues comments'
  | 'Added issues labels'
  | 'Called API issues'
  | 'Called API issues queries'
  | 'Called API issues mutations';

export class IssuesStatisticsService extends AbstractStatisticsService<IStat> {
  private static _instance: IssuesStatisticsService;

  public static getInstance(): IssuesStatisticsService {
    if (_.isNil(IssuesStatisticsService._instance)) {
      IssuesStatisticsService._instance = new IssuesStatisticsService();
    }

    return IssuesStatisticsService._instance;
  }

  public addedIssuesCommentsCount: number = 0;
  public addedIssuesLabelsCount: number = 0;
  public alreadyStaleIssuesCount: number = 0;
  public calledApiIssuesMutationsCount: number = 0;
  public calledApiIssuesQueriesCount: number = 0;
  public closedIssuesCount: number = 0;
  public ignoredIssuesCount: number = 0;
  public processedIssuesCount: number = 0;
  public removeStaleIssuesCount: number = 0;
  public staleIssuesCount: number = 0;
  public unalteredIssuesCount: number = 0;
  protected readonly _statisticsName: 'issues' = `issues`;

  public get calledApiIssuesCount(): number {
    return this.calledApiIssuesQueriesCount + this.calledApiIssuesMutationsCount;
  }

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {IssuesStatisticsService} The service
   */
  public initialize(): IssuesStatisticsService {
    this.addedIssuesCommentsCount = 0;
    this.addedIssuesLabelsCount = 0;
    this.alreadyStaleIssuesCount = 0;
    this.calledApiIssuesMutationsCount = 0;
    this.calledApiIssuesQueriesCount = 0;
    this.closedIssuesCount = 0;
    this.ignoredIssuesCount = 0;
    this.processedIssuesCount = 0;
    this.removeStaleIssuesCount = 0;
    this.staleIssuesCount = 0;
    this.unalteredIssuesCount = 0;

    return this;
  }

  public increaseProcessedIssuesCount(): IssuesStatisticsService {
    this.processedIssuesCount++;
    this._logIncreaseCount(`Processed issues count statistic increased by`, 1, this.processedIssuesCount);

    return this;
  }

  public increaseIgnoredIssuesCount(): IssuesStatisticsService {
    this.ignoredIssuesCount++;
    this._logIncreaseCount(`Ignored issues count statistic increased by`, 1, this.ignoredIssuesCount);

    return this;
  }

  public increaseUnalteredIssuesCount(): IssuesStatisticsService {
    this.unalteredIssuesCount++;
    this._logIncreaseCount(`Unaltered issues count statistic increased by`, 1, this.unalteredIssuesCount);

    return this;
  }

  public increaseStaleIssuesCount(): IssuesStatisticsService {
    this.staleIssuesCount++;
    this._logIncreaseCount(`Stale issues count statistic increased by`, 1, this.staleIssuesCount);

    return this;
  }

  public increaseAlreadyStaleIssuesCount(): IssuesStatisticsService {
    this.alreadyStaleIssuesCount++;
    this._logIncreaseCount(`Already stale issues count statistic increased by`, 1, this.alreadyStaleIssuesCount);

    return this;
  }

  public increaseRemoveStaleIssuesCount(): IssuesStatisticsService {
    this.removeStaleIssuesCount++;
    this._logIncreaseCount(`Remove stale issues count statistic increased by`, 1, this.removeStaleIssuesCount);

    return this;
  }

  public increaseClosedIssuesCount(): IssuesStatisticsService {
    this.closedIssuesCount++;
    this._logIncreaseCount(`Closed issues count statistic increased by`, 1, this.closedIssuesCount);

    return this;
  }

  public increaseAddedIssuesCommentsCount(): IssuesStatisticsService {
    this.addedIssuesCommentsCount++;
    this._logIncreaseCount(`Added issues comments count statistic increased by`, 1, this.addedIssuesCommentsCount);

    return this;
  }

  public increaseAddedIssuesLabelsCount(count: Readonly<number> = 1): IssuesStatisticsService {
    this.addedIssuesLabelsCount += count;
    this._logIncreaseCount(`Added issues labels count statistic increased by`, count, this.addedIssuesLabelsCount);

    return this;
  }

  public increaseCalledApiIssuesQueriesCount(): IssuesStatisticsService {
    this.calledApiIssuesQueriesCount++;
    this._logIncreaseCount(
      `Called API issues queries count statistic increased by`,
      1,
      this.calledApiIssuesQueriesCount
    );

    return this;
  }

  public increaseCalledApiIssuesMutationsCount(): IssuesStatisticsService {
    this.calledApiIssuesMutationsCount++;
    this._logIncreaseCount(
      `Called API issues mutations count statistic increased by`,
      1,
      this.calledApiIssuesMutationsCount
    );

    return this;
  }

  protected _getAllStatisticsMap(): Map<IStat, Map<IStat, number> | number> {
    return new Map<IStat, Map<IStat, number> | number>()
      .set(`Processed issues`, this.processedIssuesCount)
      .set(`Ignored issues`, this.ignoredIssuesCount)
      .set(`Unaltered issues`, this.unalteredIssuesCount)
      .set(`Stale issues`, this.staleIssuesCount)
      .set(`Already stale issues`, this.alreadyStaleIssuesCount)
      .set(`Remove stale issues`, this.removeStaleIssuesCount)
      .set(`Closed issues`, this.closedIssuesCount)
      .set(`Added issues comments`, this.addedIssuesCommentsCount)
      .set(`Added issues labels`, this.addedIssuesLabelsCount)
      .set(
        `Called API issues`,
        new Map<IStat, number>()
          .set(`Called API issues queries`, this.calledApiIssuesQueriesCount)
          .set(`Called API issues mutations`, this.calledApiIssuesMutationsCount)
      );
  }
}
