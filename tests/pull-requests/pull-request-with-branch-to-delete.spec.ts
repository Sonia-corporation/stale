import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with branch to delete`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request branch should be deleted when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
        pullRequestDeleteBranchAfterClose: true,
      })
        .addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.utc(2021).toISO({
            includeOffset: false,
          }), // No update since last stale
        })
        .mockTimelineItemsPullRequestLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt: DateTime.utc(2021).toISO({
                            includeOffset: false,
                          }), // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    describe(`when the dry-run is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.dryRun();
      });

      it(`should close the pull request without deleting the related branch`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
      });
    });

    describe(`when the dry-run is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.normalRun();
      });

      it(`should close the pull request and delete the related branch`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
      });
    });
  });

  describe(`when the pull request branch should not be deleted when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
        pullRequestDeleteBranchAfterClose: false,
      })
        .addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.utc(2021).toISO({
            includeOffset: false,
          }), // No update since last stale
        })
        .mockTimelineItemsPullRequestLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt: DateTime.utc(2021).toISO({
                            includeOffset: false,
                          }), // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    it(`should close the pull request without deleting the related branch`, async (): Promise<void> => {
      expect.assertions(11);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(1);
      expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(0);
      expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(0);
    });
  });
});
