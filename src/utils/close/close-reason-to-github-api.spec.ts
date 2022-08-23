import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { EGitHubApiCloseReason } from '@github/api/close/enums/github-api-close-reason.enum';
import { closeReasonToGithubApi } from '@utils/close/close-reason-to-github-api';

describe(`closeReasonToGithubApi()`, (): void => {
  let reason: ECloseReason;

  describe(`when the given reason is completed`, (): void => {
    beforeEach((): void => {
      reason = ECloseReason.COMPLETED;
    });

    it(`should return the completed reason parsed for the GitHub API`, (): void => {
      expect.assertions(1);

      const result = closeReasonToGithubApi(reason);

      expect(result).toStrictEqual(EGitHubApiCloseReason.COMPLETED);
    });
  });

  describe(`when the given reason is not planned`, (): void => {
    beforeEach((): void => {
      reason = ECloseReason.NOT_PLANNED;
    });

    it(`should return the not planned reason parsed for the GitHub API`, (): void => {
      expect.assertions(1);

      const result = closeReasonToGithubApi(reason);

      expect(result).toStrictEqual(EGitHubApiCloseReason.NOT_PLANNED);
    });
  });
});
