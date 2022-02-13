const CHALK = require(`./chalk`);
const MOMENT = require(`moment-timezone`);
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);
const LOG_PREFIX = `● `;

/**
 * @description
 * Format the given log type
 * @param {Readonly<string>} logType The type of logger message
 * @returns {string} Return the formatted log type
 */
function getLogTypePrefix(logType) {
  return CHALK[logType](LOG_PREFIX);
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
function error(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`error`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.error = error;

/**
 * @description
 * Log a warning message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
function warning(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`warning`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.warning = warning;

/**
 * @description
 * Log a success message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
function success(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`success`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.success = success;

/**
 * @description
 * Log a log message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
function log(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`log`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.log = log;

/**
 * @description
 * Log a debug message
 * @param {Readonly<string>} scope The scope (usually the file name)
 * @param {Readonly<string>} message The message to log
 */
function debug(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`debug`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.debug = debug;
