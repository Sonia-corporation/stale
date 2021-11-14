import { IIso8601Date } from '@utils/dates/iso-8601';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * Convert an {@link IIso8601Date} to a {@link DateTime}
 * In case the conversion is not working, it will throw an error
 * @param {Readonly<IIso8601Date>} date The ISO 8601 date to convert
 * @returns {DateTime} The given parsed date or throw an error
 */
export function iso8601ToDatetime(date: Readonly<IIso8601Date>): DateTime | never {
  const dateTime: DateTime = DateTime.fromISO(date);

  if (_.isString(dateTime.invalidReason)) {
    throw new Error(dateTime.invalidReason);
  }

  return dateTime;
}
