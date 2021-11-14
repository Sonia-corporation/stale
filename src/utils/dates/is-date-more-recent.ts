import { DateTime } from 'luxon';

/**
 * @description
 * Check if the first date is more recent that the second one
 * @param {Readonly<DateTime>} date1 The first date
 * @param {Readonly<DateTime>} date2 The second date
 * @returns {boolean} Returns true if the first date is more recent that the second one
 */
export function isDateMoreRecent(date1: Readonly<DateTime>, date2: Readonly<DateTime>): boolean {
  return date1 > date2;
}
