import { IGithubApiProjectCard } from '@github/api/labels/interfaces/github-api-project-card.interface';
import { IGithubApiProjectCardsPagination } from '@github/api/labels/interfaces/github-api-project-cards-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request any of the required project card`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-any-project-cards" contains at least one project card`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyAnyProjectCards: [`project-x`],
      });
    });

    describe(`when an pull request has no project card`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
            nodes: [],
          }),
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when an pull request has one project card which does not match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-y`,
                },
              }),
            ],
          }),
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when an pull request has one project card which does match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-x`,
                },
              }),
            ],
          }),
        });
      });

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

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
