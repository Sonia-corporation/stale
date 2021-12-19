import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue stale not updated`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue is stale and was not recently updated`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
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

    it(`should not remove the stale state on the issue`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(1);
    });
  });
});
