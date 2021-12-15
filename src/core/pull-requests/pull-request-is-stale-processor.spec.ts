import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestIsStaleProcessor } from '@core/pull-requests/pull-request-is-stale-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestIsStaleProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestIsStaleProcessor(pullRequestProcessor);

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestIsStaleProcessor: PullRequestIsStaleProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>({});
    });

    describe(`isStale()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestIsStaleProcessor = new PullRequestIsStaleProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIsStaleProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IPullRequestsInputs>({
            pullRequestStaleLabel: `stale`,
          })
        );
      });

      it(`should check if the stale label is already added to this pull request`, (): void => {
        expect.assertions(4);

        pullRequestIsStaleProcessor.isStale();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the pull request is already stale...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request has already the stale label`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            githubPullRequest: {
              labels: {
                nodes: [
                  createHydratedMock<IGithubApiLabel>({
                    name: `stale`,
                  }),
                ],
              },
            },
          });
          pullRequestIsStaleProcessor = new PullRequestIsStaleProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIsStaleProcessor.pullRequestProcessor.logger, `info`)
            .mockImplementation();
        });

        it(`should return true`, (): void => {
          expect.assertions(3);

          const result = pullRequestIsStaleProcessor.isStale();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The stale label is already added on this pull request`
          );
          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not have the stale label`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            githubPullRequest: {
              labels: {
                nodes: [
                  createHydratedMock<IGithubApiLabel>({
                    name: `marco`,
                  }),
                  createHydratedMock<IGithubApiLabel>({
                    name: `polo`,
                  }),
                ],
              },
            },
          });
          pullRequestIsStaleProcessor = new PullRequestIsStaleProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIsStaleProcessor.pullRequestProcessor.logger, `info`)
            .mockImplementation();
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIsStaleProcessor.isStale();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The stale label is not yet on this pull request`
          );
          expect(result).toBeFalse();
        });
      });
    });
  });
});
