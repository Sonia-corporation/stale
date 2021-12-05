import { StatisticsService } from '@core/statistics/statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale comment`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should be commented when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueStaleComment: `stale-comment`,
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

    it(`should stale the issue and add a stale comment`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(1);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closedIssuesCount$$).toBe(0);
      expect(StatisticsService.addedIssuesCommentsCount$$).toBe(1);
    });
  });

  describe(`when the issue should not be commented when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueStaleComment: ``,
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

    it(`should stale the issue and not add a stale comment`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(1);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closedIssuesCount$$).toBe(0);
      expect(StatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
