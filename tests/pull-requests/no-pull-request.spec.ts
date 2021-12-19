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

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
