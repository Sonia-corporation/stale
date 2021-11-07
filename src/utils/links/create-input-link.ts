import { EInputs } from '@core/inputs/inputs.enum';
import { createLink } from '@utils/links/create-link';

/**
 * @description
 * Utility to create a link based on an input coming from the README.md
 * @param {Readonly<EInputs>} input The input to link to
 * @returns {string} A link in the markdown format pointing to the given input anchor in the README.md
 */
export function createInputLink(input: Readonly<EInputs>): string {
  return createLink(input, `https://github.com/Sonia-corporation/stale#${input}`);
}
