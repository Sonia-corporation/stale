import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`No issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor();
  });

  describe(`when there is no issue to process`, (): void => {
    beforeEach((): void => {
      issueSut.removeAllIssues();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
