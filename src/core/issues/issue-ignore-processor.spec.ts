import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
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
      let hasAnyIgnoredLabelsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        isLockedSpy = jest.spyOn(issueIgnoreProcessor, `isLocked$$`).mockImplementation();
        hasAnyIgnoredLabelsSpy = jest.spyOn(issueIgnoreProcessor, `hasAnyIgnoredLabels$$`).mockImplementation();
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

        it(`should check if the issue has one of the ignored labels`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.shouldIgnore();

          expect(hasAnyIgnoredLabelsSpy).toHaveBeenCalledTimes(1);
          expect(hasAnyIgnoredLabelsSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue has one of the ignored labels`, (): void => {
          beforeEach((): void => {
            hasAnyIgnoredLabelsSpy.mockReturnValue(true);
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIgnoreProcessor.shouldIgnore();

            expect(result).toBeTrue();
          });
        });

        describe(`when the issue does not have one of the ignored labels`, (): void => {
          beforeEach((): void => {
            hasAnyIgnoredLabelsSpy.mockReturnValue(false);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIgnoreProcessor.shouldIgnore();

            expect(result).toBeFalse();
          });
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

    describe(`hasAnyIgnoredLabels$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerWarningSpy: jest.SpyInstance;
      let inputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `warning`)
          .mockImplementation();
        inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueIgnoreAnyLabels: [`ignored-label`],
          })
        );
      });

      it(`should log about checking if the issue has one of the ignored labels`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAnyIgnoredLabels$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue has one of the ignored labels...`
        );
        expect(inputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the issue has one of the ignored labels`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            githubIssue: {
              labels: {
                nodes: [
                  createHydratedMock<IGithubApiLabel>({
                    name: `ignored-label`,
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about the ignored label`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored labels`,
            `white-->`,
            `value-ignored-label`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue does not have one of the ignored labels`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            githubIssue: {
              labels: {
                nodes: [
                  createHydratedMock<IGithubApiLabel>({
                    name: `not-ignored-label`,
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest
            .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored label`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored label. Continuing...`
          );
        });

        describe(`when the issue has more than 20 labels`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `not-ignored-label`,
                    }),
                  ],
                  totalCount: 21,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should log a warning about finding too much labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-labels attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });
        });

        describe.each([19, 20])(`when the issue has less or just 20 labels`, (totalCount: number): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `not-ignored-label`,
                    }),
                  ],
                  totalCount,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should not log a warning about finding too much labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(issueProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(result).toBeFalse();
        });
      });
    });
  });
});
