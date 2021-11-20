import { StatisticsService } from '@core/statistics/statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with all labels ignored`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue should ignore all the labels`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAllLabels: true,
        issueStaleLabel: `stale`,
      });
    });

    describe(`when there is no label on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          labels: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await issueSut.process();

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(1);
        expect(StatisticsService.staleIssuesCount$$).toBe(0);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closeIssuesCount$$).toBe(0);
      });
    });

    describe(`when there is one label on the issue which is identical to the stale label`, (): void => {
      beforeEach((): void => {
        issueSut
          .addIssue({
            labels: {
              nodes: [
                createHydratedMock<IGithubApiLabel>({
                  name: `stale`,
                }),
              ],
              totalCount: 1,
            },
            locked: false,
            updatedAt: DateTime.now().toISO({
              includeOffset: false,
            }),
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
                            createdAt: DateTime.now().toISO({
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

      it(`should not ignore the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await issueSut.process();

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(1);
        expect(StatisticsService.staleIssuesCount$$).toBe(0);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(1);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closeIssuesCount$$).toBe(0);
      });
    });

    describe(`when there is one label on the issue which is different than the stale label`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `not-stale`,
              }),
            ],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await issueSut.process();

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(1);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
        expect(StatisticsService.staleIssuesCount$$).toBe(0);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closeIssuesCount$$).toBe(0);
      });
    });
  });
});
