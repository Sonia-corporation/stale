import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request to close add extra labels`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request should not have extra labels added when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterClose: [],
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
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
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
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
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

    it(`should close the pull request and not add some extra labels`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        alreadyStalePullRequestsCount: 1,
        calledApiPullRequestsMutationsCount: 2,
        calledApiPullRequestsQueriesCount: 2,
        closedPullRequestsCount: 1,
        processedPullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should add one more label when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterClose: [`extra-close-label`],
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
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
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
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
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

    it(`should close the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 1,
        alreadyStalePullRequestsCount: 1,
        calledApiPullRequestsMutationsCount: 3,
        calledApiPullRequestsQueriesCount: 3,
        closedPullRequestsCount: 1,
        processedPullRequestsCount: 1,
      });
    });
  });

  describe(`when the pull request should add three more labels when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestAddLabelsAfterClose: [`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`],
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
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
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
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
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

    it(`should close the pull request and add the extra labels`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        addedPullRequestsLabelsCount: 3,
        alreadyStalePullRequestsCount: 1,
        calledApiPullRequestsMutationsCount: 3,
        calledApiPullRequestsQueriesCount: 5,
        closedPullRequestsCount: 1,
        processedPullRequestsCount: 1,
      });
    });
  });

  describe(`when the dry-run is enabled`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        dryRun: true,
        issueDaysBeforeClose: 10,
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
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
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
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
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

    describe(`when the pull request should add three more labels when closed`, (): void => {
      beforeEach((): void => {
        pullRequestSut.setExtraAddedCloseLabels([`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`]);
      });

      it(`should close the pull request and not add some extra labels`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          addedPullRequestsLabelsCount: 3,
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsQueriesCount: 2,
          closedPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });
});
