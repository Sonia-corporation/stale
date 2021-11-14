import { getMapLongestKey } from '@utils/maps/get-map-longest-key';

describe(`getMapLongestKey()`, (): void => {
  let map: Map<string, number>;

  describe(`when the map is empty`, (): void => {
    beforeEach((): void => {
      map = new Map();
    });

    it(`should return 0`, (): void => {
      expect.assertions(1);

      const result = getMapLongestKey(map);

      expect(result).toBe(0);
    });
  });

  describe(`when the map contains one entry`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`dummy`, 0);
    });

    it(`should return the length of the entry key`, (): void => {
      expect.assertions(1);

      const result = getMapLongestKey(map);

      expect(result).toBe(5);
    });
  });

  describe(`when the map contains two entries with the same key length`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`foo`, 0).set(`bar`, 0);
    });

    it(`should return the length of the keys`, (): void => {
      expect.assertions(1);

      const result = getMapLongestKey(map);

      expect(result).toBe(3);
    });
  });

  describe(`when the map contains multiple entries with different key length`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`marco`, 0).set(`polo`, 0);
    });

    it(`should return the longest key length`, (): void => {
      expect.assertions(1);

      const result = getMapLongestKey(map);

      expect(result).toBe(5);
    });
  });
});
