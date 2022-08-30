import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to stale extra labels`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should not have extra labels removed when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestRemoveLabelsAfterStale: [],
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

    it(`should stale the pull request and not remove some extra labels`, async (): Promise<void> => {
      expect.assertions(14);

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

  describe(`when the pull request should remove one more label when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestRemoveLabelsAfterStale: [`extra-stale-label`],
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

    it(`should stale the pull request and remove the extra label`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 1,
        calledApiPullRequestsMutationsCount: 3,
        calledApiPullRequestsQueriesCount: 2,
        processedPullRequestsCount: 1,
        removedPullRequestsLabelsCount: 1,
        stalePullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should remove three more labels when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestRemoveLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`],
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

    it(`should stale the pull request and remove the extra labels`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 1,
        calledApiPullRequestsMutationsCount: 3,
        calledApiPullRequestsQueriesCount: 4,
        processedPullRequestsCount: 1,
        removedPullRequestsLabelsCount: 3,
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

    describe(`when the pull request should remove three more labels when stale`, (): void => {
      beforeEach((): void => {
        pullRequestSut.setExtraRemovedStaleLabels([
          `extra-stale-label-1`,
          `extra-stale-label-2`,
          `extra-stale-label-3`,
        ]);
      });

      it(`should stale the pull request and not remove some extra labels`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          addedPullRequestsLabelsCount: 1,
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          removedPullRequestsLabelsCount: 3,
          stalePullRequestsCount: 1,
        });
      });
    });
  });
});
