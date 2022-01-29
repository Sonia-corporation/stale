import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with ignored label`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request has an ignored label`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAnyLabels: [`ignored-label`],
      }).addPullRequest({
        labels: createHydratedMock<IGithubApiLabelsPagination>({
          nodes: [
            createHydratedMock<IGithubApiLabel>({
              name: `ignored-label`,
            }),
          ],
        }),
        locked: false,
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
