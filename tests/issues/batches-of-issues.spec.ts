import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

/**
 * Perfect to test the pagination
 */
describe(`Batch of issues`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when more than 20 issues are locked (two batches)`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssues(22, { locked: true });
    });

    it(`should not process the issues`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 2,
        ignoredIssuesCount: 22,
        processedIssuesCount: 22,
      });
    });
  });
});
