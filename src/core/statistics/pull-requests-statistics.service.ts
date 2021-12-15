import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { getMapLastKey } from '@utils/maps/get-map-last-key';
import { getMapLongestKey } from '@utils/maps/get-map-longest-key';
import { mapFilter } from '@utils/maps/map-filter';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import _ from 'lodash';

type IStat =
  | 'Processed pull requests'
  | 'Ignored pull requests'
  | 'Stale pull requests'
  | 'Remove stale pull requests'
  | 'Already stale pull requests'
  | 'Unaltered pull requests'
  | 'Closed pull requests'
  | 'Added pull requests comments';

export class PullRequestsStatisticsService {
  public static processedPullRequestsCount$$: number = 0;
  public static ignoredPullRequestsCount$$: number = 0;
  public static unalteredPullRequestsCount$$: number = 0;
  public static stalePullRequestsCount$$: number = 0;
  public static alreadyStalePullRequestsCount$$: number = 0;
  public static removeStalePullRequestsCount$$: number = 0;
  public static closedPullRequestsCount$$: number = 0;
  public static addedPullRequestsCommentsCount$$: number = 0;

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {PullRequestsStatisticsService} The service
   */
  public static initialize(): PullRequestsStatisticsService {
    PullRequestsStatisticsService.processedPullRequestsCount$$ = 0;
    PullRequestsStatisticsService.ignoredPullRequestsCount$$ = 0;
    PullRequestsStatisticsService.unalteredPullRequestsCount$$ = 0;
    PullRequestsStatisticsService.stalePullRequestsCount$$ = 0;
    PullRequestsStatisticsService.alreadyStalePullRequestsCount$$ = 0;
    PullRequestsStatisticsService.removeStalePullRequestsCount$$ = 0;
    PullRequestsStatisticsService.closedPullRequestsCount$$ = 0;
    PullRequestsStatisticsService.addedPullRequestsCommentsCount$$ = 0;

    return PullRequestsStatisticsService;
  }

  public static increaseProcessedPullRequestsCount(): PullRequestsStatisticsService {
    this.processedPullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseIgnoredPullRequestsCount(): PullRequestsStatisticsService {
    this.ignoredPullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseUnalteredPullRequestsCount(): PullRequestsStatisticsService {
    this.unalteredPullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseStalePullRequestsCount(): PullRequestsStatisticsService {
    this.stalePullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseAlreadyStalePullRequestsCount(): PullRequestsStatisticsService {
    this.alreadyStalePullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseRemoveStalePullRequestsCount(): PullRequestsStatisticsService {
    this.removeStalePullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseClosedPullRequestsCount(): PullRequestsStatisticsService {
    this.closedPullRequestsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static increaseAddedPullRequestsCommentsCount(): PullRequestsStatisticsService {
    this.addedPullRequestsCommentsCount$$++;

    return PullRequestsStatisticsService;
  }

  public static logsAllStatistics(): PullRequestsStatisticsService {
    LoggerService.startGroup(`Statistics`);
    this._logsAllStatistics();
    LoggerService.endGroup();

    return PullRequestsStatisticsService;
  }

  private static _logsAllStatistics(): PullRequestsStatisticsService {
    const allStatistics: Map<IStat, number> = PullRequestsStatisticsService._getAllFilteredStatisticsMap();
    const lastStatistic: IStat | undefined = getMapLastKey(allStatistics);
    const longestStatisticLength: number = getMapLongestKey(allStatistics);

    allStatistics.forEach((count: Readonly<number>, statistic: Readonly<IStat>): void => {
      const prefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;

      this._log(prefix, _.padEnd(statistic, longestStatisticLength), count);
    });

    return PullRequestsStatisticsService;
  }

  private static _log(
    prefix: Readonly<ETreeRows>,
    statistic: Readonly<IStat | string>,
    count: Readonly<number>
  ): PullRequestsStatisticsService {
    LoggerService.info(
      LoggerFormatService.white(prefix),
      LoggerFormatService.whiteBright(statistic),
      LoggerService.value(count)
    );

    return PullRequestsStatisticsService;
  }

  private static _getAllStatisticsMap(): Map<IStat, number> {
    return new Map<IStat, number>()
      .set(`Processed pull requests`, PullRequestsStatisticsService.processedPullRequestsCount$$)
      .set(`Ignored pull requests`, PullRequestsStatisticsService.ignoredPullRequestsCount$$)
      .set(`Unaltered pull requests`, PullRequestsStatisticsService.unalteredPullRequestsCount$$)
      .set(`Stale pull requests`, PullRequestsStatisticsService.stalePullRequestsCount$$)
      .set(`Already stale pull requests`, PullRequestsStatisticsService.alreadyStalePullRequestsCount$$)
      .set(`Remove stale pull requests`, PullRequestsStatisticsService.removeStalePullRequestsCount$$)
      .set(`Closed pull requests`, PullRequestsStatisticsService.closedPullRequestsCount$$)
      .set(`Added pull requests comments`, PullRequestsStatisticsService.addedPullRequestsCommentsCount$$);
  }

  private static _getAllFilteredStatisticsMap(): Map<IStat, number> {
    return mapFilter<IStat, number>(
      PullRequestsStatisticsService._getAllStatisticsMap(),
      ([_statistic, count]): boolean => count > 0
    );
  }
}
