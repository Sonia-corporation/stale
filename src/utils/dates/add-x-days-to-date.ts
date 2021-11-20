import { DateTime } from 'luxon';

/**
 * @description
 * Add X days to the given date
 * @param {Readonly<DateTime>} date The date
 * @param {Readonly<number>} days The number of days to add
 * @returns {boolean} Returns the updated date
 */
export function addXDaysToDate(date: Readonly<DateTime>, days: Readonly<number>): DateTime {
  return date.plus({
    day: days,
  });
}
