import { StatisticsService } from '@core/statistics/statistics.service';
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
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(1);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(1);
    });
  });
});
