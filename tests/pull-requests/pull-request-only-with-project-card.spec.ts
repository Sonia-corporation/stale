import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request only with project card`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-with-project-cards" is set to true`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithProjectCards: true,
      });
    });

    describe(`when a pull request has no project card`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
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

    describe(`when a pull request has one project card`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: { name: `project-y` },
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

  describe(`when the input "pull-request-only-with-project-cards" is set to false`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyWithProjectCards: false,
      });
    });

    describe(`when a pull request has no project card`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
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

    describe(`when a pull request has one project card`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: { name: `project-y` },
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
