import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Pull request to stale extra labels`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should not have extra labels when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [],
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

    it(`should stale the pull request and not add some extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(1);
    });
  });

  describe(`when the pull request should add one more label when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [`extra-stale-label`],
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

    it(`should stale the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(2);
    });
  });

  describe(`when the pull request should add three more labels when stale`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`],
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

    it(`should stale the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(4);
    });
  });

  describe(`when the dry-run is enabled`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        dryRun: true,
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

    describe(`when the pull request should add three more labels when stale`, (): void => {
      beforeEach((): void => {
        pullRequestSut.setExtraStaleLabels([`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`]);
      });

      it(`should stale the pull request and not add some extra labels`, async (): Promise<void> => {
        expect.assertions(9);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
      });
    });
  });
});
