import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`Draft pull request`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is a draft`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreDraft: true,
      }).addPullRequest({
        isDraft: true,
        locked: false,
      });
    });

    describe(`when the dry-run is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.dryRun();
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when the dry-run is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.normalRun();
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });

  describe(`when multiple pull requests are drafts`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreDraft: true,
      })
        .addPullRequest({
          isDraft: true,
          locked: false,
        })
        .addPullRequest({
          isDraft: true,
          locked: false,
        });
    });

    describe(`when the dry-run is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.dryRun();
      });

      it(`should ignore the pull requests`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 2,
          processedPullRequestsCount: 2,
        });
      });
    });

    describe(`when the dry-run is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.normalRun();
      });

      it(`should ignore the pull requests`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 2,
          processedPullRequestsCount: 2,
        });
      });
    });
  });
});
