import { StatisticsService } from '@core/statistics/statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`Locked pull request`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is locked`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequest({
        locked: true,
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

  describe(`when multiple pull requests are locked`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor()
        .addPullRequest({
          locked: true,
        })
        .addPullRequest({
          locked: true,
        });
    });

    it(`should ignore the pull requests`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(2);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(2);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
