import { getEnumKeys } from '@utils/enums/get-enum-keys';

enum ENumber {
  ONE = 0,
}

enum EString {
  ONE = `1`,
}

describe(`getEnumKeys()`, (): void => {
  describe(`when the given enum contains numbers`, (): void => {
    it(`should return the keys of the enum`, (): void => {
      expect.assertions(1);

      const result = getEnumKeys(ENumber);

      expect(result).toStrictEqual([`ONE`]);
    });
  });

  describe(`when the given enum contains strings`, (): void => {
    it(`should return the keys of the enum`, (): void => {
      expect.assertions(1);

      const result = getEnumKeys(EString);

      expect(result).toStrictEqual([`ONE`]);
    });
  });
});
