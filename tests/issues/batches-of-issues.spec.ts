import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

/**
 * Perfect to test the pagination
 */
describe(`Batch of issues`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when more than 20 issues are locked (two batches)`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssues(22, { locked: true });
    });

    it(`should not process the issues`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 2,
        ignoredIssuesCount: 22,
        processedIssuesCount: 22,
      });
    });
  });

  describe(`when more than 20 issues are stale and should be closed (two batches)`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeClose: 30,
        issueStaleLabel: `stale`,
      })
        .addIssues(22, {
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

    it(`should not remove the stale state on the issues`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 22,
        alreadyStaleIssuesCount: 22,
        calledApiIssuesMutationsCount: 44, // 22 comments + 22 close
        calledApiIssuesQueriesCount: 24, // 2 batch loaded + 22 loaded labels events
        closedIssuesCount: 22,
        processedIssuesCount: 22,
      });
    });
  });

  describe(`when more than 20 issues are stale and should stay stale (two batches)`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeClose: 30,
        issueStaleLabel: `stale`,
      })
        .addIssues(22, {
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

    it(`should not remove the stale state on the issues`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        alreadyStaleIssuesCount: 22,
        calledApiIssuesQueriesCount: 24, // 2 batch loaded + 22 loaded labels events
        processedIssuesCount: 22,
        unalteredIssuesCount: 22,
      });
    });
  });
});
