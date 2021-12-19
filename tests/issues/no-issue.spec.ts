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

      expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
