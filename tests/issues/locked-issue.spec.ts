import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`Locked issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue is locked`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssue({
        locked: true,
      });
    });

    it(`should ignore the issue`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        ignoredIssuesCount: 1,
        processedIssuesCount: 1,
      });
    });
  });

  describe(`when multiple issues are locked`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor()
        .addIssue({
          locked: true,
        })
        .addIssue({
          locked: true,
        });
    });

    it(`should ignore the issues`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        ignoredIssuesCount: 2,
        processedIssuesCount: 2,
      });
    });
  });
});
