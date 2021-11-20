import { IssueProcessor } from '@core/issues/issue-processor';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { IUuid } from '@utils/types/uuid';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiLabelsService`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiLabelsService(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiLabelsService: GithubApiLabelsService;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`fetchLabelsByName()`, (): void => {
      let labelName: string;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        labelName = faker.random.word();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiLabelsService = new GithubApiLabelsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
      });

      it(`should fetch the labels with the given name or description`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(new Error(`graphql error`));

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Fetching the labels matching`,
          `value-${labelName}`,
          `whiteBright-from GitHub...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_LABELS_BY_NAME_QUERY, {
          labelName,
          owner: `dummy-owner`,
          repository: `dummy-repo`,
        });
      });

      describe(`when the labels failed to be fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(new Error(`graphql error`));

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to fetch the labels matching`,
            `value-${labelName}`
          );
        });
      });

      describe(`when the labels were successfully fetched`, (): void => {
        let githubApiGetLabels: IGithubApiGetLabels;

        beforeEach((): void => {
          githubApiGetLabels = createHydratedMock<IGithubApiGetLabels>();

          graphqlMock.mockResolvedValue(githubApiGetLabels);
        });

        describe(`when the labels were not found`, (): void => {
          beforeEach((): void => {
            githubApiGetLabels = createHydratedMock<IGithubApiGetLabels>({
              repository: {
                labels: {
                  totalCount: 0,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabels);
          });

          it(`should log about not finding those labels and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
              new Error(`Could not find a single label matching ${labelName}`)
            );

            expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find a single label matching`,
              `value-${labelName}`
            );
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the labels matching`,
              `value-${labelName}`
            );
          });
        });

        describe(`when one label matching the search one was found`, (): void => {
          beforeEach((): void => {
            githubApiGetLabels = createHydratedMock<IGithubApiGetLabels>({
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

            graphqlMock.mockResolvedValue(githubApiGetLabels);
          });

          it(`should return the label`, async (): Promise<void> => {
            expect.assertions(3);

            const result = await githubApiLabelsService.fetchLabelsByName(labelName);

            expect(issueProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `green-Found the labels matching`,
              `value-${labelName}`
            );
            expect(result).toStrictEqual(githubApiGetLabels);
          });
        });

        describe(`when multiple labels matching the search one were found`, (): void => {
          beforeEach((): void => {
            githubApiGetLabels = createHydratedMock<IGithubApiGetLabels>({
              repository: {
                labels: {
                  nodes: [createHydratedMock<IGithubApiLabel>(), createHydratedMock<IGithubApiLabel>()],
                  totalCount: 2,
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabels);
          });

          describe(`when the first label is exactly the one searched`, (): void => {
            beforeEach((): void => {
              githubApiGetLabels = createHydratedMock<IGithubApiGetLabels>({
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

              graphqlMock.mockResolvedValue(githubApiGetLabels);
            });

            it(`should return the label`, async (): Promise<void> => {
              expect.assertions(3);

              const result = await githubApiLabelsService.fetchLabelsByName(labelName);

              expect(issueProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                2,
                `green-Found the labels matching`,
                `value-${labelName}`
              );
              expect(result).toStrictEqual(githubApiGetLabels);
            });
          });
        });
      });
    });

    describe(`fetchLabelByName()`, (): void => {
      let labelName: string;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        labelName = faker.random.word();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiLabelsService = new GithubApiLabelsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
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

        await expect(githubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(new Error(`graphql error`));

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
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

          await expect(githubApiLabelsService.fetchLabelByName(labelName)).rejects.toThrow(new Error(`graphql error`));

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(`Failed to fetch the label`, `value-${labelName}`);
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
                label: null,
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should log about not finding this label and return null`, async (): Promise<void> => {
            expect.assertions(3);

            const result = await githubApiLabelsService.fetchLabelByName(labelName);

            expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
              `Could not fetch the label`,
              `value-${labelName}`
            );
            expect(result).toBeNull();
          });
        });

        describe(`when the label was found`, (): void => {
          beforeEach((): void => {
            githubApiGetLabel = createHydratedMock<IGithubApiGetLabel>({
              repository: {
                label: createHydratedMock<IGithubApiLabel>({
                  id: `dummy-id`,
                  name: labelName,
                }),
              },
            });

            graphqlMock.mockResolvedValue(githubApiGetLabel);
          });

          it(`should return the label`, async (): Promise<void> => {
            expect.assertions(3);

            const result = await githubApiLabelsService.fetchLabelByName(labelName);

            expect(issueProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `green-Found the label`,
              `value-${labelName}`
            );
            expect(result).toStrictEqual({
              id: `dummy-id`,
              name: labelName,
            });
          });
        });
      });
    });

    describe(`addLabelToIssue()`, (): void => {
      let issueId: IUuid;
      let labelId: IUuid;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        labelId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiLabelsService = new GithubApiLabelsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
      });

      it(`should add the label on the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiLabelsService.addLabelToIssue(issueId, labelId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Adding the label`,
          `value-${labelId}`,
          `whiteBright-on the issue`,
          `value-${issueId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_LABEL_MUTATION, {
          id: issueId,
          labelId,
        });
      });

      describe(`when the label failed to be added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiLabelsService.addLabelToIssue(issueId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
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

          await githubApiLabelsService.addLabelToIssue(issueId, labelId);

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Label`,
            `value-${labelId}`,
            `green-added to the issue`,
            `value-${issueId}`
          );
        });
      });
    });

    describe(`removeLabelFromIssue()`, (): void => {
      let issueId: IUuid;
      let labelId: IUuid;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        labelId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiLabelsService = new GithubApiLabelsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
      });

      it(`should remove the label on the issue`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiLabelsService.removeLabelFromIssue(issueId, labelId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Removing the label`,
          `value-${labelId}`,
          `whiteBright-from the issue`,
          `value-${issueId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_REMOVE_LABEL_MUTATION, {
          id: issueId,
          labelId,
        });
      });

      describe(`when the label failed to be removed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiLabelsService.removeLabelFromIssue(issueId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to remove the label`,
            `value-${labelId}`,
            `red-from the issue`,
            `value-${issueId}`
          );
        });
      });

      describe(`when the label was successfully removed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the removal`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiLabelsService.removeLabelFromIssue(issueId, labelId);

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Label`,
            `value-${labelId}`,
            `green-removed from the issue`,
            `value-${issueId}`
          );
        });
      });
    });
  });
});
