import { StatisticsService } from '@core/statistics/statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Custom days before issue stale`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the number of days before stale is set to 20`, (): void => {
    describe(`when an issue last update was older than 20 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 21,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should stale the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await issueSut.process();

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
        expect(StatisticsService.staleIssuesCount$$).toBe(1);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closeIssuesCount$$).toBe(0);
      });
    });

    describe(`when an issue last update is 20 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 20,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the issue`, async (): Promise<void> => {
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

    describe(`when an issue last update is 19 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 19,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the issue`, async (): Promise<void> => {
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
  });
});
