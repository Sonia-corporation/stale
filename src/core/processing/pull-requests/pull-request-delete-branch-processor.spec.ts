import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestDeleteBranchProcessor } from '@core/processing/pull-requests/pull-request-delete-branch-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestReferencesService } from '@github/api/references/github-api-pull-request-references.service';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestDeleteBranchProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestDeleteBranchProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestReferencesService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestDeleteBranchProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestReferencesService$$).toBeInstanceOf(GithubApiPullRequestReferencesService);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestDeleteBranchProcessor: PullRequestDeleteBranchProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`delete()`, (): void => {
      let pullRequestId: IUuid;
      let branchId: IUuid;
      let branchName: string;

      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy: jest.SpyInstance;
      let githubApiPullRequestReferencesServiceDeleteReferenceSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        branchId = faker.datatype.uuid();
        branchName = faker.random.word();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            headRef: {
              id: branchId,
              name: branchName,
            },
            id: pullRequestId,
          },
        });
        pullRequestDeleteBranchProcessor = new PullRequestDeleteBranchProcessor(pullRequestProcessor);

        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleComment: ``,
            })
          );
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestDeleteBranchProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestDeleteBranchProcessor.processor.logger, `notice`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseDeletedPullRequestsBranchesCount`)
          .mockImplementation();
        githubApiPullRequestReferencesServiceDeleteReferenceSpy = jest
          .spyOn(pullRequestDeleteBranchProcessor.githubApiPullRequestReferencesService$$, `deleteReference`)
          .mockImplementation();
      });

      it(`should log about trying to delete the branch`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestDeleteBranchProcessor.delete();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Processing to delete the pull request branch...`
        );
      });

      it(`should check if the pull request delete branch after close input is enabled`, async (): Promise<void> => {
        expect.assertions(2);

        await pullRequestDeleteBranchProcessor.delete();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request stale delete branch after close is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestDeleteBranchAfterClose: false,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await pullRequestDeleteBranchProcessor.delete();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-delete-branch-after-close`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy).not.toHaveBeenCalled();
          expect(githubApiPullRequestReferencesServiceDeleteReferenceSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the pull request stale delete branch after close is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestDeleteBranchAfterClose: true,
            })
          );
        });

        it(`should log about the enabled input`, async (): Promise<void> => {
          expect.assertions(3);

          await pullRequestDeleteBranchProcessor.delete();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-delete-branch-after-close`,
            `whiteBright-is enabled. The branch should be deleted...`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Deleting the branch`,
            `value-${branchName}whiteBright-...`
          );
        });

        it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestDeleteBranchProcessor.delete();

          expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the dry-run mode is disabled`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>(<ICommonInputs>{
                dryRun: false,
              })
            );
          });

          it(`should delete the branch`, async (): Promise<void> => {
            expect.assertions(4);

            await pullRequestDeleteBranchProcessor.delete();

            expect(githubApiPullRequestReferencesServiceDeleteReferenceSpy).toHaveBeenCalledTimes(1);
            expect(githubApiPullRequestReferencesServiceDeleteReferenceSpy).toHaveBeenCalledWith(branchId);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(
              `The branch`,
              `value-${branchName}`,
              `whiteBright-was deleted`
            );
          });

          it(`should increase the statistic about the deleted branches`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestDeleteBranchProcessor.delete();

            expect(pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when the dry-run mode is enabled`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>(<ICommonInputs>{
                dryRun: true,
              })
            );
          });

          it(`should not delete the branch`, async (): Promise<void> => {
            expect.assertions(3);

            await pullRequestDeleteBranchProcessor.delete();

            expect(githubApiPullRequestReferencesServiceDeleteReferenceSpy).not.toHaveBeenCalled();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request branch was not deleted due to the dry-run mode`
            );
          });

          it(`should not increase the statistic about the deleted branches`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestDeleteBranchProcessor.delete();

            expect(pullRequestsStatisticsServiceIncreaseDeletedPullRequestsBranchesCountSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
