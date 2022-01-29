import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

/**
 * Perfect to test the pagination
 */
describe(`Batch of pull requests`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when more than 20 pull requests are locked (two batches)`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequests(22, { locked: true });
    });

    it(`should not process the pull requests`, async (): Promise<void> => {
      expect.assertions(13);

      await pullRequestSut.process();

      pullRequestSut.expect({
        calledApiPullRequestsQueriesCount: 2,
        ignoredPullRequestsCount: 22,
        processedPullRequestsCount: 22,
      });
    });
  });
});
