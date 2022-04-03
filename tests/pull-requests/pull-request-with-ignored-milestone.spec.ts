import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with ignored milestone`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request has an ignored milestone`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAnyMilestones: [`ignored-milestone`],
      }).addPullRequest({
        locked: false,
        milestone: createHydratedMock<IGithubApiMilestone>({
          title: `ignored-milestone`,
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
