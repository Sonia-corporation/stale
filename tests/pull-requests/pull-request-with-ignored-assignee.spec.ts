import { StatisticsService } from '@core/statistics/statistics.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiAssigneesPagination } from '@github/api/labels/interfaces/github-api-assignees-pagination.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with ignored assignee`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request has an ignored assignee`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAnyAssignees: [`ignored-assignee`],
      }).addPullRequest({
        assignees: createHydratedMock<IGithubApiAssigneesPagination>({
          nodes: [
            createHydratedMock<IGithubApiAssignee>({
              login: `ignored-assignee`,
            }),
          ],
        }),
        locked: false,
      });
    });

    it(`should ignore the pull request`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(1);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
