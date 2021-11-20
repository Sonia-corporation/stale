import { StatisticsService } from '@core/statistics/statistics.service';
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
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(1);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(1);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });
  });
});
