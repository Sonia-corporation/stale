import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_ADD_LABELS_MUTATION } from '@github/api/labels/constants/github-api-add-labels-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
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

describe(`GithubApiPullRequestLabelsService`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiPullRequestLabelsService(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiPullRequestLabelsService: GithubApiPullRequestLabelsService;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`fetchLabelsByName()`, (): void => {
      let labelName: string;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        labelName = faker.random.word();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestLabelsService = new GithubApiPullRequestLabelsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsQueriesCount`)
          .mockImplementation();
      });

      it(`should fetch the labels with the given name or description`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
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

        it(`should not increase the statistic regarding the API pull requests queries calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).not.toHaveBeenCalled();
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
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

            await expect(githubApiPullRequestLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
              new Error(`Could not find a single label matching ${labelName}`)
            );

            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find a single label matching`,
              `value-${labelName}`
            );
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the labels matching`,
              `value-${labelName}`
            );
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(githubApiPullRequestLabelsService.fetchLabelsByName(labelName)).rejects.toThrow(
              new Error(`Could not find a single label matching ${labelName}`)
            );

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
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

            const result = await githubApiPullRequestLabelsService.fetchLabelsByName(labelName);

            expect(pullRequestProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `green-Found the labels matching`,
              `value-${labelName}`
            );
            expect(result).toStrictEqual(githubApiGetLabels);
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await githubApiPullRequestLabelsService.fetchLabelsByName(labelName);

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
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

              const result = await githubApiPullRequestLabelsService.fetchLabelsByName(labelName);

              expect(pullRequestProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                2,
                `green-Found the labels matching`,
                `value-${labelName}`
              );
              expect(result).toStrictEqual(githubApiGetLabels);
            });

            it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await githubApiPullRequestLabelsService.fetchLabelsByName(labelName);

              expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(
                1
              );
              expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
            });
          });
        });
      });
    });

    describe(`fetchLabelByName()`, (): void => {
      let labelName: string;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerDebugSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        labelName = faker.random.word();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestLabelsService = new GithubApiPullRequestLabelsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        pullRequestProcessorLoggerDebugSpy = jest.spyOn(pullRequestProcessor.logger, `debug`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsQueriesCount`)
          .mockImplementation();
      });

      it(`should fetch the label with the given name`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
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

          await expect(githubApiPullRequestLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to fetch the label`,
            `value-${labelName}`
          );
        });

        it(`should not increase the statistic regarding the API pull requests queries calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestLabelsService.fetchLabelByName(labelName)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).not.toHaveBeenCalled();
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
            expect.assertions(5);

            const result = await githubApiPullRequestLabelsService.fetchLabelByName(labelName);

            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
              `Could not fetch the label`,
              `value-${labelName}`
            );
            expect(pullRequestProcessorLoggerDebugSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerDebugSpy).toHaveBeenCalledWith(
              `Are you sure it exists in your repository?`
            );
            expect(result).toBeNull();
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await githubApiPullRequestLabelsService.fetchLabelByName(labelName);

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
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

            const result = await githubApiPullRequestLabelsService.fetchLabelByName(labelName);

            expect(pullRequestProcessorLoggerInfoSpy).toHaveReturnedTimes(2);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `green-Found the label`,
              `value-${labelName}`
            );
            expect(result).toStrictEqual({
              id: `dummy-id`,
              name: labelName,
            });
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await githubApiPullRequestLabelsService.fetchLabelByName(labelName);

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
          });
        });
      });
    });

    describe(`addLabel()`, (): void => {
      let pullRequestId: IUuid;
      let labelId: IUuid;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        labelId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestLabelsService = new GithubApiPullRequestLabelsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should add the label on the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestLabelsService.addLabel(pullRequestId, labelId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Adding the label`,
          `value-${labelId}`,
          `whiteBright-on the pull request`,
          `value-${pullRequestId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_LABEL_MUTATION, {
          id: pullRequestId,
          labelId,
        });
      });

      describe(`when the label failed to be added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestLabelsService.addLabel(pullRequestId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to add the label`,
            `value-${labelId}`,
            `red-on the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestLabelsService.addLabel(pullRequestId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the label was successfully added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the addition`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.addLabel(pullRequestId, labelId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Label`,
            `value-${labelId}`,
            `green-added to the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.addLabel(pullRequestId, labelId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`addLabels()`, (): void => {
      let pullRequestId: IUuid;
      let labelsId: IUuid[];
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        labelsId = [faker.datatype.uuid(), faker.datatype.uuid()];
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestLabelsService = new GithubApiPullRequestLabelsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should add the labels on the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestLabelsService.addLabels(pullRequestId, labelsId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Adding the labels`,
          `value-${labelsId[0]},${labelsId[1]}`,
          `whiteBright-on the pull request`,
          `value-${pullRequestId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_ADD_LABELS_MUTATION, {
          id: pullRequestId,
          labelsId,
        });
      });

      describe(`when the labels failed to be added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestLabelsService.addLabels(pullRequestId, labelsId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to add the labels`,
            `value-${labelsId[0]},${labelsId[1]}`,
            `red-on the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestLabelsService.addLabels(pullRequestId, labelsId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the labels were successfully added`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the addition`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.addLabels(pullRequestId, labelsId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Labels`,
            `value-${labelsId[0]},${labelsId[1]}`,
            `green-added to the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.addLabels(pullRequestId, labelsId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`removeLabel()`, (): void => {
      let pullRequestId: IUuid;
      let labelId: IUuid;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        labelId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestLabelsService = new GithubApiPullRequestLabelsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should remove the label on the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestLabelsService.removeLabel(pullRequestId, labelId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Removing the label`,
          `value-${labelId}`,
          `whiteBright-from the pull request`,
          `value-${pullRequestId}whiteBright-...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_REMOVE_LABEL_MUTATION, {
          id: pullRequestId,
          labelId,
        });
      });

      describe(`when the label failed to be removed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestLabelsService.removeLabel(pullRequestId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to remove the label`,
            `value-${labelId}`,
            `red-from the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestLabelsService.removeLabel(pullRequestId, labelId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the label was successfully removed`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the removal`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.removeLabel(pullRequestId, labelId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Label`,
            `value-${labelId}`,
            `green-removed from the pull request`,
            `value-${pullRequestId}`
          );
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestLabelsService.removeLabel(pullRequestId, labelId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
