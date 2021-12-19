import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { getMapLastKey } from '@utils/maps/get-map-last-key';
import { getMapLongestKey } from '@utils/maps/get-map-longest-key';
import { mapFilter } from '@utils/maps/map-filter';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import _ from 'lodash';

export abstract class AbstractStatisticsService<TStatistic extends string> {
  /**
   * @description
   * The name of the statistics that will be stored inside this service
   * Used only for the logs
   * @type {string}
   */
  protected abstract readonly _statisticsName: string;

  /**
   * @description
   * Log the statistics from this service
   * @returns {AbstractStatisticsService} The service
   */
  public logsAllStatistics(): AbstractStatisticsService<TStatistic> {
    LoggerService.startGroup(`${_.upperFirst(this._statisticsName)} statistics`);
    this._logsAllStatistics();
    LoggerService.endGroup();

    return this;
  }

  /**
   * @description
   * Internal logger to humanized and improve the logs when logging them all
   * @returns {AbstractStatisticsService} The service
   * @private
   */
  private _logsAllStatistics(): AbstractStatisticsService<TStatistic> {
    const allStatistics: Map<TStatistic, number> = this._getAllFilteredStatisticsMap();
    const lastStatistic: TStatistic | undefined = getMapLastKey(allStatistics);
    const longestStatisticLength: number = getMapLongestKey(allStatistics);

    allStatistics.forEach((count: Readonly<number>, statistic: TStatistic): void => {
      const prefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;

      this._log(prefix, _.padEnd(statistic, longestStatisticLength), count);
    });

    return this;
  }

  /**
   * @description
   * Log a single statistic
   * @template TStatistic
   * @param {Readonly<ETreeRows>} prefix The prefix of the statistic name as a tree row
   * @param {Readonly<string | TStatistic>} statistic The name of the statistic
   * @param {Readonly<number>} count The statistic count
   * @returns {AbstractStatisticsService} The service
   * @private
   */
  private _log(
    prefix: Readonly<ETreeRows>,
    statistic: Readonly<TStatistic | string>,
    count: Readonly<number>
  ): AbstractStatisticsService<TStatistic> {
    LoggerService.info(
      LoggerFormatService.white(prefix),
      LoggerFormatService.whiteBright(statistic),
      LoggerService.value(count)
    );

    return this;
  }

  /**
   * @description
   * Get the map of filtered statistics excluding all bellow 1
   * @template TStatistic
   * @returns {Map<TStatistic, number>} The filtered map of statistics
   * @private
   */
  private _getAllFilteredStatisticsMap(): Map<TStatistic, number> {
    return mapFilter<TStatistic, number>(this._getAllStatisticsMap(), ([_statistic, count]): boolean => count > 0);
  }

  /**
   * @description
   * Only used for the tests to reset the state
   * @returns {AbstractStatisticsService} The service
   */
  public abstract initialize(): AbstractStatisticsService<TStatistic>;

  /**
   * @description
   * Get all the statistics as a map
   * @template TStatistic
   * @returns {Map<TStatistic, number>} The map of statistics
   * @protected
   */
  protected abstract _getAllStatisticsMap(): Map<TStatistic, number>;
}
