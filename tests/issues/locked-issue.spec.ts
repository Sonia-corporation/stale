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
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(0);
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
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(2);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(2);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(0);
    });
  });
});
