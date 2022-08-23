import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { getParsedCloseReason } from '@utils/close/get-parsed-close-reason';
import { ICloseReason } from '@utils/types/close-reason';

describe(`getParsedCloseReason()`, (): void => {
  let reason: ICloseReason;

  describe(`when the given reason is "completed"`, (): void => {
    beforeEach((): void => {
      reason = ECloseReason.COMPLETED;
    });

    it(`should return the completed reason`, (): void => {
      expect.assertions(1);

      const result = getParsedCloseReason(reason);

      expect(result).toStrictEqual(ECloseReason.COMPLETED);
    });
  });

  describe(`when the given reason is "not planned"`, (): void => {
    beforeEach((): void => {
      reason = ECloseReason.NOT_PLANNED;
    });

    it(`should return the not planned reason`, (): void => {
      expect.assertions(1);

      const result = getParsedCloseReason(reason);

      expect(result).toStrictEqual(ECloseReason.NOT_PLANNED);
    });
  });

  describe(`when the given reason is incorrect`, (): void => {
    beforeEach((): void => {
      reason = `bad value`;
    });

    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = getParsedCloseReason(reason);

      expect(result).toBeUndefined();
    });
  });
});
