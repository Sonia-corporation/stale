import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestDraftProcessor } from '@core/processing/pull-requests/pull-request-draft-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestDraftProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestDraftProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestDraftProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestsService$$).toBeInstanceOf(GithubApiPullRequestsService);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestDraftProcessor: PullRequestDraftProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`draft()`, (): void => {
      let processorLoggerInfoSpy: jest.SpyInstance;
      let processorLoggerNoticeSpy: jest.SpyInstance;
      let githubApiPullRequestsServiceDraftPullRequestSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            id: `dummy-id`,
          },
        });
        pullRequestDraftProcessor = new PullRequestDraftProcessor(pullRequestProcessor);

        processorLoggerInfoSpy = jest.spyOn(pullRequestDraftProcessor.processor.logger, `info`).mockImplementation();
        processorLoggerNoticeSpy = jest
          .spyOn(pullRequestDraftProcessor.processor.logger, `notice`)
          .mockImplementation();
        githubApiPullRequestsServiceDraftPullRequestSpy = jest
          .spyOn(pullRequestDraftProcessor.githubApiPullRequestsService$$, `draftPullRequest`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseDraftPullRequestsCount`)
          .mockImplementation();
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
      });

      it(`should log about converting the pull request to draft`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestDraftProcessor.draft();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(processorLoggerInfoSpy).toHaveBeenCalledWith(`Converting this pull request to draft...`);
      });

      it(`should get the common inputs`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestDraftProcessor.draft();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the dry-run mode is disabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: false,
            })
          );
        });

        it(`should convert this pull request to a draft`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestDraftProcessor.draft();

          expect(githubApiPullRequestsServiceDraftPullRequestSpy).toHaveBeenCalledTimes(1);
          expect(githubApiPullRequestsServiceDraftPullRequestSpy).toHaveBeenCalledWith(`dummy-id`);
        });

        describe(`when the pull request was successfully converted to a draft`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestsServiceDraftPullRequestSpy.mockResolvedValue(undefined);
          });

          it(`should log about successfully converting the pull request to a draft`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestDraftProcessor.draft();

            expect(processorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is now a draft pull request`);
          });

          it(`should increase the draft pull requests count statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestDraftProcessor.draft();

            expect(pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when the pull request failed to be converted to a draft`, (): void => {
          beforeEach((): void => {
            githubApiPullRequestsServiceDraftPullRequestSpy.mockRejectedValue(new Error(`draft error`));
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(pullRequestDraftProcessor.draft()).rejects.toThrow(new Error(`draft error`));
          });

          it(`should not log about successfully converting the pull request to a draft`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestDraftProcessor.draft()).rejects.toThrow(new Error(`draft error`));

            expect(processorLoggerNoticeSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the draft pull requests count statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(pullRequestDraftProcessor.draft()).rejects.toThrow(new Error(`draft error`));

            expect(pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy).not.toHaveBeenCalled();
          });
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

        it(`should not convert this pull request to a draft`, async (): Promise<void> => {
          expect.assertions(1);

          await pullRequestDraftProcessor.draft();

          expect(githubApiPullRequestsServiceDraftPullRequestSpy).not.toHaveBeenCalled();
        });

        it(`should log about not converting the pull request to a draft due to the dry-run mode`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestDraftProcessor.draft();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request could not be converted to draft due to the dry-run mode`
          );
        });

        it(`should increase the draft pull requests count statistic by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestDraftProcessor.draft();

          expect(pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseDraftPullRequestsCountSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`shouldDraftInsteadOfStale()`, (): void => {
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let processorLoggerInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestDraftProcessor = new PullRequestDraftProcessor(pullRequestProcessor);

        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<IPullRequestsInputs>());
        processorLoggerInfoSpy = jest.spyOn(pullRequestDraftProcessor.processor.logger, `info`).mockImplementation();
      });

      it(`should get the pull requests inputs`, (): void => {
        expect.assertions(2);

        pullRequestDraftProcessor.shouldDraftInsteadOfStale();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the processing as draft is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
              pullRequestToDraftInsteadOfStale: false,
            })
          );
        });

        it(`should log about it`, (): void => {
          expect.assertions(2);

          pullRequestDraftProcessor.shouldDraftInsteadOfStale();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(1);
          expect(processorLoggerInfoSpy).toHaveBeenCalledWith(
            `The input`,
            `input-pull-request-to-draft-instead-of-stale`,
            `whiteBright-is disabled. Skipping the draft processing and start the stale processing instead...`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestDraftProcessor.shouldDraftInsteadOfStale();

          expect(result).toBeFalse();
        });
      });

      describe(`when the processing as draft is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>(<IPullRequestsInputs>{
              pullRequestToDraftInsteadOfStale: true,
            })
          );
        });

        it(`should log about it`, (): void => {
          expect.assertions(2);

          pullRequestDraftProcessor.shouldDraftInsteadOfStale();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(1);
          expect(processorLoggerInfoSpy).toHaveBeenCalledWith(
            `The input`,
            `input-pull-request-to-draft-instead-of-stale`,
            `whiteBright-is enabled. Starting the draft processing instead of the stale processing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestDraftProcessor.shouldDraftInsteadOfStale();

          expect(result).toBeTrue();
        });
      });
    });
  });
});
