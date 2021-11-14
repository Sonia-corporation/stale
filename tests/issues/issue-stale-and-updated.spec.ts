import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue stale and updated`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor({
      issueDaysBeforeStale: 30,
      issueStaleLabel: `stale`,
    });
  });

  describe(`when an issue is stale and was recently updated`, (): void => {
    beforeEach((): void => {
      issueSut
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
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
