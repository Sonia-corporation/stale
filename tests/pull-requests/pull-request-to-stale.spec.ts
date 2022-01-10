import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to stale`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request last update was older than 30 days`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
      }).addPullRequest({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO({
            includeOffset: false,
          }),
      });
    });

    it(`should stale the pull request`, async (): Promise<void> => {
      expect.assertions(10);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount$$).toBe(1);
    });
  });
});
