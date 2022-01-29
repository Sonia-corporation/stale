import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

/**
 * Perfect to test the pagination
 */
describe(`Batch of issues`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when more than 20 issues are locked (two batches)`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssues(22, { locked: true });
    });

    it(`should not process the issues`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(22);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(22);
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
