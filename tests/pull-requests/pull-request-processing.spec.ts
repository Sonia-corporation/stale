import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';

describe(`Pull request processing`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when there is at least one pull request to process`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequest({
        locked: true,
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.enableProcessing();
      });

      it(`should process the pull request`, async (): Promise<void> => {
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

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.disableProcessing();
      });

      it(`should not process the pull request`, async (): Promise<void> => {
        expect.assertions(10);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
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
