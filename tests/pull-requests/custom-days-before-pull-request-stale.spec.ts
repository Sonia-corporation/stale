import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';

describe(`Custom days before pull request stale`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the number of days before stale is set to 20`, (): void => {
    describe(`when a pull request last update was older than 20 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 21,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should stale the pull request`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
      });
    });

    describe(`when a pull request last update is 20 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 20,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the pull request`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
      });
    });

    describe(`when a pull request last update is 19 days`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestDaysBeforeStale: 20,
        }).addPullRequest({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 19,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the pull request`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
      });
    });
  });
});
