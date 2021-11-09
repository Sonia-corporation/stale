import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';

describe(`Locked issue`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor();
  });

  describe(`when an issue is locked`, (): void => {
    beforeEach((): void => {
      issueSut.addIssue({
        locked: true,
      });
    });

    it(`should not process the issue`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });

  describe(`when multiple issues are locked`, (): void => {
    beforeEach((): void => {
      issueSut
        .addIssue({
          locked: true,
        })
        .addIssue({
          locked: true,
        });
    });

    it(`should not process the issues`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
