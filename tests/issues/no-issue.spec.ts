import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`No issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when there is no issue to process`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().removeAllIssues();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.processedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
