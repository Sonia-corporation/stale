import * as core from '@actions/core';

/**
 * @description
 * Create a notice annotation for a count
 * Do nothing if the count is below 1
 * @param {Readonly<string>} name The name of the notice
 * @param {Readonly<number>} count The count
 */
export function noticeCount(name: Readonly<string>, count: Readonly<number>): void {
  if (count > 0) {
    core.notice(`${name}: ${count}`);
  }
}
