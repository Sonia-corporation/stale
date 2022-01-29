import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue to close extra labels`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should not have extra labels when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterClose: [],
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

    it(`should close the issue and not add some extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(0);
    });
  });

  describe(`when the issue should add one more label when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterClose: [`extra-close-label`],
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

    it(`should close the issue and add the extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(1);
    });
  });

  describe(`when the issue should add three more labels when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterClose: [`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`],
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

    it(`should close the issue and add the extra labels`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(3);
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

    describe(`when the issue should add three more labels when closes`, (): void => {
      beforeEach((): void => {
        issueSut.setExtraCloseLabels([`extra-close-label-1`, `extra-close-label-2`, `extra-close-label-3`]);
      });

      it(`should close the issue and not add some extra labels`, async (): Promise<void> => {
        expect.assertions(9);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(1);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(1);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(1);
        expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(3);
      });
    });
  });
});
