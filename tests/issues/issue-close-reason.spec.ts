import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with close reason`, (): void => {
  let issueSut: FakeIssuesProcessor;
  let closeReason: ECloseReason;

  describe(`when the input "issue-close-reason" is set to completed`, (): void => {
    beforeEach((): void => {
      closeReason = ECloseReason.COMPLETED;
    });

    describe(`when an issue is stale and was not recently updated`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueCloseReason: closeReason,
          issueDaysBeforeClose: 10,
          issueDaysBeforeStale: 30,
          issueStaleLabel: `stale`,
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

      it(`should close the issue with the completed reason`, async (): Promise<void> => {
        expect.assertions(11);

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
  });

  describe(`when the input "issue-close-reason" is set to not planned`, (): void => {
    beforeEach((): void => {
      closeReason = ECloseReason.NOT_PLANNED;
    });

    describe(`when an issue is stale and was not recently updated`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueCloseReason: closeReason,
          issueDaysBeforeClose: 10,
          issueDaysBeforeStale: 30,
          issueStaleLabel: `stale`,
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

      it(`should close the issue with the not planned reason`, async (): Promise<void> => {
        expect.assertions(11);

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
  });
});
