import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale remove extra labels`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should not have extra labels removed when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterStale: [],
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

    it(`should stale the issue and not remove some extra labels`, async (): Promise<void> => {
      expect.assertions(12);

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

  describe(`when the issue should remove one more label when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterStale: [`extra-stale-label`],
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

    it(`should stale the issue and remove the extra label`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        addedIssuesLabelsCount: 1,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 2,
        processedIssuesCount: 1,
        removedIssuesLabelsCount: 1,
        staleIssuesCount: 1,
      });
    });
  });

  describe(`when the issue should remove three more labels when stale`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueRemoveLabelsAfterStale: [`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`],
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

    it(`should stale the issue and remove the extra labels`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        addedIssuesCommentsCount: 1,
        addedIssuesLabelsCount: 1,
        calledApiIssuesMutationsCount: 3,
        calledApiIssuesQueriesCount: 4,
        processedIssuesCount: 1,
        removedIssuesLabelsCount: 3,
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

    describe(`when the issue should remove three more labels when stale`, (): void => {
      beforeEach((): void => {
        issueSut.setExtraRemovedStaleLabels([`extra-stale-label-1`, `extra-stale-label-2`, `extra-stale-label-3`]);
      });

      it(`should stale the issue and not remove the extra labels`, async (): Promise<void> => {
        expect.assertions(12);

        await issueSut.process();

        issueSut.expect({
          addedIssuesCommentsCount: 1,
          addedIssuesLabelsCount: 1,
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          removedIssuesLabelsCount: 3,
          staleIssuesCount: 1,
        });
      });
    });
  });
});
