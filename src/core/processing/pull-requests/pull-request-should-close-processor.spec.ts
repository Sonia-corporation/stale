import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestShouldCloseProcessor } from '@core/processing/pull-requests/pull-request-should-close-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestShouldCloseProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestShouldCloseProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestShouldCloseStaleProcessor: PullRequestShouldCloseProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldClose()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorGetUpdatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestShouldCloseStaleProcessor = new PullRequestShouldCloseProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestShouldCloseStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestDaysBeforeClose: 10,
            })
          );
        pullRequestProcessorGetUpdatedAtSpy = jest
          .spyOn(pullRequestProcessor, `getUpdatedAt`)
          .mockReturnValue(DateTime.utc(2020));
      });

      it(`should check if the pull request should be closed based on the update date`, (): void => {
        expect.assertions(9);

        pullRequestShouldCloseStaleProcessor.shouldClose();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorGetUpdatedAtSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorGetUpdatedAtSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the pull request should be close...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `A stale pull request should be closed after`,
          `value-10`,
          `whiteBright-days`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          3,
          `The pull request was updated for the last time the`,
          `date-01/01/2020, 00:00:00`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          4,
          `The pull request should be closed if not updated until`,
          `date-11/01/2020, 00:00:00`
        );
      });

      describe(`when the pull request should not be closed`, (): void => {
        beforeEach((): void => {
          pullRequestProcessorGetUpdatedAtSpy.mockReturnValue(DateTime.now());
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestShouldCloseStaleProcessor.shouldClose();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The pull request should remain stale`);
          expect(result).toBeFalse();
        });
      });

      describe(`when the pull request should be closed`, (): void => {
        beforeEach((): void => {
          pullRequestProcessorGetUpdatedAtSpy.mockReturnValue(DateTime.utc(2020));
        });

        it(`should return true`, (): void => {
          expect.assertions(4);

          const result = pullRequestShouldCloseStaleProcessor.shouldClose();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            5,
            `The last update on the pull request was made more than`,
            `value-10`,
            `whiteBright-days ago`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The pull request should be closed`);
          expect(result).toBeTrue();
        });
      });
    });
  });
});
