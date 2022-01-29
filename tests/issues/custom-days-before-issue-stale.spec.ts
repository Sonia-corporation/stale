import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Custom days before issue stale`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the number of days before stale is set to 20`, (): void => {
    describe(`when an issue last update was older than 20 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 21,
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

    describe(`when an issue last update is 20 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 20,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });

    describe(`when an issue last update is 19 days`, (): void => {
      beforeEach((): void => {
        issueSut = new FakeIssuesProcessor({
          issueDaysBeforeStale: 20,
        }).addIssue({
          locked: false,
          updatedAt: DateTime.now()
            .minus({
              day: 19,
            })
            .toISO({
              includeOffset: false,
            }),
        });
      });

      it(`should not stale the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });
  });
});
