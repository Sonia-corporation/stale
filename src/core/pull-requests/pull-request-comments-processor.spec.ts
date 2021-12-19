import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestCommentsProcessor } from '@core/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GithubApiPullRequestCommentsService } from '@github/api/comments/github-api-pull-request-comments.service';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestCommentsProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCommentsProcessor(pullRequestProcessor);

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestCommentsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestCommentsProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestCommentsService$$).toBeInstanceOf(GithubApiPullRequestCommentsService);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestCommentsProcessor: PullRequestCommentsProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`processStaleComment()`, (): void => {
      let pullRequestId: IUuid;

      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy: jest.SpyInstance;
      let githubApiPullRequestCommentsServiceAddCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            id: pullRequestId,
          },
        });
        pullRequestCommentsProcessor = new PullRequestCommentsProcessor(pullRequestProcessor);

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
          .spyOn(pullRequestCommentsProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestCommentsProcessor.pullRequestProcessor.logger, `notice`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAddedPullRequestsCommentsCount`)
          .mockImplementation();
        githubApiPullRequestCommentsServiceAddCommentSpy = jest
          .spyOn(pullRequestCommentsProcessor.githubApiPullRequestCommentsService$$, `addComment`)
          .mockImplementation();
      });

      it(`should check if the pull request stale comment input is configured`, async (): Promise<void> => {
        expect.assertions(6);

        await pullRequestCommentsProcessor.processStaleComment();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a stale comment should be added...`
        );
      });

      describe(`when the pull request stale comment is not configured`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await pullRequestCommentsProcessor.processStaleComment();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The stale comment is unset. Continuing...`
          );
          expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiPullRequestCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the pull request stale comment is configured`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleComment: `dummy-comment`,
            })
          );
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>({
                dryRun: true,
              })
            );
          });

          it(`should not add the stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(githubApiPullRequestCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added pull requests comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
          });
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>({
                dryRun: false,
              })
            );
          });

          it(`should add the stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the stale comment...`);
          });

          it(`should increase the added pull requests comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processStaleComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
          });
        });
      });
    });

    describe(`processCloseComment()`, (): void => {
      let pullRequestId: IUuid;

      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy: jest.SpyInstance;
      let githubApiPullRequestCommentsServiceAddCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            id: pullRequestId,
          },
        });
        pullRequestCommentsProcessor = new PullRequestCommentsProcessor(pullRequestProcessor);

        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestCloseComment: ``,
            })
          );
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestCommentsProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestCommentsProcessor.pullRequestProcessor.logger, `notice`)
          .mockImplementation();
        pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseAddedPullRequestsCommentsCount`)
          .mockImplementation();
        githubApiPullRequestCommentsServiceAddCommentSpy = jest
          .spyOn(pullRequestCommentsProcessor.githubApiPullRequestCommentsService$$, `addComment`)
          .mockImplementation();
      });

      it(`should check if the pull request close comment input is configured`, async (): Promise<void> => {
        expect.assertions(6);

        await pullRequestCommentsProcessor.processCloseComment();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a close comment should be added...`
        );
      });

      describe(`when the pull request close comment is not configured`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestCloseComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await pullRequestCommentsProcessor.processCloseComment();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The close comment is unset. Continuing...`
          );
          expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiPullRequestCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the pull request close comment is configured`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestCloseComment: `dummy-comment`,
            })
          );
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>({
                dryRun: true,
              })
            );
          });

          it(`should not add the close comment on the pull request`, async (): Promise<void> => {
            expect.assertions(1);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(githubApiPullRequestCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added pull requests comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
          });
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<ICommonInputs>({
                dryRun: false,
              })
            );
          });

          it(`should add the close comment on the pull request`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the close comment...`);
          });

          it(`should increase the added pull requests comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseAddedPullRequestsCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestCommentsProcessor.processCloseComment();

            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
          });
        });
      });
    });
  });
});
