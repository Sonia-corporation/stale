import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { CacheService } from '@utils/cache/cache.service';

export class GithubApiLabelsCacheService {
  public static cacheService$$: CacheService<IGithubApiLabel> = new CacheService<IGithubApiLabel>();

  public static has(key: Readonly<string>): boolean {
    return GithubApiLabelsCacheService.cacheService$$.has(key);
  }

  public static set(key: Readonly<string>, value: Readonly<IGithubApiLabel>): GithubApiLabelsCacheService {
    GithubApiLabelsCacheService.cacheService$$.set(key, value);

    return GithubApiLabelsCacheService;
  }

  public static get(key: Readonly<string>): IGithubApiLabel | never {
    try {
      return GithubApiLabelsCacheService.cacheService$$.get(key);
    } catch (e) {
      throw new Error(`The label could not be found from the cache`);
    }
  }
}
