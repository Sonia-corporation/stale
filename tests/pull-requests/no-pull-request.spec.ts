import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`No pull request`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when there is no pull request to process`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().removeAllPullRequests();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
