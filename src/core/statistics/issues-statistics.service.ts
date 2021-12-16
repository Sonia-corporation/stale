import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { getMapLastKey } from '@utils/maps/get-map-last-key';
import { getMapLongestKey } from '@utils/maps/get-map-longest-key';
import { mapFilter } from '@utils/maps/map-filter';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
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

export class IssuesStatisticsService {
  public static processedIssuesCount$$: number = 0;
  public static ignoredIssuesCount$$: number = 0;
  public static unalteredIssuesCount$$: number = 0;
  public static staleIssuesCount$$: number = 0;
  public static alreadyStaleIssuesCount$$: number = 0;
  public static removeStaleIssuesCount$$: number = 0;
  public static closedIssuesCount$$: number = 0;
  public static addedIssuesCommentsCount$$: number = 0;

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {IssuesStatisticsService} The service
   */
  public static initialize(): IssuesStatisticsService {
    IssuesStatisticsService.processedIssuesCount$$ = 0;
    IssuesStatisticsService.ignoredIssuesCount$$ = 0;
    IssuesStatisticsService.unalteredIssuesCount$$ = 0;
    IssuesStatisticsService.staleIssuesCount$$ = 0;
    IssuesStatisticsService.alreadyStaleIssuesCount$$ = 0;
    IssuesStatisticsService.removeStaleIssuesCount$$ = 0;
    IssuesStatisticsService.closedIssuesCount$$ = 0;
    IssuesStatisticsService.addedIssuesCommentsCount$$ = 0;

    return IssuesStatisticsService;
  }

  public static increaseProcessedIssuesCount(): IssuesStatisticsService {
    this.processedIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseIgnoredIssuesCount(): IssuesStatisticsService {
    this.ignoredIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseUnalteredIssuesCount(): IssuesStatisticsService {
    this.unalteredIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseStaleIssuesCount(): IssuesStatisticsService {
    this.staleIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseAlreadyStaleIssuesCount(): IssuesStatisticsService {
    this.alreadyStaleIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseRemoveStaleIssuesCount(): IssuesStatisticsService {
    this.removeStaleIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseClosedIssuesCount(): IssuesStatisticsService {
    this.closedIssuesCount$$++;

    return IssuesStatisticsService;
  }

  public static increaseAddedIssuesCommentsCount(): IssuesStatisticsService {
    this.addedIssuesCommentsCount$$++;

    return IssuesStatisticsService;
  }

  public static logsAllStatistics(): IssuesStatisticsService {
    LoggerService.startGroup(`Statistics`);
    this._logsAllStatistics();
    LoggerService.endGroup();

    return IssuesStatisticsService;
  }

  private static _logsAllStatistics(): IssuesStatisticsService {
    const allStatistics: Map<IStat, number> = IssuesStatisticsService._getAllFilteredStatisticsMap();
    const lastStatistic: IStat | undefined = getMapLastKey(allStatistics);
    const longestStatisticLength: number = getMapLongestKey(allStatistics);

    allStatistics.forEach((count: Readonly<number>, statistic: Readonly<IStat>): void => {
      const prefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;

      this._log(prefix, _.padEnd(statistic, longestStatisticLength), count);
    });

    return IssuesStatisticsService;
  }

  private static _log(
    prefix: Readonly<ETreeRows>,
    statistic: Readonly<IStat | string>,
    count: Readonly<number>
  ): IssuesStatisticsService {
    LoggerService.info(
      LoggerFormatService.white(prefix),
      LoggerFormatService.whiteBright(statistic),
      LoggerService.value(count)
    );

    return IssuesStatisticsService;
  }

  private static _getAllStatisticsMap(): Map<IStat, number> {
    return new Map<IStat, number>()
      .set(`Processed issues`, IssuesStatisticsService.processedIssuesCount$$)
      .set(`Ignored issues`, IssuesStatisticsService.ignoredIssuesCount$$)
      .set(`Unaltered issues`, IssuesStatisticsService.unalteredIssuesCount$$)
      .set(`Stale issues`, IssuesStatisticsService.staleIssuesCount$$)
      .set(`Already stale issues`, IssuesStatisticsService.alreadyStaleIssuesCount$$)
      .set(`Remove stale issues`, IssuesStatisticsService.removeStaleIssuesCount$$)
      .set(`Closed issues`, IssuesStatisticsService.closedIssuesCount$$)
      .set(`Added issues comments`, IssuesStatisticsService.addedIssuesCommentsCount$$);
  }

  private static _getAllFilteredStatisticsMap(): Map<IStat, number> {
    return mapFilter<IStat, number>(
      IssuesStatisticsService._getAllStatisticsMap(),
      ([_statistic, count]): boolean => count > 0
    );
  }
}
