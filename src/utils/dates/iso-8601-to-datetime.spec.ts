import { IIso8601Date } from '@utils/dates/iso-8601';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { DateTime } from 'luxon';

describe(`iso8601ToDatetime()`, (): void => {
  let date: IIso8601Date;

  describe.each([``, `dummy`, new Date().toLocaleString()])(
    `when the given date cannot be parsed`,
    (invalidDate: string): void => {
      beforeEach((): void => {
        date = invalidDate;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): DateTime => iso8601ToDatetime(date)).toThrow(new Error(`unparsable`));
      });
    }
  );

  describe.each([new Date().toISOString(), `2016-05`])(
    `when the given date can be parsed`,
    (validDate: string): void => {
      beforeEach((): void => {
        date = validDate;
      });

      it(`should return the parsed date`, (): void => {
        expect.assertions(1);

        const result = iso8601ToDatetime(date);

        expect(result).toBeInstanceOf(DateTime);
      });
    }
  );
});
