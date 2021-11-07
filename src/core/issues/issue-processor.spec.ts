import { IssueLogger } from './issue-logger';
import { IssueProcessor } from './issue-processor';
import { IGitHubApiIssue } from '../../github/api/issues/github-api-issue.interface';
import * as CreateLinkModule from '../../utils/links/create-link';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`../../utils/loggers/logger.service`);
jest.mock(`../../utils/loggers/logger-format.service`);
jest.mock(`./issue-logger`);

describe(`IssueProcessor`, (): void => {
  let gitHubApiIssue: IGitHubApiIssue;

  beforeEach((): void => {
    gitHubApiIssue = createHydratedMock<IGitHubApiIssue>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue`, (): void => {
      expect.assertions(1);

      const result = new IssueProcessor(gitHubApiIssue);

      expect(result.githubIssue$$).toStrictEqual(gitHubApiIssue);
    });

    it(`should create a logger just for this issue`, (): void => {
      expect.assertions(3);
      const mockedIssueLogger: MockedObjectDeep<typeof IssueLogger> = mocked(IssueLogger, true);
      gitHubApiIssue = createHydratedMock<IGitHubApiIssue>({
        number: 8,
      });

      const result = new IssueProcessor(gitHubApiIssue);

      expect(mockedIssueLogger).toHaveBeenCalledTimes(1);
      expect(mockedIssueLogger).toHaveBeenCalledWith(8);
      expect(result.logger$$).toBeInstanceOf(IssueLogger);
    });
  });

  describe(`after creation`, (): void => {
    let issueProcessor: IssueProcessor;

    beforeEach((): void => {
      gitHubApiIssue = createHydratedMock<IGitHubApiIssue>({
        number: 8,
        url: `dummy-url`,
      });
      issueProcessor = new IssueProcessor(gitHubApiIssue);
    });

    describe(`process()`, (): void => {
      let loggerStartGroupSpy: jest.SpyInstance;
      let loggerEndGroupSpy: jest.SpyInstance;
      let createLinkSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerStartGroupSpy = jest.spyOn(issueProcessor.logger$$, `startGroup`).mockImplementation();
        loggerEndGroupSpy = jest.spyOn(issueProcessor.logger$$, `endGroup`).mockImplementation();
        createLinkSpy = jest.spyOn(CreateLinkModule, `createLink`).mockReturnValue(`dummy-link`);
      });

      it(`should log in a group about this issue being processed`, async (): Promise<void> => {
        expect.assertions(4);

        await issueProcessor.process();

        expect(createLinkSpy).toHaveBeenCalledTimes(1);
        expect(createLinkSpy).toHaveBeenCalledWith(`8`, `dummy-url`);
        expect(loggerStartGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerStartGroupSpy).toHaveBeenCalledWith(`Processing issue magenta-dummy-link...`);
      });

      it(`should stop to group logger for this issue`, async (): Promise<void> => {
        expect.assertions(2);

        await issueProcessor.process();

        expect(loggerEndGroupSpy).toHaveBeenCalledTimes(1);
        expect(loggerEndGroupSpy).toHaveBeenCalledWith();
      });
    });
  });
});
