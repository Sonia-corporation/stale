import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueShouldCloseStaleProcessor } from '@core/issues/issue-should-close-stale-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueShouldCloseStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueShouldCloseStaleProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueShouldCloseStaleProcessor: IssueShouldCloseStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldClose()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorGetUpdatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueShouldCloseStaleProcessor = new IssueShouldCloseStaleProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueShouldCloseStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueDaysBeforeClose: 10,
          })
        );
        issueProcessorGetUpdatedAtSpy = jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));
      });

      it(`should check if the issue should be closed based on the update date`, (): void => {
        expect.assertions(9);

        issueShouldCloseStaleProcessor.shouldClose();

        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorGetUpdatedAtSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorGetUpdatedAtSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if the issue should be close...`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `A stale issue should be closed after`,
          `value-10`,
          `whiteBright-days`
        );
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          3,
          `The issue was updated for the last time the`,
          `date-01/01/2020, 00:00:00`
        );
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          4,
          `The issue should be closed if not updated until`,
          `date-11/01/2020, 00:00:00`
        );
      });

      describe(`when the issue should not be closed`, (): void => {
        beforeEach((): void => {
          issueProcessorGetUpdatedAtSpy.mockReturnValue(DateTime.now());
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueShouldCloseStaleProcessor.shouldClose();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The issue should remain stale`);
          expect(result).toBeFalse();
        });
      });

      describe(`when the issue should be closed`, (): void => {
        beforeEach((): void => {
          issueProcessorGetUpdatedAtSpy.mockReturnValue(DateTime.utc(2020));
        });

        it(`should return true`, (): void => {
          expect.assertions(4);

          const result = issueShouldCloseStaleProcessor.shouldClose();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            5,
            `The last update on the issue was made more than`,
            `value-10`,
            `whiteBright-days ago`
          );
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The issue should be closed`);
          expect(result).toBeTrue();
        });
      });
    });
  });
});
