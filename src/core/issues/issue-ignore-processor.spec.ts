import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueIgnoreProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueIgnoreProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueIgnoreProcessor: IssueIgnoreProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldIgnore()`, (): void => {
      let isLockedSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        isLockedSpy = jest.spyOn(issueIgnoreProcessor, `isLocked$$`).mockImplementation();
      });

      it(`should check if the issue is locked`, (): void => {
        expect.assertions(2);

        issueIgnoreProcessor.shouldIgnore();

        expect(isLockedSpy).toHaveBeenCalledTimes(1);
        expect(isLockedSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue is locked`, (): void => {
        beforeEach((): void => {
          isLockedSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.shouldIgnore();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue is not locked`, (): void => {
        beforeEach((): void => {
          isLockedSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.shouldIgnore();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`isLocked$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            locked: false,
          },
        });
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerDebugSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `debug`)
          .mockImplementation();
      });

      it(`should log about checking the locked state`, (): void => {
        expect.assertions(2);

        issueIgnoreProcessor.isLocked$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if this issue is locked...`);
      });

      describe(`when the issue is locked`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            githubIssue: {
              locked: true,
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
            .mockImplementation();
          issueProcessorLoggerDebugSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `debug`)
            .mockImplementation();
        });

        it(`should log about the locked issue`, (): void => {
          expect.assertions(4);

          issueIgnoreProcessor.isLocked$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `Locked`);
          expect(issueProcessorLoggerDebugSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerDebugSpy).toHaveBeenCalledWith(
            `We do not process locked issues; it is in the name: locked`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.isLocked$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue is not locked`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            githubIssue: {
              locked: false,
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
            .mockImplementation();
          issueProcessorLoggerDebugSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `debug`)
            .mockImplementation();
        });

        it(`should log about being not locked`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.isLocked$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `Not locked. Continuing...`);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.isLocked$$();

          expect(result).toBeFalse();
        });
      });
    });
  });
});
