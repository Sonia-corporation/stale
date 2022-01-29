import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale comment`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should be commented when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueStaleComment: `stale-comment`,
      }).addIssue({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO({
            includeOffset: false,
          }),
      });
    });

    it(`should stale the issue and add a stale comment`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        addedIssuesLabelsCount: 1,
        calledApiIssuesMutationsCount: 2,
        calledApiIssuesQueriesCount: 2,
        processedIssuesCount: 1,
        staleIssuesCount: 1,
      });
    });
  });

  describe(`when the issue should not be commented when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueStaleComment: ``,
      }).addIssue({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO({
            includeOffset: false,
          }),
      });
    });

    it(`should stale the issue and not add a stale comment`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        addedIssuesLabelsCount: 1,
        calledApiIssuesMutationsCount: 1,
        calledApiIssuesQueriesCount: 2,
        processedIssuesCount: 1,
        staleIssuesCount: 1,
      });
    });
  });
});
