import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-close-stale-processor';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestCloseStaleProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCloseStaleProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCloseStaleProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestsService$$).toBeInstanceOf(GithubApiPullRequestsService);
    });

    it(`should create the PullRequestCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCloseStaleProcessor(pullRequestProcessor);

      expect(result.pullRequestCommentsProcessor$$).toBeInstanceOf(PullRequestCommentsProcessor);
    });

    it(`should create the GithubApiPullRequestLabelsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCloseStaleProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestLabelsService$$).toBeInstanceOf(GithubApiPullRequestLabelsService);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestCloseStaleProcessor: PullRequestCloseStaleProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`close()`, (): void => {
      let pullRequestId: IUuid;

      let githubApiPullRequestsServiceClosePullRequestSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestCommentsProcessorProcessCloseCommentSpy: jest.SpyInstance;
      let processToAddExtraLabelsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            id: pullRequestId,
          },
        });
        pullRequestCloseStaleProcessor = new PullRequestCloseStaleProcessor(pullRequestProcessor);

        githubApiPullRequestsServiceClosePullRequestSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.githubApiPullRequestsService$$, `closePullRequest`)
          .mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: true,
          })
        );
        pullRequestCommentsProcessorProcessCloseCommentSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.pullRequestCommentsProcessor$$, `processCloseComment`)
          .mockImplementation();
        processToAddExtraLabelsSpy = jest
          .spyOn(pullRequestCloseStaleProcessor, `processToAddExtraLabels$$`)
          .mockImplementation();
      });

      it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestCloseStaleProcessor.close();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Closing this pull request...`);
      });

      describe(`when the dry-run mode is disabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: false,
            })
          );
        });

        it(`should close the pull request`, async (): Promise<void> => {
          expect.assertions(5);

          await pullRequestCloseStaleProcessor.close();

          expect(githubApiPullRequestsServiceClosePullRequestSpy).toHaveBeenCalledTimes(1);
          expect(githubApiPullRequestsServiceClosePullRequestSpy).toHaveBeenCalledWith(pullRequestId);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The pull request was closed`);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The pull request is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });

        it(`should try to add some extra labels`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the dry-run mode is enabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: true,
            })
          );
        });

        it(`should not close the pull request`, async (): Promise<void> => {
          expect.assertions(4);

          await pullRequestCloseStaleProcessor.close();

          expect(githubApiPullRequestsServiceClosePullRequestSpy).not.toHaveBeenCalled();
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request was not closed due to the dry-run mode`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The pull request is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });

        it(`should try to add some extra labels`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`processToAddExtraLabels$$()`, (): void => {
      let pullRequestId: IUuid;

      let processorLoggerInfoSpy: jest.SpyInstance;
      let processorLoggerErrorSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceAddLabelsSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            id: pullRequestId,
          },
        });
        pullRequestCloseStaleProcessor = new PullRequestCloseStaleProcessor(pullRequestProcessor);

        processorLoggerInfoSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        processorLoggerErrorSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.processor.logger, `error`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterClose: [],
            })
          );
        commonInputsServiceGetInputsSpy = jest
          .spyOn(CommonInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<ICommonInputs>());
        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(null);
        githubApiPullRequestLabelsServiceAddLabelsSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.githubApiPullRequestLabelsService$$, `addLabels`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAddedPullRequestsLabelsCount`)
          .mockImplementation();
      });

      it(`should log about the processing of adding extra labels`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if more labels should be added...`);
      });

      it(`should get the extra labels to add from the input`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when there is no extra labels to add`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterClose: [],
            })
          );
        });

        it(`should log and stop the processing`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `No extra label to add. Continuing...`);
        });

        it(`should not add the extra label on the pull request`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

          expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
        });

        it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

          expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when there is one extra label to add`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterClose: [`extra-label`],
            })
          );
        });

        it(`should log the extra label name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-1`, `whiteBright-label should be added`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra label`,
            `value-extra-label`,
            `whiteBright-to add on this pull request...`
          );
        });

        it(`should fetch the label`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label`)
          );

          expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
          expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(`extra-label`);
        });

        describe(`when the label could not be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
          });

          it(`should log about the missing label error and throw an error`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerErrorSpy).toHaveBeenCalledWith(`Could not find the label`, `value-extra-label`);
          });

          it(`should not add the extra label on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the label could be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
              createHydratedMock<IGithubApiLabel>({
                id: `dummy-extra-label-id`,
              })
            );
          });

          it(`should log about finding successfully the label`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The label`,
              `value-extra-label`,
              `whiteBright-was fetched`
            );
          });

          it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
          });

          describe(`when the dry-run mode is enabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: true,
                })
              );
            });

            it(`should log about doing nothing due to the dry-run mode`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `The extra label was not added due to the dry-run mode`
              );
            });

            it(`should not add the extra label on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
            });
          });

          describe(`when the dry-run mode is disabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: false,
                })
              );
            });

            it(`should add the extra label on the pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id`,
              ]);
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
            });

            it(`should log about successfully adding the extra label on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `value-1`, `whiteBright-extra label added`);
            });
          });
        });
      });

      describe(`when there is two extra labels to add`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterClose: [`extra-label-1`, `extra-label-2`],
            })
          );
        });

        it(`should log the extra labels name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label-1`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-2`, `whiteBright-labels should be added`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra labels`,
            `value-extra-label-1, extra-label-2`,
            `whiteBright-to add on this pull request...`
          );
        });

        it(`should fetch the labels`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label-1`)
          );

          expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(2);
          expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenNthCalledWith(1, `extra-label-1`);
          expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenNthCalledWith(2, `extra-label-2`);
        });

        describe(`when the labels could not be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
          });

          it(`should log about the missing label errors and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(processorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find the label`,
              `value-extra-label-1`
            );
            expect(processorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Could not find the label`,
              `value-extra-label-2`
            );
          });

          it(`should not add the extra labels on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the labels could be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestLabelsServiceFetchLabelByNameSpy
              .mockResolvedValueOnce(
                createHydratedMock<IGithubApiLabel>({
                  id: `dummy-extra-label-id-1`,
                })
              )
              .mockResolvedValueOnce(
                createHydratedMock<IGithubApiLabel>({
                  id: `dummy-extra-label-id-2`,
                })
              );
          });

          it(`should log about finding successfully the labels`, async (): Promise<void> => {
            expect.assertions(3);

            await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The label`,
              `value-extra-label-1`,
              `whiteBright-was fetched`
            );
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The label`,
              `value-extra-label-2`,
              `whiteBright-was fetched`
            );
          });

          it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
          });

          describe(`when the dry-run mode is enabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: true,
                })
              );
            });

            it(`should log about doing nothing due to the dry-run mode`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                6,
                `The extra labels were not added due to the dry-run mode`
              );
            });

            it(`should not add the extra labels on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(2);
            });
          });

          describe(`when the dry-run mode is disabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: false,
                })
              );
            });

            it(`should add the extra labels on the pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id-1`,
                `dummy-extra-label-id-2`,
              ]);
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(2);
            });

            it(`should log about successfully adding the extra labels on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `value-2`, `whiteBright-extra labels added`);
            });
          });
        });
      });
    });
  });
});
