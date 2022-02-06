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
 * @param message
 */
function success(message) {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

module.exports.success = success;

/**
 * @param message
 */
function context(message) {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

module.exports.context = context;

/**
 * @param message
 */
function value(message) {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

module.exports.value = value;

/**
 * @param message
 */
function error(message) {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

module.exports.error = error;

/**
 * @param message
 */
function warning(message) {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

module.exports.warning = warning;

/**
 * @param message
 */
function text(message) {
  return CHALK.hex(COLOR_WHITE)(message);
}

module.exports.text = text;

/**
 * @param message
 */
function log(message) {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

module.exports.log = log;

/**
 * @param message
 */
function debug(message) {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}

module.exports.debug = debug;
