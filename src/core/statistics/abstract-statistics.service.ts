import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { getMapLastKey } from '@utils/maps/get-map-last-key';
import { getMapLongestKey } from '@utils/maps/get-map-longest-key';
import { mapFilter } from '@utils/maps/map-filter';
import { isFiniteNumber } from '@utils/numbers/is-finite-number';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import _ from 'lodash';

export abstract class AbstractStatisticsService<TStatistic extends string> {
  /**
   * @description
   * The name of the statistics that will be stored inside this service
   * Used only for the logs
   * @type {'issues' | 'pull requests'}
   * @protected
   */
  protected abstract readonly _statisticsName: 'issues' | 'pull requests';

  /**
   * @description
   * Log the statistics from this service
   * @template TStatistic
   * @returns {AbstractStatisticsService<TStatistic>} The service
   */
  public logsAllStatistics(): AbstractStatisticsService<TStatistic> {
    LoggerService.startGroup(`${_.upperFirst(this._statisticsName)} statistics`);
    this._logsAllStatistics();
    LoggerService.endGroup();

    return this;
  }

  /**
   * @description
   * Log the value of a new statistic and also show the new total count
   * @template TStatistic
   * @param {Readonly<string>} statistic The name of the increased statistic
   * @param {Readonly<number>} count The count increase
   * @param {Readonly<number>} totalCount The new total count
   * @returns {AbstractStatisticsService<TStatistic>} The service
   * @protected
   */
  protected _logIncreaseCount(
    statistic: Readonly<string>,
    count: Readonly<number>,
    totalCount: Readonly<number>
  ): AbstractStatisticsService<TStatistic> {
    LoggerService.info(
      LoggerFormatService.whiteBright(statistic),
      LoggerService.value(count),
      LoggerFormatService.whiteBright(`(${LoggerService.value(totalCount)}`),
      LoggerFormatService.whiteBright(`in total)`)
    );

    return this;
  }

  /**
   * @description
   * Internal logger to humanized and improve the logs when logging them all
   * @template TStatistic
   * @returns {AbstractStatisticsService<TStatistic>} The service
   * @private
   */
  private _logsAllStatistics(): AbstractStatisticsService<TStatistic> {
    const allStatistics: Map<TStatistic, Map<TStatistic, number> | number> = this._getAllFilteredStatisticsMaps();

    this._logStatisticsMap(allStatistics);

    return this;
  }

  /**
   * @description
   * Log the statistics for a map
   * @template TStatistic
   * @param {Readonly<Map<TStatistic, Map<TStatistic, number> | number>>} statisticsMap The map of statistics to log
   * @private
   */
  private _logStatisticsMap(statisticsMap: Readonly<Map<TStatistic, Map<TStatistic, number> | number>>): void {
    const lastStatistic: TStatistic | undefined = getMapLastKey(statisticsMap);
    const longestStatisticLength: number = getMapLongestKey(statisticsMap);

    statisticsMap.forEach((data: Readonly<Map<TStatistic, number> | number>, statistic: TStatistic): void => {
      const prefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;
      const count: number = isFiniteNumber(data) ? data : this._getStatisticsMapCount(data);

      this._log(prefix, _.padEnd(statistic, longestStatisticLength), count);

      // Data is a map - we need to add a level
      if (!isFiniteNumber(data)) {
        // We will beforehand exclude the count lower than 1
        this._logStatisticsSubMap(this._getAllFilteredStatisticsMap(data), prefix);
      }
    });
  }

  /**
   * @description
   * Log the statistics for a sub map recursively
   * @template TStatistic
   * @param {Readonly<Map<TStatistic, number>>} statisticsMap The map of statistics to log
   * @param {Readonly<ETreeRows>} prefix The parent statistic prefix
   * @private
   */
  private _logStatisticsSubMap(statisticsMap: Readonly<Map<TStatistic, number>>, prefix: Readonly<ETreeRows>): void {
    const lastStatistic: TStatistic | undefined = getMapLastKey(statisticsMap);
    const longestStatisticLength: number = getMapLongestKey(statisticsMap);

    statisticsMap.forEach((count: Readonly<number>, statistic: TStatistic): void => {
      const parentPrefix: string = prefix === ETreeRows.LAST ? `    ` : `${ETreeRows.EMPTY} `;
      const subPrefix: ETreeRows = statistic === lastStatistic ? ETreeRows.LAST : ETreeRows.ANY;

      this._log(`${parentPrefix}${subPrefix}`, _.padEnd(statistic, longestStatisticLength), count);
    });
  }

  /**
   * @description
   * Return the sum for the given statistics
   * @template TStatistic
   * @param {Readonly<Map<TStatistic, number>>} statisticsMap The map of statistics to sum
   * @returns {number} The sum of the statistics
   * @private
   */
  private _getStatisticsMapCount(statisticsMap: Readonly<Map<TStatistic, number>>): number {
    let count: number = 0;

    statisticsMap.forEach((statistic: Readonly<number>): void => {
      count += statistic;
    });

    return count;
  }

  /**
   * @description
   * Log a single statistic
   * @template TStatistic
   * @param {Readonly<string | ETreeRows>} prefix The prefix of the statistic name as a tree row
   * @param {Readonly<string | TStatistic>} statistic The name of the statistic
   * @param {Readonly<number>} count The statistic count
   * @returns {AbstractStatisticsService<TStatistic>} The service
   * @private
   */
  private _log(
    prefix: Readonly<string | ETreeRows>,
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
   * Do the same for sub-maps having at least one value to display
   * @template TStatistic
   * @returns {Map<TStatistic, Map<TStatistic, number> | number>} The filtered map of statistics
   * @private
   */
  private _getAllFilteredStatisticsMaps(): Map<TStatistic, Map<TStatistic, number> | number> {
    return mapFilter<TStatistic, Map<TStatistic, number> | number>(
      this._getAllStatisticsMap(),
      ([_statistic, data]): boolean => {
        // Data is a count
        if (isFiniteNumber(data)) {
          return data > 0;
        }

        const subMapStatisticsCount: number = this._getStatisticsMapCount(data);

        // Data is a map - we need to add a level
        return subMapStatisticsCount > 0;
      }
    );
  }

  /**
   * @description
   * Get the map of filtered statistics excluding all count bellow 1
   * @template TStatistic
   * @param {Map<TStatistic, number>} map The sub-map
   * @returns {Readonly<Map<TStatistic, number>>} The filtered map of statistics
   * @private
   */
  private _getAllFilteredStatisticsMap(map: Readonly<Map<TStatistic, number>>): Map<TStatistic, number> {
    return mapFilter<TStatistic, number>(map, ([_statistic, count]): boolean => count > 0);
  }

  /**
   * @description
   * Only used for the tests to reset the state
   * @template TStatistic
   * @returns {AbstractStatisticsService<TStatistic>} The service
   */
  public abstract initialize(): AbstractStatisticsService<TStatistic>;

  /**
   * @description
   * Get all the statistics as a map
   * @template TStatistic
   * @returns {Map<TStatistic, Map<TStatistic, number> | number>} The map of statistics
   * @protected
   */
  protected abstract _getAllStatisticsMap(): Map<TStatistic, Map<TStatistic, number> | number>;
}
