import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueCommentsProcessor } from '@core/issues/issue-comments-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { StatisticsService } from '@core/statistics/statistics.service';
import { GithubApiCommentsService } from '@github/api/comments/github-api-comments.service';
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

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiCommentsService`, (): void => {
      expect.assertions(1);

      const result = new IssueCommentsProcessor(issueProcessor);

      expect(result.githubApiCommentsService$$).toBeInstanceOf(GithubApiCommentsService);
    });
  });

  describe(`after creation`, (): void => {
    let issueCommentsProcessor: IssueCommentsProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`processStaleComment()`, (): void => {
      let issueId: IUuid;

      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let statisticsServiceIncreaseAddedIssuesCommentsCountSpy: jest.SpyInstance;
      let githubApiCommentsServiceAddCommentToIssueSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueCommentsProcessor = new IssueCommentsProcessor(issueProcessor);

        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            dryRun: false,
            issueStaleComment: ``,
          })
        );
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueCommentsProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueCommentsProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
        statisticsServiceIncreaseAddedIssuesCommentsCountSpy = jest
          .spyOn(StatisticsService, `increaseAddedIssuesCommentsCount`)
          .mockImplementation();
        githubApiCommentsServiceAddCommentToIssueSpy = jest
          .spyOn(issueCommentsProcessor.githubApiCommentsService$$, `addCommentToIssue`)
          .mockImplementation();
      });

      it(`should check if the issue stale comment input is configured`, async (): Promise<void> => {
        expect.assertions(4);

        await issueCommentsProcessor.processStaleComment();

        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a stale comment should be added...`
        );
      });

      describe(`when the issue stale comment is not configured`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
              dryRun: false,
              issueStaleComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await issueCommentsProcessor.processStaleComment();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The stale comment is unset. Continuing...`);
          expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiCommentsServiceAddCommentToIssueSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the issue stale comment is configured`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
              dryRun: false,
              issueStaleComment: `dummy-comment`,
            })
          );
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: true,
                issueStaleComment: `dummy-comment`,
              })
            );
          });

          it(`should not add the stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(1);

            await issueCommentsProcessor.processStaleComment();

            expect(githubApiCommentsServiceAddCommentToIssueSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
          });
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: false,
                issueStaleComment: `dummy-comment`,
              })
            );
          });

          it(`should add the stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(5);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The stale comment is set to`,
              `value-dummy-comment`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the stale comment...`);
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processStaleComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Stale comment added`);
          });
        });
      });
    });

    describe(`processCloseComment()`, (): void => {
      let issueId: IUuid;

      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let statisticsServiceIncreaseAddedIssuesCommentsCountSpy: jest.SpyInstance;
      let githubApiCommentsServiceAddCommentToIssueSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueCommentsProcessor = new IssueCommentsProcessor(issueProcessor);

        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            dryRun: false,
            issueCloseComment: ``,
          })
        );
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueCommentsProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueCommentsProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
        statisticsServiceIncreaseAddedIssuesCommentsCountSpy = jest
          .spyOn(StatisticsService, `increaseAddedIssuesCommentsCount`)
          .mockImplementation();
        githubApiCommentsServiceAddCommentToIssueSpy = jest
          .spyOn(issueCommentsProcessor.githubApiCommentsService$$, `addCommentToIssue`)
          .mockImplementation();
      });

      it(`should check if the issue close comment input is configured`, async (): Promise<void> => {
        expect.assertions(4);

        await issueCommentsProcessor.processCloseComment();

        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if a close comment should be added...`
        );
      });

      describe(`when the issue close comment is not configured`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
              dryRun: false,
              issueCloseComment: ``,
            })
          );
        });

        it(`should continue the process`, async (): Promise<void> => {
          expect.assertions(4);

          await issueCommentsProcessor.processCloseComment();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The close comment is unset. Continuing...`);
          expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).not.toHaveBeenCalled();
          expect(githubApiCommentsServiceAddCommentToIssueSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the issue close comment is configured`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
              dryRun: false,
              issueCloseComment: `dummy-comment`,
            })
          );
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: true,
                issueCloseComment: `dummy-comment`,
              })
            );
          });

          it(`should not add the close comment on the issue`, async (): Promise<void> => {
            expect.assertions(1);

            await issueCommentsProcessor.processCloseComment();

            expect(githubApiCommentsServiceAddCommentToIssueSpy).not.toHaveBeenCalled();
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(4);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
          });
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: false,
                issueCloseComment: `dummy-comment`,
              })
            );
          });

          it(`should add the close comment on the issue`, async (): Promise<void> => {
            expect.assertions(5);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The close comment is set to`,
              `value-dummy-comment`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Adding the close comment...`);
          });

          it(`should increase the added issues comments count by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledTimes(1);
            expect(statisticsServiceIncreaseAddedIssuesCommentsCountSpy).toHaveBeenCalledWith();
          });

          it(`should continue the process`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCommentsProcessor.processCloseComment();

            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Close comment added`);
          });
        });
      });
    });
  });
});
