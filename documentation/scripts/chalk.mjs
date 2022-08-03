import { Chalk } from 'chalk';

const CHALK = new Chalk();
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
export function success(message) {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

/**
 * @description
 * Format a context message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function context(message) {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

/**
 * @description
 * Format a value message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function value(message) {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

/**
 * @description
 * Format an error message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function error(message) {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

/**
 * @description
 * Format a warning message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function warning(message) {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

/**
 * @description
 * Format a text message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function text(message) {
  return CHALK.hex(COLOR_WHITE)(message);
}

/**
 * @description
 * Format a log message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function log(message) {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

/**
 * @description
 * Format a debug message
 * @param {unknown} message The message to format
 * @returns {string} The formatted message
 */
export function debug(message) {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}
