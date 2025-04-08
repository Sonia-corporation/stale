import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue to close remove extra labels`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should not have extra labels removed when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterClose: [],
      })
        .addIssue({
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
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
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

    it(`should close the issue and not remove some extra labels`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        alreadyStaleIssuesCount: 1,
        calledApiIssuesMutationsCount: 2,
        calledApiIssuesQueriesCount: 2,
        closedIssuesCount: 1,
        processedIssuesCount: 1,
      });
    });
  });

  describe(`when the issue should remove one more label when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterClose: [`extra-close-label`],
      })
        .addIssue({
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
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
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

    it(`should close the issue and remove the extra labels`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        alreadyStaleIssuesCount: 1,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 3,
        closedIssuesCount: 1,
        processedIssuesCount: 1,
        removedIssuesLabelsCount: 1,
      });
    });
  });

  describe(`when the issue should remove three more labels when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterClose: [`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`],
      })
        .addIssue({
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
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
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

    it(`should close the issue and remove the extra labels`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        alreadyStaleIssuesCount: 1,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 5,
        closedIssuesCount: 1,
        processedIssuesCount: 1,
        removedIssuesLabelsCount: 3,
      });
    });
  });

  describe(`when the dry-run is enabled`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        dryRun: true,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
      })
        .addIssue({
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
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
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

    describe(`when the issue should remove three more labels when closes`, (): void => {
      beforeEach((): void => {
        issueSut.setExtraRemovedCloseLabels([`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`]);
      });

      it(`should close the issue and not remove some extra labels`, async (): Promise<void> => {
        expect.assertions(12);

        await issueSut.process();

        issueSut.expect({
          addedIssuesCommentsCount: 1,
          alreadyStaleIssuesCount: 1,
          calledApiIssuesQueriesCount: 2,
          closedIssuesCount: 1,
          processedIssuesCount: 1,
          removedIssuesLabelsCount: 3,
        });
      });
    });
  });
});
