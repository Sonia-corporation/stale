import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request stale and updated`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request is stale and was recently updated`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeStale: 30,
        pullRequestStaleLabel: `stale`,
      })
        .addPullRequest({
          labels: {
            nodes: [
              {
                id: faker.datatype.uuid(),
                name: `stale`, // Already stale
              },
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.now().toISO({
            includeOffset: false,
          }), // Updated right now
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
                          createdAt: faker.date.past().toISOString(), // Updated in the past
                          label: {
                            id: faker.datatype.uuid(),
                            name: `stale`,
                          },
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

    it(`should remove the stale state on the pull request`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
