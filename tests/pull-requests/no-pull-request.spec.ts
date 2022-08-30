import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`No pull request`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when there is no pull request to process`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().removeAllPullRequests();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        calledApiPullRequestsQueriesCount: 1,
      });
    });
  });
});
