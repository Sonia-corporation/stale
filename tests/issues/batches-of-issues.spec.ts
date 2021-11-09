import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

/**
 * Perfect to test the pagination
 */
describe(`Batch of issues`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor();
  });

  describe(`when more than 20 issues are locked`, (): void => {
    beforeEach((): void => {
      issueSut.addXLockedIssues(30);
    });

    it(`should not process the issues`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
