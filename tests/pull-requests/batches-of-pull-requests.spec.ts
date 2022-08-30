import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

/**
 * Perfect to test the pagination
 */
describe(`Batch of pull requests`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when more than 20 pull requests are locked (two batches)`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor().addPullRequests(22, { locked: true });
    });

    it(`should not process the pull requests`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        calledApiPullRequestsQueriesCount: 2,
        ignoredPullRequestsCount: 22,
        processedPullRequestsCount: 22,
      });
    });
  });

  describe(`when more than 20 pull requests are stale and should be closed (two batches)`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 30,
        pullRequestStaleLabel: `stale`,
      })
        .addPullRequests(22, {
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

    it(`should not remove the stale state on the pull requests`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 22,
        alreadyStalePullRequestsCount: 22,
        calledApiPullRequestsMutationsCount: 44, // 22 comments + 22 close
        calledApiPullRequestsQueriesCount: 24, // 2 batch loaded + 22 loaded labels events
        closedPullRequestsCount: 22,
        processedPullRequestsCount: 22,
      });
    });
  });

  describe(`when more than 20 pull requests are stale and should stay stale (two batches)`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 30,
        pullRequestStaleLabel: `stale`,
      })
        .addPullRequests(22, {
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 21,
            })
            .toISO({
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
                          createdAt: DateTime.now()
                            .minus({
                              day: 20,
                            })
                            .toISO({
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

    it(`should not remove the stale state on the pull requests`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        alreadyStalePullRequestsCount: 22,
        calledApiPullRequestsQueriesCount: 24, // 2 batch loaded + 22 loaded labels events
        processedPullRequestsCount: 22,
        unalteredPullRequestsCount: 22,
      });
    });
  });
});
