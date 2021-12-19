import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IssueCloseStaleProcessor } from '@core/processing/issues/issue-close-stale-processor';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueCloseStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiIssuesService`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.githubApiIssuesService$$).toBeInstanceOf(GithubApiIssuesService);
    });

    it(`should create the IssueCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.issueCommentsProcessor$$).toBeInstanceOf(IssueCommentsProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueCloseStaleProcessor: IssueCloseStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`close()`, (): void => {
      let issueId: IUuid;

      let githubApiIssuesServiceCloseIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let issueCommentsProcessorProcessCloseCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueCloseStaleProcessor = new IssueCloseStaleProcessor(issueProcessor);

        githubApiIssuesServiceCloseIssueSpy = jest
          .spyOn(issueCloseStaleProcessor.githubApiIssuesService$$, `closeIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueCloseStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueCloseStaleProcessor.processor.logger, `notice`)
          .mockImplementation();
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: true,
          })
        );
        issueCommentsProcessorProcessCloseCommentSpy = jest
          .spyOn(issueCloseStaleProcessor.issueCommentsProcessor$$, `processCloseComment`)
          .mockImplementation();
      });

      it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
        expect.assertions(4);

        await issueCloseStaleProcessor.close();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Closing this issue...`);
      });

      describe(`when the dry-run mode is disabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: false,
            })
          );
        });

        it(`should close the issue`, async (): Promise<void> => {
          expect.assertions(6);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledTimes(1);
          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledWith(issueId);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The issue was closed`);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
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

        it(`should not close the issue`, async (): Promise<void> => {
          expect.assertions(5);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).not.toHaveBeenCalled();
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was not closed due to the dry-run mode`
          );
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
