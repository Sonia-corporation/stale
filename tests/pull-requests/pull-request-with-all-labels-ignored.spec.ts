import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all labels ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the labels`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllLabels: true,
        pullRequestStaleLabel: `stale`,
      });
    });

    describe(`when there is no label on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          labels: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
      });
    });

    describe(`when there is one label on the pull request which is identical to the stale label`, (): void => {
      beforeEach((): void => {
        pullRequestSut
          .addPullRequest({
            labels: {
              nodes: [
                createHydratedMock<IGithubApiLabel>({
                  name: `stale`,
                }),
              ],
              totalCount: 1,
            },
            locked: false,
            updatedAt: DateTime.now().toISO({
              includeOffset: false,
            }),
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
                            createdAt: DateTime.now().toISO({
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

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
      });
    });

    describe(`when there is one label on the pull request which is different than the stale label`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `not-stale`,
              }),
            ],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$).toBe(0);
      });
    });
  });
});
