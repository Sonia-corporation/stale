import { IssueSut } from '@tests/utils/issue-sut';

describe(`No issue`, (): void => {
  let issueSut: IssueSut;

  beforeEach((): void => {
    issueSut = new IssueSut();
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
