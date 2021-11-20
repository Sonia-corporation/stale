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
  | 'Close issues';

export class StatisticsService {
  public static processedIssuesCount$$: number = 0;
  public static ignoredIssuesCount$$: number = 0;
  public static unalteredIssuesCount$$: number = 0;
  public static staleIssuesCount$$: number = 0;
  public static alreadyStaleIssuesCount$$: number = 0;
  public static removeStaleIssuesCount$$: number = 0;
  public static closeIssuesCount$$: number = 0;

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {StatisticsService} The service
   */
  public static initialize(): StatisticsService {
    StatisticsService.processedIssuesCount$$ = 0;
    StatisticsService.ignoredIssuesCount$$ = 0;
    StatisticsService.unalteredIssuesCount$$ = 0;
    StatisticsService.staleIssuesCount$$ = 0;
    StatisticsService.alreadyStaleIssuesCount$$ = 0;
    StatisticsService.removeStaleIssuesCount$$ = 0;
    StatisticsService.closeIssuesCount$$ = 0;

    return StatisticsService;
  }

  public static increaseProcessedIssuesCount(): StatisticsService {
    this.processedIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseIgnoredIssuesCount(): StatisticsService {
    this.ignoredIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseUnalteredIssuesCount(): StatisticsService {
    this.unalteredIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseStaleIssuesCount(): StatisticsService {
    this.staleIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseAlreadyStaleIssuesCount(): StatisticsService {
    this.alreadyStaleIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseRemoveStaleIssuesCount(): StatisticsService {
    this.removeStaleIssuesCount$$++;

    return StatisticsService;
  }

  public static increaseCloseIssuesCount(): StatisticsService {
    this.closeIssuesCount$$++;

    return StatisticsService;
  }

  public static logsAllStatistics(): StatisticsService {
    LoggerService.startGroup(`Statistics`);
    this._logsAllStatistics();
    LoggerService.endGroup();

    return StatisticsService;
  }

  private static _logsAllStatistics(): StatisticsService {
    const allStatistics: Map<IStat, number> = StatisticsService._getAllFilteredStatisticsMap();
    const lastStatistic: IStat | undefined = getMapLastKey(allStatistics);
    const longestStatisticLength: number = getMapLongestKey(allStatistics);

    allStatistics.forEach((count: Readonly<number>, statistic: Readonly<IStat>): void => {
      const prefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;

      this._log(prefix, _.padEnd(statistic, longestStatisticLength), count);
    });

    return StatisticsService;
  }

  private static _log(
    prefix: Readonly<ETreeRows>,
    statistic: Readonly<IStat | string>,
    count: Readonly<number>
  ): StatisticsService {
    LoggerService.info(
      LoggerFormatService.white(prefix),
      LoggerFormatService.whiteBright(statistic),
      LoggerService.value(count)
    );

    return StatisticsService;
  }

  private static _getAllStatisticsMap(): Map<IStat, number> {
    return new Map<IStat, number>()
      .set(`Processed issues`, StatisticsService.processedIssuesCount$$)
      .set(`Ignored issues`, StatisticsService.ignoredIssuesCount$$)
      .set(`Unaltered issues`, StatisticsService.unalteredIssuesCount$$)
      .set(`Stale issues`, StatisticsService.staleIssuesCount$$)
      .set(`Already stale issues`, StatisticsService.alreadyStaleIssuesCount$$)
      .set(`Remove stale issues`, StatisticsService.removeStaleIssuesCount$$)
      .set(`Close issues`, StatisticsService.closeIssuesCount$$);
  }

  private static _getAllFilteredStatisticsMap(): Map<IStat, number> {
    return mapFilter<IStat, number>(
      StatisticsService._getAllStatisticsMap(),
      ([_statistic, count]): boolean => count > 0
    );
  }
}
