import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssueCommentsService } from '@github/api/comments/github-api-issue-comments.service';
import { ECommentType } from '@utils/enums/comment-type.enum';
import { ICommentHeaderOptions } from '@utils/interfaces/comment-header-options.interface';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueCommentsProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueCommentsProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiIssueCommentsService`, (): void => {
      expect.assertions(1);

      const result = new IssueCommentsProcessor(issueProcessor);

      expect(result.githubApiIssueCommentsService$$).toBeInstanceOf(GithubApiIssueCommentsService);
    });
  });

  describe(`after creation`, (): void => {
    let issueCommentsProcessor: IssueCommentsProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`processStaleComment()`, (): void => {
      let issueId: IUuid;

      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy: jest.SpyInstance;
      let githubApiIssueCommentsServiceAddCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueCommentsProcessor = new IssueCommentsProcessor(issueProcessor);

        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueStaleComment: ``,
          })
        );
        issueProcessorLoggerInfoSpy = jest.spyOn(issueCommentsProcessor.processor.logger, `info`).mockImplementation();
        issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseAddedIssuesCommentsCount`)
          .mockImplementation();
        githubApiIssueCommentsServiceAddCommentSpy = jest
          .spyOn(issueCommentsProcessor.githubApiIssueCommentsService$$, `addComment`)
          .mockImplementation();
      });

      it(`should check if the issue stale comment input is configured`, async (): Promise<void> => {
        expect.assertions(6);

        await issueCommentsProcessor.processStaleComment();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a stale comment should be added...`
        );
      });

      describe(`when the issue stale comment is not configured`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueStaleComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await issueCommentsProcessor.processStaleComment();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The stale comment is unset. Continuing...`);
          expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiIssueCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the issue stale comment is configured`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueStaleComment: `dummy-comment`,
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

          it(`should not add the stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(1);

            await issueCommentsProcessor.processStaleComment();

            expect(githubApiIssueCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Stale comment added`);
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

          it(`should add the stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the stale comment...`);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Stale comment added`);
            expect(githubApiIssueCommentsServiceAddCommentSpy).toHaveBeenCalledTimes(1);
            expect(githubApiIssueCommentsServiceAddCommentSpy).toHaveBeenCalledWith(issueId, `dummy-comment`, {
              commentType: ECommentType.STALE,
            } as ICommentHeaderOptions);
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Stale comment added`);
          });
        });
      });
    });

    describe(`processCloseComment()`, (): void => {
      let issueId: IUuid;

      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy: jest.SpyInstance;
      let githubApiIssueCommentsServiceAddCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueCommentsProcessor = new IssueCommentsProcessor(issueProcessor);

        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueCloseComment: ``,
          })
        );
        issueProcessorLoggerInfoSpy = jest.spyOn(issueCommentsProcessor.processor.logger, `info`).mockImplementation();
        issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseAddedIssuesCommentsCount`)
          .mockImplementation();
        githubApiIssueCommentsServiceAddCommentSpy = jest
          .spyOn(issueCommentsProcessor.githubApiIssueCommentsService$$, `addComment`)
          .mockImplementation();
      });

      it(`should check if the issue close comment input is configured`, async (): Promise<void> => {
        expect.assertions(6);

        await issueCommentsProcessor.processCloseComment();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a close comment should be added...`
        );
      });

      describe(`when the issue close comment is not configured`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueCloseComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await issueCommentsProcessor.processCloseComment();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The close comment is unset. Continuing...`);
          expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiIssueCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the issue close comment is configured`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueCloseComment: `dummy-comment`,
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

          it(`should not add the close comment on the issue`, async (): Promise<void> => {
            expect.assertions(1);

            await issueCommentsProcessor.processCloseComment();

            expect(githubApiIssueCommentsServiceAddCommentSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Close comment added`);
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

          it(`should add the close comment on the issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the close comment...`);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Close comment added`);
            expect(githubApiIssueCommentsServiceAddCommentSpy).toHaveBeenCalledTimes(1);
            expect(githubApiIssueCommentsServiceAddCommentSpy).toHaveBeenCalledWith(issueId, `dummy-comment`, {
              commentType: ECommentType.CLOSE,
            } as ICommentHeaderOptions);
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Close comment added`);
          });
        });
      });
    });
  });
});
