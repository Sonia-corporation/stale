import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`Pull request processing`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when there is at least one pull request to process`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequest({
        locked: true,
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.enableProcessing();
      });

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.disableProcessing();
      });

      it(`should not process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect();
      });
    });
  });
});
