import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { ICloseReason } from '@utils/types/close-reason';
import _ from 'lodash';

/**
 * @description
 * Parse a possible good close reason ({@link ICloseReason}) to a valid close reason ({@link ECloseReason})
 * If the close reason is not valid, it will return undefined
 * @param {Readonly<ICloseReason>} closeReason The close reason to parse
 * @returns {ECloseReason | undefined} The parsed close reason or undefined
 */
export function getParsedCloseReason(closeReason: Readonly<ICloseReason>): ECloseReason | undefined {
  // @todo find a way to get rid of this type hack
  return _.includes([ECloseReason.COMPLETED, ECloseReason.NOT_PLANNED], closeReason)
    ? (closeReason as ECloseReason)
    : undefined;
}
