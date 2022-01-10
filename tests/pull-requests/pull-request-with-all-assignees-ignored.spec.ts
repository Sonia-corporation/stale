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
        expect.assertions(10);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
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
        expect.assertions(10);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
      });
    });
  });
});
