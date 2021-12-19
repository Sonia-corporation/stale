import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { PullRequestCloseStaleProcessor } from '@core/processing/pull-requests/pull-request-close-stale-processor';
import { PullRequestCommentsProcessor } from '@core/processing/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
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

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
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
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestCommentsProcessorProcessCloseCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            id: pullRequestId,
          },
        });
        pullRequestCloseStaleProcessor = new PullRequestCloseStaleProcessor(pullRequestProcessor);

        githubApiPullRequestsServiceClosePullRequestSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.githubApiPullRequestsService$$, `closePullRequest`)
          .mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.pullRequestProcessor.logger, `notice`)
          .mockImplementation();
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: true,
          })
        );
        pullRequestCommentsProcessorProcessCloseCommentSpy = jest
          .spyOn(pullRequestCloseStaleProcessor.pullRequestCommentsProcessor$$, `processCloseComment`)
          .mockImplementation();
      });

      it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
        expect.assertions(4);

        await pullRequestCloseStaleProcessor.close();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Closing this pull request...`);
      });

      describe(`when the dryn-run mode is disabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: false,
            })
          );
        });

        it(`should close the pull request`, async (): Promise<void> => {
          expect.assertions(6);

          await pullRequestCloseStaleProcessor.close();

          expect(githubApiPullRequestsServiceClosePullRequestSpy).toHaveBeenCalledTimes(1);
          expect(githubApiPullRequestsServiceClosePullRequestSpy).toHaveBeenCalledWith(pullRequestId);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The pull request was closed`);
          expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the dryn-run mode is enabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: true,
            })
          );
        });

        it(`should not close the pull request`, async (): Promise<void> => {
          expect.assertions(5);

          await pullRequestCloseStaleProcessor.close();

          expect(githubApiPullRequestsServiceClosePullRequestSpy).not.toHaveBeenCalled();
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request was not closed due to the dry-run mode`
          );
          expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await pullRequestCloseStaleProcessor.close();

          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
