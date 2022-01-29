import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Custom days before pull request stale`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the number of days before stale is set to 20`, (): void => {
    describe(`when a pull request last update was older than 20 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 21,
            })
            .toISO({
              includeOffset: false,
            }),
        });
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

    describe(`when a pull request last update is 20 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 20,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when a pull request last update is 19 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 19,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });
  });
});
