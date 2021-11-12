import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { IUuid } from '@utils/dates/uuid';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiLabelsService`, (): void => {
  describe(`fetchLabelByName()`, (): void => {
    let labelName: string;
    let graphqlMock: jest.Mock;

    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceWarningSpy: jest.SpyInstance;
    let octokitServiceGetOctokitSpy: jest.SpyInstance;

    beforeEach((): void => {
      labelName = faker.random.word();
      graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));

      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      loggerServiceWarningSpy = jest.spyOn(LoggerService, `warning`).mockImplementation();
      octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
        // @ts-ignore
        graphql: graphqlMock,
      });
      jest.spyOn(context, `repo`, `get`).mockReturnValue({
        owner: `dummy-owner`,
        repo: `dummy-repo`,
      });
    });

    it(`should fetch the label with the given name`, async (): Promise<void> => {
      expect.assertions(7);

      await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(new Error(`graphql error`));

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
        `Fetching the label`,
        `value-${labelName}`,
        `whiteBright-from GitHub...`
      );
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
      expect(graphqlMock).toHaveBeenCalledTimes(1);
      expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_LABEL_BY_NAME_QUERY, {
        labelName,
        owner: `dummy-owner`,
        repository: `dummy-repo`,
      });
    });

    describe(`when the label failed to be fetched`, (): void => {
      beforeEach((): void => {
        graphqlMock.mockRejectedValue(new Error(`graphql error`));
      });

      it(`should log about the error and rethrow it`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(new Error(`graphql error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(`Failed to fetch the label`, `value-${labelName}`);
      });
    });

    describe(`when the label was successfully fetched`, (): void => {
      let githubApiGetLabel: IGithubApiGetLabel;

      beforeEach((): void => {
        githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>();

        graphqlMock.mockResolvedValue(githubApiGetLabel);
      });

      describe(`when the label was not found`, (): void => {
        beforeEach((): void => {
          githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
            repository: {
              labels: {
                totalCount: 0,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiGetLabel);
        });

        it(`should log about not finding this label and throw an error`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
            new Error(`Could not find a single label matching ${labelName}`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(
            1,
            `Could not find a single label matching`,
            `value-${labelName}`
          );
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, `Failed to fetch the label`, `value-${labelName}`);
        });
      });

      describe(`when one label matching the search one was found`, (): void => {
        beforeEach((): void => {
          githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
            repository: {
              labels: {
                nodes: [createHydratedMock<IGithubApiLabel>()],
                totalCount: 1,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiGetLabel);
        });

        describe(`when the label is exactly the one searched`, (): void => {
          beforeEach((): void => {
            githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
              repository: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: labelName,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should return the label`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await GithubApiLabelsService.fetchLabelByName(labelName);

            expect(result).toStrictEqual(githubApiGetLabel);
          });
        });

        describe(`when the label is not the one searched`, (): void => {
          beforeEach((): void => {
            githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
              repository: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `dummy-${labelName}`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should log about not finding this label and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
              new Error(`Could not find the label ${labelName}`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could find a label`,
              `value-dummy-${labelName}`,
              `red-which is not exactly identical to`,
              `value-${labelName}`
            );
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, `Failed to fetch the label`, `value-${labelName}`);
          });
        });
      });

      describe(`when multiple labels matching the search one were found`, (): void => {
        beforeEach((): void => {
          githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
            repository: {
              labels: {
                nodes: [createHydratedMock<IGithubApiLabel>(), createHydratedMock<IGithubApiLabel>()],
                totalCount: 2,
              },
            },
          });

          graphqlMock.mockResolvedValue(githubApiGetLabel);
        });

        describe(`when the first label is exactly the one searched`, (): void => {
          beforeEach((): void => {
            githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
              repository: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: labelName,
                    }),
                    createHydratedMock<IGithubApiLabel>({
                      name: labelName,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should return the label`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await GithubApiLabelsService.fetchLabelByName(labelName);

            expect(result).toStrictEqual(githubApiGetLabel);
          });
        });

        describe(`when the first label is not the one searched`, (): void => {
          beforeEach((): void => {
            githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
              repository: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `dummy-${labelName}`,
                    }),
                    createHydratedMock<IGithubApiLabel>({
                      name: labelName,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should log about not finding this label and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
              new Error(`Could not find the label ${labelName}`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could find a label`,
              `value-dummy-${labelName}`,
              `red-which is not exactly identical to`,
              `value-${labelName}`
            );
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, `Failed to fetch the label`, `value-${labelName}`);
          });

          it(`should log a warning about the missing pagination implementation`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(GithubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
              new Error(`Could not find the label ${labelName}`)
            );

            expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-2`,
              `whiteBright-labels during the search (by name or description). The pagination support is not yet implemented!`
            );
          });
        });
      });
    });
  });

  describe(`addLabelToIssue()`, (): void => {
    let issueId: IUuid;
    let labelId: IUuid;
    let graphqlMock: jest.Mock;

    let loggerServiceInfoSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let octokitServiceGetOctokitSpy: jest.SpyInstance;

    beforeEach((): void => {
      issueId = faker.datatype.uuid();
      labelId = faker.datatype.uuid();
      graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));

      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(LoggerService, `error`).mockImplementation();
      octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
        // @ts-ignore
        graphql: graphqlMock,
      });
    });

    it(`should add the label on the issue`, async (): Promise<void> => {
      expect.assertions(7);

      await expect(GithubApiLabelsService.addLabelToIssue(issueId, labelId)).rejects.toThrow(
        new Error(`graphql error`)
      );

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
        `Adding the label`,
        `value-${labelId}`,
        `whiteBright-on the issue`,
        `value-${issueId}whiteBright-...`
      );
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
      expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
      expect(graphqlMock).toHaveBeenCalledTimes(1);
      expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_LABEL_MUTATION, {
        issueId,
        labelId,
      });
    });

    describe(`when the label failed to be added`, (): void => {
      beforeEach((): void => {
        graphqlMock.mockRejectedValue(new Error(`graphql error`));
      });

      it(`should log about the error and rethrow it`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(GithubApiLabelsService.addLabelToIssue(issueId, labelId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith(
          `Failed to add the label`,
          `value-${labelId}`,
          `red-on the issue`,
          `value-${issueId}`
        );
      });
    });

    describe(`when the label was successfully added`, (): void => {
      beforeEach((): void => {
        graphqlMock.mockResolvedValue({});
      });

      it(`should log about the success of the addition`, async (): Promise<void> => {
        expect.assertions(2);

        await GithubApiLabelsService.addLabelToIssue(issueId, labelId);

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `green-Label`,
          `value-${labelId}`,
          `green-added to issue`,
          `value-${issueId}`
        );
      });
    });
  });
});
