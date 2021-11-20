import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueCloseStaleProcessor } from '@core/issues/issue-close-stale-processor';
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
      });

      it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
        expect.assertions(4);

        await issueCloseStaleProcessor.close();

        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(`Closing this issue...`);
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
          expect.assertions(4);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledTimes(1);
          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledWith(issueId);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Closed`);
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
          expect.assertions(3);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).not.toHaveBeenCalled();
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`Closed`);
        });
      });
    });
  });
});
