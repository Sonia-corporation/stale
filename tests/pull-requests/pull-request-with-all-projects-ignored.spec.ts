import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all projects ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the projects`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllProjects: true,
      });
    });

    describe(`when there is no project on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [],
            totalCount: 0,
          },
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when there is one project on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [createHydratedMock<IGithubApiProject>()],
            totalCount: 1,
          },
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
  });
});
