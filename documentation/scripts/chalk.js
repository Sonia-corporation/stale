const CHALK_INSTANCE = require(`chalk`);
const CHALK = new CHALK_INSTANCE.Instance();
const COLOR_AURORA_GREEN = `#78E08F`;
const COLOR_BLUE_CARACAO = `#3DC1D3`;
const COLOR_DEEP_ROSE = `#C44569`;
const COLOR_ROSY_HIGHLIGHT = `#F7D794`;
const COLOR_WHITE = `#FFFFFF`;
const COLOR_SOFT_BLUE = `#778BEB`;
const COLOR_PURPLE_MOUNTAIN_MAJESTY = `#786FA6`;
const COLOR_SAWTOOTH_AAK = `#F19066`;

/**
 * @description
 * Format a success message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function success(message) {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

module.exports.success = success;

/**
 * @description
 * Format a context message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function context(message) {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

module.exports.context = context;

/**
 * @description
 * Format a value message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function value(message) {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

module.exports.value = value;

/**
 * @description
 * Format an error message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function error(message) {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

module.exports.error = error;

/**
 * @description
 * Format a warning message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function warning(message) {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

module.exports.warning = warning;

/**
 * @description
 * Format a text message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function text(message) {
  return CHALK.hex(COLOR_WHITE)(message);
}

module.exports.text = text;

/**
 * @description
 * Format a log message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function log(message) {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

module.exports.log = log;

/**
 * @description
 * Format a debug message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
function debug(message) {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}

module.exports.debug = debug;
