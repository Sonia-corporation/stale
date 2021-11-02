import terminalLink from 'terminal-link';

/**
 * @description
 * Utility to create a link used to improve the logger and debug experience
 * @param {Readonly<string>} name The name of the link
 * @param {Readonly<string>} link The URL associated
 * @returns {string} A link in the markdown format
 */
export function createLink(name: Readonly<string>, link: Readonly<string>): string {
  return terminalLink(name, link);
}
