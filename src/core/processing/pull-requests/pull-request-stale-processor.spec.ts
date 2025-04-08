import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestStaleProcessor } from '@core/processing/pull-requests/pull-request-stale-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { MOCK_DATE_FORMAT } from '@utils/loggers/mock-date-format';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestStaleProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestLabelsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestLabelsService$$).toBeInstanceOf(GithubApiPullRequestLabelsService);
    });

    it(`should create the PullRequestCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.pullRequestCommentsProcessor$$).toBeInstanceOf(PullRequestCommentsProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestStaleProcessor: PullRequestStaleProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldStale()`, (): void => {
      let isStaleByUpdateDateSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        isStaleByUpdateDateSpy = jest.spyOn(pullRequestStaleProcessor, `isStaleByUpdateDate$$`).mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.processor.logger, `info`)
          .mockImplementation();
      });

      it(`should check if the pull request is stale based on the update date`, (): void => {
        expect.assertions(4);

        pullRequestStaleProcessor.shouldStale();

        expect(isStaleByUpdateDateSpy).toHaveBeenCalledTimes(1);
        expect(isStaleByUpdateDateSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Checking if the pull request should be stale...`
        );
      });

      describe(`when the pull request should not be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestStaleProcessor.shouldStale();

          expect(result).toBeFalse();
        });
      });

      describe(`when the pull request should be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestStaleProcessor.shouldStale();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`stale()`, (): void => {
      let pullRequestStaleLabel: string;
      let staleLabelId: IUuid;
      let pullRequestId: IUuid;

      let githubApiPullRequestLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceAddLabelSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let pullRequestCommentsProcessorProcessStaleCommentSpy: jest.SpyInstance;
      let processToAddExtraLabelsSpy: jest.SpyInstance;
      let processToRemoveExtraLabelsSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            id: pullRequestId,
          },
        });
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleLabel,
            })
          );
        githubApiPullRequestLabelsServiceAddLabelSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `addLabel`)
          .mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest
          .spyOn(pullRequestStaleProcessor.processor.logger, `error`)
          .mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        pullRequestCommentsProcessorProcessStaleCommentSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestCommentsProcessor$$, `processStaleComment`)
          .mockImplementation();
        processToAddExtraLabelsSpy = jest
          .spyOn(pullRequestStaleProcessor, `processToAddExtraLabels$$`)
          .mockImplementation();
        processToRemoveExtraLabelsSpy = jest
          .spyOn(pullRequestStaleProcessor, `processToRemoveExtraLabels$$`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAddedPullRequestsLabelsCount`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseRemovedPullRequestsLabelsCount`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestStaleProcessor.stale();

        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(pullRequestStaleLabel);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Adding the stale state to this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${pullRequestStaleLabel}`,
          `whiteBright-to add on this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          4,
          `Adding the stale label to this pull request...`
        );
      });

      describe(`when the label could not be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${pullRequestStaleLabel}`
          );
        });

        it(`should annotate`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationError.NOT_FOUND_STALE_LABEL, {
            file: `abstract-stale-processor.ts`,
            startLine: 49,
            title: `Error`,
          });
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );
        });

        it(`should try to add a stale comment on the pull request`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
        });

        it(`should try to add extra labels`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
        });

        it(`should try to remove extra labels`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledWith();
        });

        it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
        });

        it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: false,
                })
              );
          });

          it(`should add the stale label on the pull request`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestStaleProcessor.stale();

            expect(githubApiPullRequestLabelsServiceAddLabelSpy).toHaveBeenCalledTimes(1);
            expect(githubApiPullRequestLabelsServiceAddLabelSpy).toHaveBeenCalledWith(pullRequestId, staleLabelId);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was added`);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The pull request is now stale`);
          });

          it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
          });

          it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
          });

          it(`should try to add a stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
          });

          it(`should try to add extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
          });

          it(`should try to remove extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: true,
                })
              );
          });

          it(`should not add the stale label on the pull request`, async (): Promise<void> => {
            expect.assertions(4);

            await pullRequestStaleProcessor.stale();

            expect(githubApiPullRequestLabelsServiceAddLabelSpy).not.toHaveBeenCalled();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not added due to the dry-run mode`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The pull request is now stale`);
          });

          it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
          });

          it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
          });

          it(`should try to add a stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
          });

          it(`should try to add extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
          });

          it(`should try to remove extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToRemoveExtraLabelsSpy).toHaveBeenCalledWith();
          });
        });
      });
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      let pullRequestProcessorGetUpdatedAtMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestDaysBeforeStale: 30,
            })
          );
      });

      it(`should get the number of days before the pull request should be stale`, (): void => {
        expect.assertions(4);

        pullRequestStaleProcessor.isStaleByUpdateDate$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the pull request should be stale based on the update date...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request last updated is older than the number of days before the pull request should be stale`, (): void => {
        beforeEach((): void => {
          pullRequestProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
            (): DateTime =>
              DateTime.now().minus({
                day: 31,
              })
          );
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            getUpdatedAt: pullRequestProcessorGetUpdatedAtMock,
          });
          pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestStaleProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should return true`, (): void => {
          expect.assertions(4);

          const result = pullRequestStaleProcessor.isStaleByUpdateDate$$();

          expect(result).toBeTrue();
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request was updated for the last time the`,
            `date-${pullRequestProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The pull request should be stale since it was not updated in the last`,
            `value-30`,
            `whiteBright-days`
          );
        });
      });

      describe.each([30, 29, 0])(
        `when the pull request last updated is younger than the number of days before the pull request should be stale`,
        (day): void => {
          beforeEach((): void => {
            pullRequestProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
              (): DateTime =>
                DateTime.now().minus({
                  day,
                })
            );
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              getUpdatedAt: pullRequestProcessorGetUpdatedAtMock,
            });
            pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestStaleProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(4);

            const result = pullRequestStaleProcessor.isStaleByUpdateDate$$();

            expect(result).toBeFalse();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The pull request was updated for the last time the`,
              `date-${pullRequestProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request should not be stale since it was updated in the last`,
              `value-30`,
              `whiteBright-days`
            );
          });
        }
      );
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
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        processorLoggerInfoSpy = jest.spyOn(pullRequestStaleProcessor.processor.logger, `info`).mockImplementation();
        processorLoggerErrorSpy = jest.spyOn(pullRequestStaleProcessor.processor.logger, `error`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterStale: [],
            })
          );
        commonInputsServiceGetInputsSpy = jest
          .spyOn(CommonInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<ICommonInputs>());
        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(null);
        githubApiPullRequestLabelsServiceAddLabelsSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `addLabels`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAddedPullRequestsLabelsCount`)
          .mockImplementation();
      });

      it(`should log about the processing of adding extra labels`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestStaleProcessor.processToAddExtraLabels$$();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if more labels should be added...`);
      });

      it(`should get the extra labels to add from the input`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestStaleProcessor.processToAddExtraLabels$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when there is no extra labels to add`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterStale: [],
            })
          );
        });

        it(`should log and stop the processing`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestStaleProcessor.processToAddExtraLabels$$();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `No extra label to add. Continuing...`);
        });

        it(`should not add the extra label on the pull request`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestStaleProcessor.processToAddExtraLabels$$();

          expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
        });

        it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestStaleProcessor.processToAddExtraLabels$$();

          expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when there is one extra label to add`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestAddLabelsAfterStale: [`extra-label`],
            })
          );
        });

        it(`should log the extra label name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

          await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerErrorSpy).toHaveBeenCalledWith(`Could not find the label`, `value-extra-label`);
          });

          it(`should not add the extra label on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

            await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `The extra label was not added due to the dry-run mode`
              );
            });

            it(`should not add the extra label on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id`,
              ]);
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
            });

            it(`should log about successfully adding the extra label on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

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
              pullRequestAddLabelsAfterStale: [`extra-label-1`, `extra-label-2`],
            })
          );
        });

        it(`should log the extra labels name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

          await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

            await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                6,
                `The extra labels were not added due to the dry-run mode`
              );
            });

            it(`should not add the extra labels on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

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

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id-1`,
                `dummy-extra-label-id-2`,
              ]);
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(2);
            });

            it(`should log about successfully adding the extra labels on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `value-2`, `whiteBright-extra labels added`);
            });
          });
        });
      });
    });

    describe(`processToRemoveExtraLabels$$()`, (): void => {
      let pullRequestId: IUuid;

      let processorLoggerInfoSpy: jest.SpyInstance;
      let processorLoggerErrorSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceRemoveLabelsSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            id: pullRequestId,
          },
        });
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        processorLoggerInfoSpy = jest.spyOn(pullRequestStaleProcessor.processor.logger, `info`).mockImplementation();
        processorLoggerErrorSpy = jest.spyOn(pullRequestStaleProcessor.processor.logger, `error`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestRemoveLabelsAfterStale: [],
            })
          );
        commonInputsServiceGetInputsSpy = jest
          .spyOn(CommonInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<ICommonInputs>());
        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(null);
        githubApiPullRequestLabelsServiceRemoveLabelsSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `removeLabels`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseRemovedPullRequestsLabelsCount`)
          .mockImplementation();
      });

      it(`should log about the processing of removing extra labels`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if more labels should be removed...`);
      });

      it(`should get the extra labels to remove from the input`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when there is no extra labels to remove`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestRemoveLabelsAfterStale: [],
            })
          );
        });

        it(`should log and stop the processing`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `No extra label to remove. Continuing...`);
        });

        it(`should not remove the extra label on the pull request`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

          expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).not.toHaveBeenCalled();
        });

        it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

          expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when there is one extra label to remove`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestRemoveLabelsAfterStale: [`extra-label`],
            })
          );
        });

        it(`should log the extra label name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-1`, `whiteBright-label should be removed`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra label`,
            `value-extra-label`,
            `whiteBright-to remove on this pull request...`
          );
        });

        it(`should fetch the label`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
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

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerErrorSpy).toHaveBeenCalledWith(`Could not find the label`, `value-extra-label`);
          });

          it(`should not remove the extra label on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
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

            await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

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

            await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

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

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `The extra label was not removed due to the dry-run mode`
              );
            });

            it(`should not remove the extra label on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of removed labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
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

            it(`should remove the extra label on the pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id`,
              ]);
            });

            it(`should increase the number of removed labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(1);
            });

            it(`should log about successfully removing the extra label on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `value-1`, `whiteBright-extra label removed`);
            });
          });
        });
      });

      describe(`when there is two extra labels to remove`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<Partial<IPullRequestsInputs>>{
              pullRequestRemoveLabelsAfterStale: [`extra-label-1`, `extra-label-2`],
            })
          );
        });

        it(`should log the extra labels name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label-1`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-2`, `whiteBright-labels should be removed`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra labels`,
            `value-extra-label-1, extra-label-2`,
            `whiteBright-to remove on this pull request...`
          );
        });

        it(`should fetch the labels`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
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

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
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

          it(`should not remove the extra labels on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of removed labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestStaleProcessor.processToRemoveExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).not.toHaveBeenCalled();
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

            await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

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

            await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

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

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                6,
                `The extra labels were not removed due to the dry-run mode`
              );
            });

            it(`should not remove the extra labels on the pull request`, async (): Promise<void> => {
              expect.assertions(1);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of removed labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(2);
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

            it(`should remove the extra labels on the pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiPullRequestLabelsServiceRemoveLabelsSpy).toHaveBeenCalledWith(pullRequestId, [
                `dummy-extra-label-id-1`,
                `dummy-extra-label-id-2`,
              ]);
            });

            it(`should increase the number of removed labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestsStatisticsServiceIncreaseRemovedPullRequestsLabelsCountSpy).toHaveBeenCalledWith(2);
            });

            it(`should log about successfully removing the extra labels on this pull request`, async (): Promise<void> => {
              expect.assertions(2);

              await pullRequestStaleProcessor.processToRemoveExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `value-2`, `whiteBright-extra labels removed`);
            });
          });
        });
      });
    });
  });
});
