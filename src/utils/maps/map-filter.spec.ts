import { mapFilter } from '@utils/maps/map-filter';

describe(`mapFilter()`, (): void => {
  let map: Map<string, number>;
  let filter: (value: [string, number], index: number, array: [string, number][]) => boolean;

  describe(`when the map is empty`, (): void => {
    beforeEach((): void => {
      map = new Map();
    });

    it(`should return an empty map`, (): void => {
      expect.assertions(1);

      const result = mapFilter(map, filter);

      expect(result).toStrictEqual(new Map());
    });
  });

  describe(`when the map contains one entry`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`marco`, 0);
    });

    describe(`when the filter filters nothing`, (): void => {
      beforeEach((): void => {
        filter = (): true => true;
      });

      it(`should return the same map`, (): void => {
        expect.assertions(1);

        const result = mapFilter(map, filter);

        expect(result).toStrictEqual(map);
      });
    });

    describe(`when the filter filters everything`, (): void => {
      beforeEach((): void => {
        filter = (): false => false;
      });

      it(`should return an empty map`, (): void => {
        expect.assertions(1);

        const result = mapFilter(map, filter);

        expect(result).toStrictEqual(new Map());
      });
    });
  });

  describe(`when the map contains two entries`, (): void => {
    beforeEach((): void => {
      map = new Map().set(`marco`, 0).set(`polo`, 0);
    });

    describe(`when the filter filters nothing`, (): void => {
      beforeEach((): void => {
        filter = (): true => true;
      });

      it(`should return the same map`, (): void => {
        expect.assertions(1);

        const result = mapFilter(map, filter);

        expect(result).toStrictEqual(map);
      });
    });

    describe(`when the filter filters half of the entries`, (): void => {
      beforeEach((): void => {
        filter = ([key]): boolean => key !== `marco`;
      });

      it(`should return the filtered map`, (): void => {
        expect.assertions(1);

        const result = mapFilter(map, filter);

        expect(result).toStrictEqual(new Map().set(`polo`, 0));
      });
    });
  });
});
