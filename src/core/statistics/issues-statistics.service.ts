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
  | 'Added issues comments';

export class IssuesStatisticsService extends AbstractStatisticsService<IStat> {
  private static _instance: IssuesStatisticsService;

  public static getInstance(): IssuesStatisticsService {
    if (_.isNil(IssuesStatisticsService._instance)) {
      IssuesStatisticsService._instance = new IssuesStatisticsService();
    }

    return IssuesStatisticsService._instance;
  }

  public processedIssuesCount$$: number = 0;
  public ignoredIssuesCount$$: number = 0;
  public unalteredIssuesCount$$: number = 0;
  public staleIssuesCount$$: number = 0;
  public alreadyStaleIssuesCount$$: number = 0;
  public removeStaleIssuesCount$$: number = 0;
  public closedIssuesCount$$: number = 0;
  public addedIssuesCommentsCount$$: number = 0;
  protected readonly _statisticsName: 'issues' = `issues`;

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {IssuesStatisticsService} The service
   */
  public initialize(): IssuesStatisticsService {
    this.processedIssuesCount$$ = 0;
    this.ignoredIssuesCount$$ = 0;
    this.unalteredIssuesCount$$ = 0;
    this.staleIssuesCount$$ = 0;
    this.alreadyStaleIssuesCount$$ = 0;
    this.removeStaleIssuesCount$$ = 0;
    this.closedIssuesCount$$ = 0;
    this.addedIssuesCommentsCount$$ = 0;

    return this;
  }

  public increaseProcessedIssuesCount(): IssuesStatisticsService {
    this.processedIssuesCount$$++;

    return this;
  }

  public increaseIgnoredIssuesCount(): IssuesStatisticsService {
    this.ignoredIssuesCount$$++;

    return this;
  }

  public increaseUnalteredIssuesCount(): IssuesStatisticsService {
    this.unalteredIssuesCount$$++;

    return this;
  }

  public increaseStaleIssuesCount(): IssuesStatisticsService {
    this.staleIssuesCount$$++;

    return this;
  }

  public increaseAlreadyStaleIssuesCount(): IssuesStatisticsService {
    this.alreadyStaleIssuesCount$$++;

    return this;
  }

  public increaseRemoveStaleIssuesCount(): IssuesStatisticsService {
    this.removeStaleIssuesCount$$++;

    return this;
  }

  public increaseClosedIssuesCount(): IssuesStatisticsService {
    this.closedIssuesCount$$++;

    return this;
  }

  public increaseAddedIssuesCommentsCount(): IssuesStatisticsService {
    this.addedIssuesCommentsCount$$++;

    return this;
  }

  protected _getAllStatisticsMap(): Map<IStat, number> {
    return new Map<IStat, number>()
      .set(`Processed issues`, this.processedIssuesCount$$)
      .set(`Ignored issues`, this.ignoredIssuesCount$$)
      .set(`Unaltered issues`, this.unalteredIssuesCount$$)
      .set(`Stale issues`, this.staleIssuesCount$$)
      .set(`Already stale issues`, this.alreadyStaleIssuesCount$$)
      .set(`Remove stale issues`, this.removeStaleIssuesCount$$)
      .set(`Closed issues`, this.closedIssuesCount$$)
      .set(`Added issues comments`, this.addedIssuesCommentsCount$$);
  }
}
