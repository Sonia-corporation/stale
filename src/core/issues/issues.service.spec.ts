import { IssueProcessor } from './issue-processor';
import { IssuesService } from './issues.service';
import { IGitHubApiIssue } from '../../github/api/issues/github-api-issue.interface';
import { IGithubApiIssues } from '../../github/api/issues/github-api-issues.interface';
import { GithubApiIssuesService } from '../../github/api/issues/github-api-issues.service';
import { LoggerService } from '../../utils/loggers/logger.service';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`../../utils/loggers/logger.service`);
jest.mock(`../../utils/loggers/logger-format.service`);
jest.mock(`./issue-processor`);

describe(`IssuesService`, (): void => {
  describe(`process()`, (): void => {
    const mockedIssueProcessor: MockedObjectDeep<typeof IssueProcessor> = mocked(IssueProcessor, true);
    let gitHubApiIssue1: IGitHubApiIssue;
    let gitHubApiIssue2: IGitHubApiIssue;
    let githubApiIssues: IGithubApiIssues;

    let githubApiIssuesServiceFetchIssuesSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedIssueProcessor.mockClear();
      gitHubApiIssue1 = createHydratedMock<IGitHubApiIssue>();
      gitHubApiIssue2 = createHydratedMock<IGitHubApiIssue>();
      githubApiIssues = createHydratedMock<IGithubApiIssues>({
        repository: {
          issues: {
            nodes: [gitHubApiIssue1, gitHubApiIssue2],
          },
        },
      });

      githubApiIssuesServiceFetchIssuesSpy = jest
        .spyOn(GithubApiIssuesService, `fetchIssues`)
        .mockResolvedValue(githubApiIssues);
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should fetch the issues to process`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.process();

      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledTimes(1);
      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledWith();
    });

    it(`should process every issues`, async (): Promise<void> => {
      expect.assertions(6);

      await IssuesService.process();

      expect(mockedIssueProcessor).toHaveBeenCalledTimes(2);
      expect(mockedIssueProcessor).toHaveBeenNthCalledWith(1, gitHubApiIssue1);
      expect(mockedIssueProcessor).toHaveBeenNthCalledWith(2, gitHubApiIssue2);
      expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(2);
      expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
      expect(mockedIssueProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
    });

    it(`should log when all the issues were processed`, async (): Promise<void> => {
      expect.assertions(2);

      await IssuesService.process();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`green-All issues were processed`);
    });
  });
});
