import _ from 'lodash';

export class CacheService<TValue> {
  public values$$: Record<string, TValue> = {};

  public has(key: Readonly<string>): boolean {
    return _.has(this.values$$, key);
  }

  public set(key: Readonly<string>, value: Readonly<TValue>): CacheService<TValue> {
    this.values$$[key] = value;

    return this;
  }

  public get(key: Readonly<string>): TValue | never {
    const value: TValue | undefined = _.get(this.values$$, key);

    if (_.isNil(value)) {
      throw new Error(`The value could not be found from the cache`);
    }

    return value;
  }
}
