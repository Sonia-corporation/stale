import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
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
      expect.assertions(10);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount$$).toBe(0);
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
      expect.assertions(10);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(2);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(2);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount$$).toBe(0);
    });
  });
});
