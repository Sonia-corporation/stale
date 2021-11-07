import { IGithubApiIssues } from '@github/api/issues/github-api-issues.interface';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiIssuesService`, (): void => {
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
      expect(graphqlMock).toHaveBeenCalledWith(
        `
        query MyQuery($owner: String!, $repository: String!, $issuesPerPage: Int!) {
          repository(name: $repository, owner: $owner) {
            issues(orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN, first: $issuesPerPage) {
              pageInfo {
                hasNextPage
              }
              totalCount
              nodes {
                locked
                createdAt
                number
                updatedAt
                url
              }
            }
          }
        }
      `,
        {
          issuesPerPage: 20,
          owner: `dummy-owner`,
          repository: `dummy-repo`,
        }
      );
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
      let githubApiIssues: IGithubApiIssues;

      beforeEach((): void => {
        githubApiIssues = createHydratedMock<IGithubApiIssues>();

        graphqlMock.mockResolvedValue(githubApiIssues);
      });

      describe(`when zero issue was fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue(
            createHydratedMock<IGithubApiIssues>({
              repository: {
                issues: {
                  totalCount: 0,
                },
              },
            })
          );
        });

        it(`should log that zero issue was fetched`, async (): Promise<void> => {
          expect.assertions(2);

          await GithubApiIssuesService.fetchIssues();

          expect(loggerServiceNoticeSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceNoticeSpy).toHaveBeenCalledWith(`No issue fetched`);
        });
      });

      describe(`when one issue was fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue(
            createHydratedMock<IGithubApiIssues>({
              repository: {
                issues: {
                  totalCount: 1,
                },
              },
            })
          );
        });

        it(`should log the number of fetched issues`, async (): Promise<void> => {
          expect.assertions(2);

          await GithubApiIssuesService.fetchIssues();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `1 issue fetched`);
        });
      });

      describe(`when multiple issues were fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue(
            createHydratedMock<IGithubApiIssues>({
              repository: {
                issues: {
                  totalCount: 2,
                },
              },
            })
          );
        });

        it(`should log the number of fetched issues`, async (): Promise<void> => {
          expect.assertions(2);

          await GithubApiIssuesService.fetchIssues();

          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `2 issues fetched`);
        });
      });

      it(`should return the issues`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await GithubApiIssuesService.fetchIssues();

        expect(result).toStrictEqual(githubApiIssues);
      });
    });
  });
});
