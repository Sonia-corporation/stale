/**
 * @description
 * Return the last of a map
 * @template TKey
 * @template TValue
 * @param {Readonly<Map<TKey, TValue>>} map The map
 * @returns {TKey | undefined} Return the last key of the map or undefined
 */
export function getMapLastKey<TKey extends string, TValue>(map: Readonly<Map<TKey, TValue>>): TKey | undefined {
  if (map.size === 0) {
    return undefined;
  }

  return [...map][map.size - 1][0];
}
