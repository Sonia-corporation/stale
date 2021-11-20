import { IssueProcessor } from '@core/issues/issue-processor';
import { GITHUB_API_CLOSE_ISSUE_MUTATION } from '@github/api/issues/constants/github-api-close-issue-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiIssuesService`, (): void => {
  let issueProcessor: IssueProcessor;

  it(`should load 20 issues per batch`, (): void => {
    expect.assertions(1);

    expect(GithubApiIssuesService.issuesPerPage).toBe(20);
  });

  describe(`fetchIssues()`, (): void => {
    let graphqlMock: jest.Mock;

    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceNoticeSpy: jest.SpyInstance;
    let octokitServiceGetOctokitSpy: jest.SpyInstance;

    beforeEach((): void => {
      graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));

      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      loggerServiceNoticeSpy = jest.spyOn(LoggerService, `notice`).mockImplementation();
      octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
        // @ts-ignore
        graphql: graphqlMock,
      });
      jest.spyOn(context, `repo`, `get`).mockReturnValue({
        owner: `dummy-owner`,
        repo: `dummy-repo`,
      });
    });

    it(`should fetch the open issues (20 per page) per update date from oldest first`, async (): Promise<void> => {
      expect.assertions(7);

      await expect(GithubApiIssuesService.fetchIssues()).rejects.toThrow(new Error(`graphql error`));

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`Fetching the issues from GitHub...`);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
      expect(graphqlMock).toHaveBeenCalledTimes(1);
      expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ISSUES_QUERY, {
        afterCursor: undefined,
        issuesPerPage: 20,
        labelsPerIssue: 20,
        owner: `dummy-owner`,
        repository: `dummy-repo`,
      });
    });

    describe(`when the issues failed to be fetched`, (): void => {
      beforeEach((): void => {
        graphqlMock.mockRejectedValue(new Error(`graphql error`));
      });

      it(`should log about the error and rethrow it`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(GithubApiIssuesService.fetchIssues()).rejects.toThrow(new Error(`graphql error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`Failed to fetch the issues`);
      });
    });

    describe(`when the issues were successfully fetched`, (): void => {
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>();

        graphqlMock.mockResolvedValue(githubApiIssues);
      });

      describe(`when zero issue was fetched`, (): void => {
        beforeEach((): void => {
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                totalCount: 0,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiIssues);
        });

        describe(`when the issues are fetched from the start`, (): void => {
          it(`should log that zero issue was fetched`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiIssuesService.fetchIssues();

            expect(loggerServiceNoticeSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceNoticeSpy).toHaveBeenCalledWith(`No issue can be processed`);
          });
        });

        describe(`when the issues are fetched from the a previous page`, (): void => {
          it(`should not log the number of fetched issues`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiIssuesService.fetchIssues(faker.datatype.string());

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe(`when one issue was fetched`, (): void => {
        beforeEach((): void => {
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                totalCount: 1,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiIssues);
        });

        describe(`when the issues are fetched from the start`, (): void => {
          it(`should log the number of fetched issues`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiIssuesService.fetchIssues();

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `value-1`, `whiteBright-issue can be processed`);
          });
        });

        describe(`when the issues are fetched from the a previous page`, (): void => {
          it(`should not log the number of fetched issues`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiIssuesService.fetchIssues(faker.datatype.string());

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe(`when multiple issues were fetched`, (): void => {
        beforeEach((): void => {
          githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
            repository: {
              issues: {
                totalCount: 2,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiIssues);
        });

        describe(`when the issues are fetched from the start`, (): void => {
          it(`should log the number of fetched issues`, async (): Promise<void> => {
            expect.assertions(2);

            await GithubApiIssuesService.fetchIssues();

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `value-2`, `whiteBright-issues can be processed`);
          });
        });

        describe(`when the issues are fetched from the a previous page`, (): void => {
          it(`should not log the number of fetched issues`, async (): Promise<void> => {
            expect.assertions(1);

            await GithubApiIssuesService.fetchIssues(faker.datatype.string());

            expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      it(`should return the issues`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await GithubApiIssuesService.fetchIssues();

        expect(result).toStrictEqual(githubApiIssues);
      });
    });
  });

  describe(`constructor()`, (): void => {
    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiIssuesService(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiIssuesService: GithubApiIssuesService;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`removeLabelFromIssue()`, (): void => {
      let issueId: IUuid;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiIssuesService = new GithubApiIssuesService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
      });

      it(`should close the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiIssuesService.closeIssue(issueId)).rejects.toThrow(new Error(`graphql error`));

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Closing the issue`,
          `value-${issueId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_CLOSE_ISSUE_MUTATION, {
          issueId,
        });
      });

      describe(`when the issue failed to be closed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiIssuesService.closeIssue(issueId)).rejects.toThrow(new Error(`graphql error`));

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(`Failed to close the issue`, `value-${issueId}`);
        });
      });

      describe(`when the issue was successfully closed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the closing`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiIssuesService.closeIssue(issueId);

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Issue`,
            `value-${issueId}`,
            `green-closed`
          );
        });
      });
    });
  });
});
