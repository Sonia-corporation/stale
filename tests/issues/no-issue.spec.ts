import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`No issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when there is no issue to process`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().removeAllIssues();
    });

    it(`should do nothing`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
      });
    });
  });
});
