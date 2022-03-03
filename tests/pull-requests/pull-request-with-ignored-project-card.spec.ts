import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { IGithubApiProjectCardsPagination } from '@github/api/projects/interfaces/github-api-project-cards-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with ignored project card`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request has an ignored project card`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAnyProjectCards: [`ignored-project`],
      }).addPullRequest({
        locked: false,
        projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
          nodes: [
            createHydratedMock<IGithubApiProjectCard>({
              project: {
                name: `ignored-project`,
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
});
