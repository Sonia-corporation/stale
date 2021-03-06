import _ from 'lodash';

/**
 * @description
 * Useful to avoid a type error with the isFinite function returning a boolean
 * Use {@link _.isFinite} instead of {@link Number.isFinite} because {@link Number.isFinite} only accept a number
 * @param {unknown} value The value to check if finite or not
 * @returns {boolean} true if the value is a finite number
 */
export function isFiniteNumber(value: unknown): value is number {
  return _.isFinite(value);
}
