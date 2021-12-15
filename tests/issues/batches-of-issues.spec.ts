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
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(22);
      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(22);
      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
