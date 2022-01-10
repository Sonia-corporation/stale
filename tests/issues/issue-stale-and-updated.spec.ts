import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue stale and updated`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue is stale and was recently updated`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueStaleLabel: `stale`,
      })
        .addIssue({
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

    it(`should remove the stale state on the issue`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount$$).toBe(0);
    });
  });
});
