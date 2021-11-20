import { StatisticsService } from '@core/statistics/statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`No issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when there is no issue to process`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().removeAllIssues();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(0);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });
  });
});
