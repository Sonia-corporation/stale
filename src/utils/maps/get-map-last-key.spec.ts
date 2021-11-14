import { getMapLastKey } from '@utils/maps/get-map-last-key';

describe(`getMapLastKey()`, (): void => {
  let map: Map<string, number>;

  describe(`when the map is empty`, (): void => {
    beforeEach((): void => {
      map = new Map();
    });

    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = getMapLastKey(map);

      expect(result).toBeUndefined();
    });
  });

  describe(`when the map contains one entry`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`marco`, 0);
    });

    it(`should return the entry key`, (): void => {
      expect.assertions(1);

      const result = getMapLastKey(map);

      expect(result).toBe(`marco`);
    });
  });

  describe(`when the map contains multiple entries`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`marco`, 0).set(`polo`, 0);
    });

    it(`should return the last entry key`, (): void => {
      expect.assertions(1);

      const result = getMapLastKey(map);

      expect(result).toBe(`polo`);
    });
  });
});
