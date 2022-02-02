import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issues limit API queries calls count`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the limit of issues API queries calls count is set to -1`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueLimitApiQueriesCount: -1,
      });
    });

    describe(`when there is 1 issue to process`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
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

  describe(`when the limit of issues API queries calls count is set to 0`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueLimitApiQueriesCount: 0,
      });
    });

    describe(`when there is 1 issue to process`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
        });
      });

      it(`should not process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
        });
      });
    });
  });

  describe(`when the limit of issues API queries calls count is set to 1`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueDaysBeforeStale: 30,
        issueLimitApiQueriesCount: 1,
      });
    });

    describe(`when there is 1 issue to process`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });

    describe(`when there is 2 issues to process`, (): void => {
      beforeEach((): void => {
        issueSut
          .addIssue({
            locked: false,
          })
          .addIssue({
            locked: false,
          });
      });

      it(`should process all the issues`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 2,
          unalteredIssuesCount: 2,
        });
      });
    });

    describe(`when there is 2 issues to process which should be stale`, (): void => {
      beforeEach((): void => {
        issueSut
          .addIssue({
            locked: false,
            updatedAt: DateTime.now()
              .minus({
                day: 31,
              })
              .toISO({
                includeOffset: false,
              }),
          })
          .addIssue({
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

      it(`should only process the first issue (due to the query to fetch the stale label)`, async (): Promise<void> => {
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
});
