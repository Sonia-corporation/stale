import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request only with milestone`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-with-milestones" is set to true`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithMilestones: true,
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

    describe(`when a pull request has one milestone`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            id: `milestone-y`,
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

  describe(`when the input "pull-request-only-with-milestones" is set to false`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithMilestones: false,
      });
    });

    describe(`when a pull request has no milestone`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: undefined,
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

    describe(`when a pull request has one milestone`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            id: `milestone-y`,
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
