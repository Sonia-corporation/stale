import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { EGitHubApiCloseReason } from '@github/api/close/enums/github-api-close-reason.enum';

const MAP: Record<ECloseReason, EGitHubApiCloseReason> = {
  [ECloseReason.COMPLETED]: EGitHubApiCloseReason.COMPLETED,
  [ECloseReason.NOT_PLANNED]: EGitHubApiCloseReason.NOT_PLANNED,
};

/**
 * @description
 * Map from {@link ECloseReason} to {@link EGitHubApiCloseReason}
 * @param {Readonly<ECloseReason>} closeReason The reason to close the item
 * @returns {EGitHubApiCloseReason} The reason to close the item formatted for the GitHub API
 */
export function closeReasonToGithubApi(closeReason: Readonly<ECloseReason>): EGitHubApiCloseReason {
  return MAP[closeReason];
}
