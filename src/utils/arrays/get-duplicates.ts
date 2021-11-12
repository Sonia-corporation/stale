import _ from 'lodash';

/**
 * @description
 * Return the identical values between the two sources
 * @template TType The type of values
 * @param {ReadonlyArray<TType>} source1 The first array
 * @param {ReadonlyArray<TType>} source2 The second array
 * @returns {TType[]} The duplicated values
 */
export function getDuplicates<TType>(source1: ReadonlyArray<TType>, source2: ReadonlyArray<TType>): TType[] {
  return _.intersection(source1, source2);
}
