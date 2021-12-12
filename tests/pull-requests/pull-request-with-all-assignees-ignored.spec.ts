import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all assignees ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the assignees`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllAssignees: true,
      });
    });

    describe(`when there is no assignee on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          assignees: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
      });
    });

    describe(`when there is one assignee on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          assignees: {
            nodes: [createHydratedMock<IGithubApiAssignee>()],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
      });
    });
  });
});
