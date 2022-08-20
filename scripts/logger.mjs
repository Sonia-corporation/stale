import * as CHALK from './chalk.mjs';
import _ from 'lodash';
import MOMENT from 'moment-timezone';

const LOG_PREFIX = `● `;
const LOG_TYPE_PREFIX_MAP = {
  debug: () => CHALK.debug(LOG_PREFIX),
  error: () => CHALK.error(LOG_PREFIX),
  log: () => CHALK.log(LOG_PREFIX),
  success: () => CHALK.success(LOG_PREFIX),
  warning: () => CHALK.warning(LOG_PREFIX),
};

/**
 * @description
 * Format the given log type
 * @param {Readonly<'error' | 'warning' | 'success' | 'log' | 'debug'>} logType The type of logger message
 * @returns {string} Return the formatted log type
 */
function getLogTypePrefix(logType) {
  return LOG_TYPE_PREFIX_MAP[logType]();
}

/**
 * @description
 * Format the scope
 * Add the time
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @returns {string} Return the given scope formatted and with the current time
 */
function getContext(scope) {
  /* eslint-disable new-cap */
  return CHALK.context(`[${_.toString(scope)}][${MOMENT().format(`HH:mm:ss:SSS`)}] `);

  /* eslint-enable new-cap */
}

/**
 * @description
 * Log an error message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
export function error(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`error`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @description
 * Log a warning message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
export function warning(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`warning`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @description
 * Log a success message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
export function success(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`success`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @description
 * Log a log message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
export function log(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`log`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @description
 * Log a debug message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
export function debug(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`debug`))}${getContext(scope)}${_.toString(message)}`);
}
