import { StatisticsService } from '@core/statistics/statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request to close`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is stale and was not recently updated`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 10,
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

    it(`should close the pull request`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(StatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(StatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(StatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.alreadyStalePullRequestsCount$$).toBe(1);
      expect(StatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(StatisticsService.closedPullRequestsCount$$).toBe(1);
      expect(StatisticsService.addedPullRequestsCommentsCount$$).toBe(1);
    });
  });
});
