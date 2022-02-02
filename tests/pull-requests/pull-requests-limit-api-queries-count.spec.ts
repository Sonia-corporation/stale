import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull requests limit API queries calls count`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the limit of pull requests API queries calls count is set to -1`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestLimitApiQueriesCount: -1,
      });
    });

    describe(`when there is 1 pull request to process`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
        });
      });

      it(`should process the pull request`, async (): Promise<void> => {
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

  describe(`when the limit of pull requests API queries calls count is set to 0`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestLimitApiQueriesCount: 0,
      });
    });

    describe(`when there is 1 pull request to process`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
        });
      });

      it(`should not process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
        });
      });
    });
  });

  describe(`when the limit of pull requests API queries calls count is set to 1`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestLimitApiQueriesCount: 1,
      });
    });

    describe(`when there is 1 pull request to process`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
        });
      });

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when there is 2 pull requests to process`, (): void => {
      beforeEach((): void => {
        pullRequestSut
          .addPullRequest({
            locked: false,
          })
          .addPullRequest({
            locked: false,
          });
      });

      it(`should process all the pull requests`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 2,
          unalteredPullRequestsCount: 2,
        });
      });
    });

    describe(`when there is 2 pull requests to process which should be stale`, (): void => {
      beforeEach((): void => {
        pullRequestSut
          .addPullRequest({
            locked: false,
            updatedAt: DateTime.now()
              .minus({
                day: 31,
              })
              .toISO({
                includeOffset: false,
              }),
          })
          .addPullRequest({
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

      it(`should only process the first pull request (due to the query to fetch the stale label)`, async (): Promise<void> => {
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
  });
});
