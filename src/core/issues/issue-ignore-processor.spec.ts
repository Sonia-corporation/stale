import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueIgnoreProcessor } from '@core/issues/issue-ignore-processor';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { DateTime } from 'luxon';
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
      let hasAllIgnoredLabelsSpy: jest.SpyInstance;
      let hasAllIgnoredAssigneesSpy: jest.SpyInstance;
      let hasIgnoredCreationDateSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        isLockedSpy = jest.spyOn(issueIgnoreProcessor, `isLocked$$`).mockImplementation();
        hasAnyIgnoredLabelsSpy = jest.spyOn(issueIgnoreProcessor, `hasAnyIgnoredLabels$$`).mockImplementation();
        hasAllIgnoredLabelsSpy = jest.spyOn(issueIgnoreProcessor, `hasAllIgnoredLabels$$`).mockImplementation();
        hasAllIgnoredAssigneesSpy = jest.spyOn(issueIgnoreProcessor, `hasAllIgnoredAssignees$$`).mockImplementation();
        hasIgnoredCreationDateSpy = jest.spyOn(issueIgnoreProcessor, `hasIgnoredCreationDate$$`).mockImplementation();
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

        it(`should check if the issue should ignore all labels`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.shouldIgnore();

          expect(hasAllIgnoredLabelsSpy).toHaveBeenCalledTimes(1);
          expect(hasAllIgnoredLabelsSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue should ignore all the labels`, (): void => {
          beforeEach((): void => {
            hasAllIgnoredLabelsSpy.mockReturnValue(true);
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIgnoreProcessor.shouldIgnore();

            expect(result).toBeTrue();
          });
        });

        describe(`when the issue should not ignore all the labels`, (): void => {
          beforeEach((): void => {
            hasAllIgnoredLabelsSpy.mockReturnValue(false);
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

            it(`should check if the issue should ignore all assignees`, (): void => {
              expect.assertions(2);

              issueIgnoreProcessor.shouldIgnore();

              expect(hasAllIgnoredAssigneesSpy).toHaveBeenCalledTimes(1);
              expect(hasAllIgnoredAssigneesSpy).toHaveBeenCalledWith();
            });

            describe(`when the issue should ignore all assignees`, (): void => {
              beforeEach((): void => {
                hasAllIgnoredAssigneesSpy.mockReturnValue(true);
              });

              it(`should return true`, (): void => {
                expect.assertions(1);

                const result = issueIgnoreProcessor.shouldIgnore();

                expect(result).toBeTrue();
              });
            });

            describe(`when the issue should not ignore all assignees`, (): void => {
              beforeEach((): void => {
                hasAllIgnoredAssigneesSpy.mockReturnValue(false);
              });

              it(`should check if the issue should ignore based on the creation date`, (): void => {
                expect.assertions(2);

                issueIgnoreProcessor.shouldIgnore();

                expect(hasIgnoredCreationDateSpy).toHaveBeenCalledTimes(1);
                expect(hasIgnoredCreationDateSpy).toHaveBeenCalledWith();
              });

              describe(`when the issue should ignore based on the creation date`, (): void => {
                beforeEach((): void => {
                  hasIgnoredCreationDateSpy.mockReturnValue(true);
                });

                it(`should return true`, (): void => {
                  expect.assertions(1);

                  const result = issueIgnoreProcessor.shouldIgnore();

                  expect(result).toBeTrue();
                });
              });

              describe(`when the issue should not ignore based on the creation date`, (): void => {
                beforeEach((): void => {
                  hasIgnoredCreationDateSpy.mockReturnValue(false);
                });

                it(`should return false`, (): void => {
                  expect.assertions(1);

                  const result = issueIgnoreProcessor.shouldIgnore();

                  expect(result).toBeFalse();
                });
              });
            });
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

    describe(`hasAllIgnoredAssignees$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let inputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueIgnoreAllAssignees: false,
          })
        );
      });

      it(`should log about checking if the issue should ignore all the assignees`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAllIgnoredAssignees$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the assignees on this issue should be ignored...`
        );
        expect(inputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore issue with an assignee is disabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreAllAssignees: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueIgnoreProcessor.hasAllIgnoredAssignees$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-assignees`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore issue with an assignee is enabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreAllAssignees: true,
            })
          );
        });

        it(`should check if the issue has at least one assignee`, (): void => {
          expect.assertions(4);

          issueIgnoreProcessor.hasAllIgnoredAssignees$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-assignees`,
            `whiteBright-is enabled. Checking...`
          );
          expect(inputsServiceGetInputs).toHaveBeenCalledTimes(1);
          expect(inputsServiceGetInputs).toHaveBeenCalledWith();
        });

        describe(`when the issue has no assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                assignees: {
                  totalCount: 0,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredAssignees$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The issue has no assignee. Continuing...`);
            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has one assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                assignees: {
                  totalCount: 1,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
            inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreAllAssignees: true,
              })
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredAssignees$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue has`,
              `value-1`,
              `whiteBright-assignee`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasIgnoredCreationDate$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let inputsServiceGetInputs: jest.SpyInstance;
      let issueProcessorGetCreatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueIgnoreBeforeCreationDate: ``,
          })
        );
        issueProcessorGetCreatedAtSpy = jest.spyOn(issueProcessor, `getCreatedAt`).mockReturnValue(DateTime.utc(2020));
      });

      it(`should try to get the issue ignore before creation date input and parse it`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasIgnoredCreationDate$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should be ignored based on its creation date...`
        );
        expect(inputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the date is not valid`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreBeforeCreationDate: `dummy`,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueIgnoreProcessor.hasIgnoredCreationDate$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-before-creation-date`,
            `whiteBright-is either unset or not convertible to a valid ISO 8601 date. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the date is valid`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                includeOffset: false,
              }),
            })
          );
        });

        it(`should get the creation date of the issue`, (): void => {
          expect.assertions(5);

          issueIgnoreProcessor.hasIgnoredCreationDate$$();

          expect(issueProcessorGetCreatedAtSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorGetCreatedAtSpy).toHaveBeenCalledWith();
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was created the`,
            `date-01/01/2020, 00:00:00`
          );
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The minimal processing creation date is set to the`,
            `date-01/01/2020, 00:00:00`
          );
        });

        describe(`when the creation date of the issue is more recent that the creation date input`, (): void => {
          beforeEach((): void => {
            issueProcessorGetCreatedAtSpy.mockReturnValue(DateTime.now());
            inputsServiceGetInputs.mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                  includeOffset: false,
                }),
              })
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasIgnoredCreationDate$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was created after the minimal processing creation date. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the creation date of the issue is older that the creation date input`, (): void => {
          beforeEach((): void => {
            issueProcessorGetCreatedAtSpy.mockReturnValue(DateTime.utc(2019));
            inputsServiceGetInputs.mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                  includeOffset: false,
                }),
              })
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasIgnoredCreationDate$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was created before the minimal processing creation date`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasAllIgnoredLabels$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let inputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueIgnoreAllLabels: false,
          })
        );
      });

      it(`should log about checking if the issue should ignore all the labels`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAllIgnoredLabels$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the labels on this issue should be ignored...`
        );
        expect(inputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore issue with a label is disabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreAllLabels: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueIgnoreProcessor.hasAllIgnoredLabels$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-labels`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore issue with a label is enabled`, (): void => {
        beforeEach((): void => {
          inputsServiceGetInputs.mockReturnValue(
            createHydratedMock<IInputs>({
              issueIgnoreAllLabels: true,
            })
          );
        });

        it(`should check if the issue has at least one label (except the stale one)`, (): void => {
          expect.assertions(4);

          issueIgnoreProcessor.hasAllIgnoredLabels$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-labels`,
            `whiteBright-is enabled. Checking...`
          );
          expect(inputsServiceGetInputs).toHaveBeenCalledTimes(2);
          expect(inputsServiceGetInputs).toHaveBeenNthCalledWith(2);
        });

        describe(`when the issue has no label`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [],
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The issue has no label. Continuing...`);
            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has one label which is the stale one`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `stale`,
                    }),
                  ],
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
            inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreAllLabels: true,
                issueStaleLabel: `stale`,
              })
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The issue has no label. Continuing...`);
            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has one label which is not the stale one`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `not-stale`,
                    }),
                  ],
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
            inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreAllLabels: true,
                issueStaleLabel: `stale`,
              })
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue has`,
              `value-1`,
              `whiteBright-label`
            );
            expect(result).toBeTrue();
          });
        });

        describe(`when the issue has three labels which are not the stale one`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              githubIssue: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      name: `not-stale`,
                    }),
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
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
            inputsServiceGetInputs = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueIgnoreAllLabels: true,
                issueStaleLabel: `stale`,
              })
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue has`,
              `value-3`,
              `whiteBright-labels`
            );
            expect(result).toBeTrue();
          });
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
