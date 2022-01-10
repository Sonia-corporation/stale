import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request with ignored creation date`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the option to ignore based on the creation date has a date older than the pull request creation date`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreBeforeCreationDate: DateTime.utc(2021).toISO({
          includeOffset: false,
        }),
      }).addPullRequest({
        createdAt: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        locked: false,
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

  describe(`when the option to ignore based on the creation date has a date younger than the pull request creation date`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreBeforeCreationDate: DateTime.utc(2019).toISO({
          includeOffset: false,
        }),
      }).addPullRequest({
        createdAt: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        locked: false,
      });
    });

    it(`should not ignore the pull request`, async (): Promise<void> => {
      expect.assertions(10);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(1);
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
