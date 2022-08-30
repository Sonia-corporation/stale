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
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        ignoredIssuesCount: 1,
        processedIssuesCount: 1,
      });
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
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        processedIssuesCount: 1,
        unalteredIssuesCount: 1,
      });
    });
  });
});
