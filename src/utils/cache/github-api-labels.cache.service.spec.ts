import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiLabelsCacheService } from '@utils/cache/github-api-labels.cache.service';
import { createHydratedMock } from 'ts-auto-mock';

describe(`GithubApiLabelsCacheService`, (): void => {
  describe(`has()`, (): void => {
    let cacheServiceHasSpy: jest.SpyInstance;

    beforeEach((): void => {
      cacheServiceHasSpy = jest.spyOn(GithubApiLabelsCacheService.cacheService$$, `has`).mockImplementation();
    });

    describe(`when the key was not found in the cache`, (): void => {
      beforeEach((): void => {
        cacheServiceHasSpy.mockReturnValue(false);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = GithubApiLabelsCacheService.has(`key`);

        expect(result).toBeFalse();
      });
    });

    describe(`when the key was found in the cache`, (): void => {
      beforeEach((): void => {
        cacheServiceHasSpy.mockReturnValue(true);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = GithubApiLabelsCacheService.has(`key`);

        expect(result).toBeTrue();
      });
    });
  });

  describe(`set()`, (): void => {
    let githubApiLabel: IGithubApiLabel;

    let cacheServiceSetSpy: jest.SpyInstance;

    beforeEach((): void => {
      githubApiLabel = createHydratedMock<IGithubApiLabel>();

      cacheServiceSetSpy = jest.spyOn(GithubApiLabelsCacheService.cacheService$$, `set`).mockImplementation();
    });

    it(`should add the value to the cache`, (): void => {
      expect.assertions(2);

      GithubApiLabelsCacheService.set(`key`, githubApiLabel);

      expect(cacheServiceSetSpy).toHaveBeenCalledTimes(1);
      expect(cacheServiceSetSpy).toHaveBeenCalledWith(`key`, githubApiLabel);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = GithubApiLabelsCacheService.set(`key`, githubApiLabel);

      expect(result).toStrictEqual(GithubApiLabelsCacheService);
    });
  });

  describe(`get()`, (): void => {
    let githubApiLabel: IGithubApiLabel;

    let cacheServiceGetSpy: jest.SpyInstance;

    beforeEach((): void => {
      githubApiLabel = createHydratedMock<IGithubApiLabel>();

      cacheServiceGetSpy = jest.spyOn(GithubApiLabelsCacheService.cacheService$$, `get`).mockImplementation();
    });

    describe(`when the key was not found in the cache (and throw an error)`, (): void => {
      beforeEach((): void => {
        cacheServiceGetSpy.mockImplementation((): never => {
          throw new Error(`The value could not be found from the cache`);
        });
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): IGithubApiLabel | never => GithubApiLabelsCacheService.get(`key`)).toThrow(
          new Error(`The label could not be found from the cache`)
        );
      });
    });

    describe(`when the key was found in the cache`, (): void => {
      beforeEach((): void => {
        cacheServiceGetSpy.mockReturnValue(githubApiLabel);
      });

      it(`should return the value`, (): void => {
        expect.assertions(1);

        const result = GithubApiLabelsCacheService.get(`key`);

        expect(result).toBe(githubApiLabel);
      });
    });
  });
});
