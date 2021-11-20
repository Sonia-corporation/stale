import { addXDaysToDate } from '@utils/dates/add-x-days-to-date';
import { DateTime } from 'luxon';

describe(`addXDaysToDate()`, (): void => {
  let date: DateTime;
  let days: number;

  describe(`when the given number of days is 0`, (): void => {
    beforeEach((): void => {
      date = DateTime.utc(2020);
      days = 0;
    });

    it(`should return the same date`, (): void => {
      expect.assertions(2);

      const result = addXDaysToDate(date, days);

      expect(result).toStrictEqual(date);
      expect(result.day).toBe(1);
    });
  });

  describe(`when the given number of days is 1`, (): void => {
    beforeEach((): void => {
      date = DateTime.utc(2020);
      days = 1;
    });

    it(`should return the date older than one day`, (): void => {
      expect.assertions(1);

      const result = addXDaysToDate(date, days);

      expect(result.day).toBe(2);
    });
  });
});
