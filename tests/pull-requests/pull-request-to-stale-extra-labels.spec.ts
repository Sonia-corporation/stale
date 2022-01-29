import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to stale extra labels`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should not have extra labels when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [],
        pullRequestDaysBeforeStale: 30,
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

    it(`should stale the pull request and not add some extra labels`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 1,
        calledApiPullRequestsMutationsCount: 1,
        calledApiPullRequestsQueriesCount: 2,
        processedPullRequestsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should add one more label when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [`extra-stale-label`],
        pullRequestDaysBeforeStale: 30,
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

    it(`should stale the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 2,
        calledApiPullRequestsMutationsCount: 2,
        calledApiPullRequestsQueriesCount: 3,
        processedPullRequestsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should add three more labels when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`],
        pullRequestDaysBeforeStale: 30,
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

    it(`should stale the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 4,
        calledApiPullRequestsMutationsCount: 2,
        calledApiPullRequestsQueriesCount: 5,
        processedPullRequestsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });

  describe(`when the dry-run is enabled`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        dryRun: true,
        pullRequestDaysBeforeStale: 30,
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

    describe(`when the pull request should add three more labels when stale`, (): void => {
      beforeEach((): void => {
        pullRequestSut.setExtraStaleLabels([`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`]);
      });

      it(`should stale the pull request and not add some extra labels`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          addedPullRequestsLabelsCount: 4,
          calledApiPullRequestsQueriesCount: 5,
          processedPullRequestsCount: 1,
          stalePullRequestsCount: 1,
        });
      });
    });
  });
});
