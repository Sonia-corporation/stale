const CHALK = require(`./chalk`);
const MOMENT = require(`moment-timezone`);
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);
const LOG_PREFIX = `● `;

/**
 * @param logType
 */
function getLogTypePrefix(logType) {
  return CHALK[logType](LOG_PREFIX);
}

/**
 * @param scope
 */
function getContext(scope) {
  /* eslint-disable new-cap */
  return CHALK.context(`[${_.toString(scope)}][${MOMENT().format(`HH:mm:ss:SSS`)}] `);

  /* eslint-enable new-cap */
}

/**
 * @param scope
 * @param message
 */
function error(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`error`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.error = error;

/**
 * @param scope
 * @param message
 */
function warning(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`warning`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.warning = warning;

/**
 * @param scope
 * @param message
 */
function success(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`success`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.success = success;

/**
 * @param scope
 * @param message
 */
function log(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`log`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.log = log;

/**
 * @param scope
 * @param message
 */
function debug(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`debug`))}${getContext(scope)}${_.toString(message)}`);
}

module.exports.debug = debug;
