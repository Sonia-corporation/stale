import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with ignored project`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request has an ignored project`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAnyProjects: [`ignored-project`],
      }).addPullRequest({
        locked: false,
        projectsV2: createHydratedMock<IGithubApiProjectsPagination>({
          nodes: [
            createHydratedMock<IGithubApiProject>({
              title: `ignored-project`,
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
});
