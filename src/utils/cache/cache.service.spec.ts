import { CacheService } from '@utils/cache/cache.service';

describe(`CacheService`, (): void => {
  let cacheService: CacheService<string>;

  beforeEach((): void => {
    cacheService = new CacheService<string>();
  });

  describe(`has()`, (): void => {
    describe(`when the key was not found in the cache`, (): void => {
      beforeEach((): void => {
        cacheService.values$$ = {};
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = cacheService.has(`key`);

        expect(result).toBeFalse();
      });
    });

    describe(`when the key was found in the cache`, (): void => {
      beforeEach((): void => {
        cacheService.values$$ = { key: `dummy` };
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = cacheService.has(`key`);

        expect(result).toBeTrue();
      });
    });
  });

  describe(`set()`, (): void => {
    beforeEach((): void => {
      cacheService.values$$ = {};
    });

    it(`should add the value to the cache`, (): void => {
      expect.assertions(1);

      cacheService.set(`key`, `dummy`);

      expect(cacheService.values$$[`key`]).toBe(`dummy`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = cacheService.set(`key`, `dummy`);

      expect(result).toStrictEqual(cacheService);
    });
  });

  describe(`get()`, (): void => {
    describe(`when the key was not found in the cache`, (): void => {
      beforeEach((): void => {
        cacheService.values$$ = {};
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): unknown => cacheService.get(`key`)).toThrow(
          new Error(`The value could not be found from the cache`)
        );
      });
    });

    describe(`when the key was found in the cache`, (): void => {
      beforeEach((): void => {
        cacheService.values$$ = { key: `dummy` };
      });

      it(`should return the value`, (): void => {
        expect.assertions(1);

        const result = cacheService.get(`key`);

        expect(result).toBe(`dummy`);
      });
    });
  });
});
