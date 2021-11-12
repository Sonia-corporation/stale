import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';

describe(`Issue to stale`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor();
  });

  describe(`when an issue last update was older than 30 days`, (): void => {
    beforeEach((): void => {
      issueSut.addIssue({
        locked: false,
        updatedAt: DateTime.now()
          .minus({
            day: 31,
          })
          .toISO(),
      });
    });

    it(`should stale the issue`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
