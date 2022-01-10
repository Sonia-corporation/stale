/**
 * @description
 * Filter a map
 * @template TKey
 * @template TValue
 * @param {Readonly<Map<TKey, TValue>>} map The map to filter
 * @param {(value: [TKey, TValue], index: Readonly<number>, array: [TKey, TValue][]) => boolean} filter The iterator
 * @returns {Map<TKey, TValue>} The new map
 */
export function mapFilter<TKey extends string, TValue>(
  map: Readonly<Map<TKey, TValue>>,
  filter: (value: [TKey, TValue], index: Readonly<number>, array: [TKey, TValue][]) => boolean
): Map<TKey, TValue> {
  if (map.size === 0) {
    return map;
  }

  return new Map<TKey, TValue>([...map].filter(filter));
}
