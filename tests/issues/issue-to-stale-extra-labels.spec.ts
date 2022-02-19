import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale extra labels`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should not have extra labels when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterStale: [],
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

    it(`should stale the issue and not add some extra labels`, async (): Promise<void> => {
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

  describe(`when the issue should add one more label when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterStale: [`extra-stale-label`],
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

    it(`should stale the issue and add the extra labels`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        addedIssuesLabelsCount: 2,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 2,
        processedIssuesCount: 1,
        staleIssuesCount: 1,
      });
    });
  });

  describe(`when the issue should add three more labels when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueAddLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`],
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

    it(`should stale the issue and add the extra labels`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        addedIssuesLabelsCount: 4,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 4,
        processedIssuesCount: 1,
        staleIssuesCount: 1,
      });
    });
  });

  describe(`when the dry-run is enabled`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        dryRun: true,
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

    describe(`when the issue should add three more labels when stale`, (): void => {
      beforeEach((): void => {
        issueSut.setExtraStaleLabels([`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`]);
      });

      it(`should stale the issue and not add some extra labels`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          addedIssuesCommentsCount: 1,
          addedIssuesLabelsCount: 4,
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          staleIssuesCount: 1,
        });
      });
    });
  });
});
