import { StatisticsService } from '@core/statistics/statistics.service';
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
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(1);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
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
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(2);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(2);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });
  });
});
