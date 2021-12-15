import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`Locked issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue is locked`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssue({
        locked: true,
      });
    });

    it(`should ignore the issue`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });

  describe(`when multiple issues are locked`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor()
        .addIssue({
          locked: true,
        })
        .addIssue({
          locked: true,
        });
    });

    it(`should ignore the issues`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(2);
      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(2);
      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
