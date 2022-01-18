import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`Issue processing`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when there is at least one issue to process`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssue({
        locked: true,
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        issueSut.enableProcessing();
      });

      it(`should process the issue`, async (): Promise<void> => {
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

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        issueSut.disableProcessing();
      });

      it(`should not process the issue`, async (): Promise<void> => {
        expect.assertions(9);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(0);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(0);
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
});
