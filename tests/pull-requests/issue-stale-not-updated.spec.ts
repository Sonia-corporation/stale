import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request stale not updated`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is stale and was not recently updated`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestStaleLabel: `stale`,
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

    it(`should not remove the stale state on the pull request`, async (): Promise<void> => {
      expect.assertions(10);

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
    });
  });
});
