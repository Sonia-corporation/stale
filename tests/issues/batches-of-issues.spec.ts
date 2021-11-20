import { StatisticsService } from '@core/statistics/statistics.service';
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
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(22);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(22);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });
  });
});
