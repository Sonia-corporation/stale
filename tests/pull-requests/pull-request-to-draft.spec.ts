import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to draft`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request last update was older than 30 days`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
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

    describe(`when the pull request should be stale (with a label)`, (): void => {
      beforeEach((): void => {
        pullRequestSut.disableDraftProcessing();
      });

      it(`should stale the pull request`, async (): Promise<void> => {
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

    describe(`when the pull request should be stale (with the draft mode)`, (): void => {
      beforeEach((): void => {
        pullRequestSut.enableDraftProcessing();
      });

      it(`should stale the pull request by converting it to a draft`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsMutationsCount: 1,
          calledApiPullRequestsQueriesCount: 1,
          draftPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });
});
