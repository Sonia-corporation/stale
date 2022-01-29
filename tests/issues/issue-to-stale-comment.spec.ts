import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
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
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(1);
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
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(1);
    });
  });
});
