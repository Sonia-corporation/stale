import { StatisticsService } from '@core/statistics/statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

/**
 * Perfect to test the pagination
 */
describe(`Batch of pull requests`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when more than 20 pull requests are locked (two batches)`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequests(22, { locked: true });
    });

    it(`should not process the pull requests`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(22);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(22);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
