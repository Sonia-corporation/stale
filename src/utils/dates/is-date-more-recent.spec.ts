import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { DateTime } from 'luxon';

describe(`isDateMoreRecent()`, (): void => {
  let date1: DateTime;
  let date2: DateTime;

  describe(`when the given date is older than the other given date`, (): void => {
    beforeEach((): void => {
      date1 = DateTime.utc(2020);
      date2 = DateTime.utc(2021);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDateMoreRecent(date1, date2);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given date is equal to the other given date`, (): void => {
    beforeEach((): void => {
      date1 = DateTime.utc(2021);
      date2 = DateTime.utc(2021);
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isDateMoreRecent(date1, date2);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given date is more recent than the other given date`, (): void => {
    beforeEach((): void => {
      date1 = DateTime.utc(2022);
      date2 = DateTime.utc(2021);
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isDateMoreRecent(date1, date2);

      expect(result).toBeTrue();
    });
  });
});
