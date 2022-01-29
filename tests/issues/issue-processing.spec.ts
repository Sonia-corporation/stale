import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`Issue processing`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when there is at least one issue to process`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor().addIssue({
        locked: true,
      });
    });

    describe(`when the processing is enabled`, (): void => {
      beforeEach((): void => {
        issueSut.enableProcessing();
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          ignoredIssuesCount: 1,
          processedIssuesCount: 1,
        });
      });
    });

    describe(`when the processing is disabled`, (): void => {
      beforeEach((): void => {
        issueSut.disableProcessing();
      });

      it(`should not process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect();
      });
    });
  });
});
