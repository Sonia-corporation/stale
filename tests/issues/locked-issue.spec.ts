import { IssueSut } from '@tests/utils/issue-sut';

describe(`Locked issue`, (): void => {
  let issueSut: IssueSut;

  beforeEach((): void => {
    issueSut = new IssueSut();
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
