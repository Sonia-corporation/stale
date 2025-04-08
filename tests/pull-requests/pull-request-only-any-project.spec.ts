import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request any of the required project`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-any-projects" contains at least one project`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyAnyProjects: [`project-x`],
      });
    });

    describe(`when a pull request has no project`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [],
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

    describe(`when a pull request has one project which does not match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
              }),
            ],
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

    describe(`when a pull request has one project which does match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-x`,
              }),
            ],
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
