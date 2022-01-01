import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueIsStaleProcessor } from '@core/processing/issues/issue-is-stale-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueIsStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueIsStaleProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueIsStaleProcessor: IssueIsStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>({});
    });

    describe(`isStale()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIsStaleProcessor = new IssueIsStaleProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIsStaleProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueStaleLabel: `stale`,
          })
        );
      });

      it(`should check if the stale label is already added to this issue`, (): void => {
        expect.assertions(4);

        issueIsStaleProcessor.isStale();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if the issue is already stale...`);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue has already the stale label`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              labels: {
                nodes: [
                  createHydratedMock<IGithubApiLabel>({
                    name: `stale`,
                  }),
                ],
              },
            },
          });
          issueIsStaleProcessor = new IssueIsStaleProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIsStaleProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should return true`, (): void => {
          expect.assertions(3);

          const result = issueIsStaleProcessor.isStale();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The stale label is already added on this issue`
          );
          expect(result).toBeTrue();
        });
      });

      describe(`when the issue does not have the stale label`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
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
          issueIsStaleProcessor = new IssueIsStaleProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIsStaleProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueIsStaleProcessor.isStale();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The stale label is not yet on this issue`);
          expect(result).toBeFalse();
        });
      });
    });
  });
});
