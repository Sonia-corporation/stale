import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request only with project`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-with-projects" is set to true`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithProjects: true,
      });
    });

    describe(`when a pull request has no project`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [],
            totalCount: 0,
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

    describe(`when a pull request has one project`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
              }),
            ],
            totalCount: 1,
          },
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

  describe(`when the input "pull-request-only-with-projects" is set to false`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithProjects: false,
      });
    });

    describe(`when a pull request has no project`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [],
            totalCount: 0,
          },
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

    describe(`when a pull request has one project`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projects: {
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
              }),
            ],
            totalCount: 1,
          },
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
