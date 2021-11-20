import { IssueCloseStaleProcessor } from '@core/issues/issue-close-stale-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueCloseStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiLabelsService`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.githubApiIssuesService$$).toBeInstanceOf(GithubApiIssuesService);
    });
  });

  describe(`after creation`, (): void => {
    let issueCloseStaleProcessor: IssueCloseStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`stale()`, (): void => {
      let issueId: IUuid;

      let githubApiIssuesServiceCloseIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueCloseStaleProcessor = new IssueCloseStaleProcessor(issueProcessor);

        githubApiIssuesServiceCloseIssueSpy = jest
          .spyOn(issueCloseStaleProcessor.githubApiIssuesService$$, `closeIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueCloseStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueCloseStaleProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
      });

      it(`should close the issue`, async (): Promise<void> => {
        expect.assertions(6);

        await issueCloseStaleProcessor.close();

        expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledTimes(1);
        expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledWith(issueId);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(`Closing this issue...`);
        expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Closed`);
      });
    });
  });
});
