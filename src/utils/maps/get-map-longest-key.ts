/**
 * @description
 * Return the longest key length of a map
 * @template TKey
 * @template TValue
 * @param {Readonly<Map<TKey, TValue>>} map The map
 * @returns {number} Return the longest key length of the map
 */
export function getMapLongestKey<TKey extends string, TValue>(map: Readonly<Map<TKey, TValue>>): number {
  if (map.size === 0) {
    return 0;
  }

  return [...map.keys()].reduce((longestKeyLength: Readonly<number>, key: Readonly<TKey>): number => {
    const keyLength: number = key.length;

    return longestKeyLength > keyLength ? longestKeyLength : keyLength;
  }, 0);
}
