import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
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
        expect.assertions(8);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(1);
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
        expect.assertions(8);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
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
        expect.assertions(8);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
      });
    });
  });
});
