import { StatisticsService } from '@core/statistics/statistics.service';
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
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(1);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
