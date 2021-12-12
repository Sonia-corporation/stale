import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request to close comment`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should be commented when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestCloseComment: `close-comment`,
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
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

    it(`should close the pull request and add a close comment`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(1);
    });
  });

  describe(`when the pull request should not be commented when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestCloseComment: ``,
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
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

    it(`should close the pull request and not add a close comment`, async (): Promise<void> => {
      expect.assertions(8);

      await pullRequestSut.process();

      expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
      expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(1);
      expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
    });
  });
});
