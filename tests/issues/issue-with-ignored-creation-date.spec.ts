import { StatisticsService } from '@core/statistics/statistics.service';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue with ignored creation date`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the option to ignore based on the creation date has a date older than the issue creation date`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreBeforeCreationDate: DateTime.utc(2021).toISO({
          includeOffset: false,
        }),
      }).addIssue({
        createdAt: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        locked: false,
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

  describe(`when the option to ignore based on the creation date has a date younger than the issue creation date`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreBeforeCreationDate: DateTime.utc(2019).toISO({
          includeOffset: false,
        }),
      }).addIssue({
        createdAt: DateTime.utc(2020).toISO({
          includeOffset: false,
        }),
        locked: false,
      });
    });

    it(`should not ignore the issue`, async (): Promise<void> => {
      expect.assertions(7);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(1);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closeIssuesCount$$).toBe(0);
    });
  });
});
