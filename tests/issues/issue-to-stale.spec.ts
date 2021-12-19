import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue last update was older than 30 days`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
      }).addIssue({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
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
});
