import { getDuplicates } from '@utils/arrays/get-duplicates';

describe(`getDuplicates()`, (): void => {
  let source1: string[];
  let source2: string[];

  describe(`when the given arrays are empties`, (): void => {
    beforeEach((): void => {
      source1 = [];
      source2 = [];
    });

    it(`should return an empty array`, (): void => {
      expect.assertions(1);

      const result = getDuplicates(source1, source2);

      expect(result).toStrictEqual([]);
    });
  });

  describe(`when the given arrays are containing different values`, (): void => {
    beforeEach((): void => {
      source1 = [`value1`];
      source2 = [`value2`];
    });

    it(`should return an empty array`, (): void => {
      expect.assertions(1);

      const result = getDuplicates(source1, source2);

      expect(result).toStrictEqual([]);
    });
  });

  describe(`when the given arrays are containing the same values once`, (): void => {
    beforeEach((): void => {
      source1 = [`value`];
      source2 = [`value`];
    });

    it(`should return an array containing the value which is identical`, (): void => {
      expect.assertions(1);

      const result = getDuplicates(source1, source2);

      expect(result).toStrictEqual([`value`]);
    });
  });

  describe(`when the given arrays are containing the same values once and different values`, (): void => {
    beforeEach((): void => {
      source1 = [`value`, `value1`];
      source2 = [`value`, `value2`];
    });

    it(`should return an array containing the value which is identical`, (): void => {
      expect.assertions(1);

      const result = getDuplicates(source1, source2);

      expect(result).toStrictEqual([`value`]);
    });
  });

  describe(`when the given arrays are containing multiple same values`, (): void => {
    beforeEach((): void => {
      source1 = [`value1`, `value2`];
      source2 = [`value1`, `value2`];
    });

    it(`should return an array containing the values which are identical`, (): void => {
      expect.assertions(1);

      const result = getDuplicates(source1, source2);

      expect(result).toStrictEqual([`value1`, `value2`]);
    });
  });
});
