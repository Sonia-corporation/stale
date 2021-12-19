import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
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
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
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
      expect.assertions(8);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(1);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
    });
  });
});
