import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueCloseStaleProcessor } from '@core/issues/issue-close-stale-processor';
import { IssueCommentsProcessor } from '@core/issues/issue-comments-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
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

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiLabelsService`, (): void => {
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
      let inputsServiceGetInputsSpy: jest.SpyInstance;
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
          .spyOn(issueCloseStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueCloseStaleProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
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

        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Closing this issue...`);
      });

      describe(`when the dryn-run mode is disabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
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

      describe(`when the dryn-run mode is enabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IInputs>({
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
