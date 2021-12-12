import { StatisticsService } from '@core/statistics/statistics.service';
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

      expect(StatisticsService.processedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
