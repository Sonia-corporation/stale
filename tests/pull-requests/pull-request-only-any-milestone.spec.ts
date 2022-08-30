import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request any of the required milestone`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-any-milestones" contains at least one milestone`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyAnyMilestones: [`milestone-x`],
      });
    });

    describe(`when a pull request has no milestone`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: undefined,
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

    describe(`when a pull request has one milestone which does not match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            title: `milestone-y`,
          }),
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

    describe(`when a pull request has one milestone which does match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            title: `milestone-x`,
          }),
        });
      });

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(14);

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
