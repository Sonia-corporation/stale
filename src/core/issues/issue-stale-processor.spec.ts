import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueStaleProcessor } from '@core/issues/issue-stale-processor';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`issueStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueStaleProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueStaleProcessor: IssueStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldBeStale()`, (): void => {
      beforeEach((): void => {});

      it.todo(``);
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      beforeEach((): void => {});

      it.todo(``);
    });
  });
});
