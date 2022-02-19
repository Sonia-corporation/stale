import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to stale comment`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should be commented when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestStaleComment: `stale-comment`,
      }).addPullRequest({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO({
            includeOffset: false,
          }),
      });
    });

    it(`should stale the pull request and add a stale comment`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 1,
        calledApiPullRequestsMutationsCount: 2,
        calledApiPullRequestsQueriesCount: 2,
        processedPullRequestsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should not be commented when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestStaleComment: ``,
      }).addPullRequest({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO({
            includeOffset: false,
          }),
      });
    });

    it(`should stale the pull request and not add a stale comment`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsLabelsCount: 1,
        calledApiPullRequestsMutationsCount: 1,
        calledApiPullRequestsQueriesCount: 1,
        processedPullRequestsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });
});
