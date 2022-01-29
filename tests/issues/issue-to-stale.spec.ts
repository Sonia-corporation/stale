import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue last update was older than 30 days`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
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

    it(`should stale the issue`, async (): Promise<void> => {
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
});
