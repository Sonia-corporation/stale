/**
 * @description
 * Return the keys array of the given enum
 * @template TEnum
 * @template TKey
 * @param {TEnum} object The enum
 * @returns {TKey[]} The list of keys
 */
export function getEnumKeys<TEnum extends object, TKey extends keyof TEnum = keyof TEnum>(object: TEnum): TKey[] {
  return Object.keys(object).filter((key: Readonly<string>): boolean => Number.isNaN(+key)) as TKey[];
}
