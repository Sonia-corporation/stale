import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`Locked pull request`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is locked`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequest({
        locked: true,
      });
    });

    it(`should ignore the pull request`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        calledApiPullRequestsQueriesCount: 1,
        ignoredPullRequestsCount: 1,
        processedPullRequestsCount: 1,
      });
    });
  });

  describe(`when multiple pull requests are locked`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor()
        .addPullRequest({
          locked: true,
        })
        .addPullRequest({
          locked: true,
        });
    });

    it(`should ignore the pull requests`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        calledApiPullRequestsQueriesCount: 1,
        ignoredPullRequestsCount: 2,
        processedPullRequestsCount: 2,
      });
    });
  });
});
