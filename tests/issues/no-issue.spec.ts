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

      expect(true).toBeTrue();
    });
  });
});
