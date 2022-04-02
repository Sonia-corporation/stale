import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueIgnoreProcessor } from '@core/processing/issues/issue-ignore-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
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

      expect(result.processor).toStrictEqual(issueProcessor);
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
      let hasAnyIgnoredAssigneesSpy: jest.SpyInstance;
      let hasAnyIgnoredProjectCardsSpy: jest.SpyInstance;
      let hasAnyIgnoredMilestonesSpy: jest.SpyInstance;
      let hasAllIgnoredLabelsSpy: jest.SpyInstance;
      let hasAllIgnoredAssigneesSpy: jest.SpyInstance;
      let hasAllIgnoredProjectCardsSpy: jest.SpyInstance;
      let hasIgnoredCreationDateSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        isLockedSpy = jest.spyOn(issueIgnoreProcessor, `isLocked$$`).mockImplementation();
        hasAnyIgnoredLabelsSpy = jest.spyOn(issueIgnoreProcessor, `hasAnyIgnoredLabels$$`).mockImplementation();
        hasAnyIgnoredAssigneesSpy = jest.spyOn(issueIgnoreProcessor, `hasAnyIgnoredAssignees$$`).mockImplementation();
        hasAnyIgnoredProjectCardsSpy = jest
          .spyOn(issueIgnoreProcessor, `hasAnyIgnoredProjectCards$$`)
          .mockImplementation();
        hasAnyIgnoredMilestonesSpy = jest.spyOn(issueIgnoreProcessor, `hasAnyIgnoredMilestones$$`).mockImplementation();
        hasAllIgnoredLabelsSpy = jest.spyOn(issueIgnoreProcessor, `hasAllIgnoredLabels$$`).mockImplementation();
        hasAllIgnoredAssigneesSpy = jest.spyOn(issueIgnoreProcessor, `hasAllIgnoredAssignees$$`).mockImplementation();
        hasAllIgnoredProjectCardsSpy = jest
          .spyOn(issueIgnoreProcessor, `hasAllIgnoredProjectCards$$`)
          .mockImplementation();
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

              it(`should check if the issue should ignore any assignees`, (): void => {
                expect.assertions(2);

                issueIgnoreProcessor.shouldIgnore();

                expect(hasAnyIgnoredAssigneesSpy).toHaveBeenCalledTimes(1);
                expect(hasAnyIgnoredAssigneesSpy).toHaveBeenCalledWith();
              });

              describe(`when the issue should ignore any assignees`, (): void => {
                beforeEach((): void => {
                  hasAnyIgnoredAssigneesSpy.mockReturnValue(true);
                });

                it(`should return true`, (): void => {
                  expect.assertions(1);

                  const result = issueIgnoreProcessor.shouldIgnore();

                  expect(result).toBeTrue();
                });
              });

              describe(`when the issue should not ignore any assignees`, (): void => {
                beforeEach((): void => {
                  hasAnyIgnoredAssigneesSpy.mockReturnValue(false);
                });

                it(`should check if the issue should ignore all project cards`, (): void => {
                  expect.assertions(2);

                  issueIgnoreProcessor.shouldIgnore();

                  expect(hasAllIgnoredProjectCardsSpy).toHaveBeenCalledTimes(1);
                  expect(hasAllIgnoredProjectCardsSpy).toHaveBeenCalledWith();
                });

                describe(`when the issue should ignore all project cards`, (): void => {
                  beforeEach((): void => {
                    hasAllIgnoredProjectCardsSpy.mockReturnValue(true);
                  });

                  it(`should return true`, (): void => {
                    expect.assertions(1);

                    const result = issueIgnoreProcessor.shouldIgnore();

                    expect(result).toBeTrue();
                  });
                });

                describe(`when the issue should not ignore all project cards`, (): void => {
                  beforeEach((): void => {
                    hasAllIgnoredProjectCardsSpy.mockReturnValue(false);
                  });

                  it(`should check if the issue should ignore any project cards`, (): void => {
                    expect.assertions(2);

                    issueIgnoreProcessor.shouldIgnore();

                    expect(hasAnyIgnoredProjectCardsSpy).toHaveBeenCalledTimes(1);
                    expect(hasAnyIgnoredProjectCardsSpy).toHaveBeenCalledWith();
                  });

                  describe(`when the issue should ignore any project cards`, (): void => {
                    beforeEach((): void => {
                      hasAnyIgnoredProjectCardsSpy.mockReturnValue(true);
                    });

                    it(`should return true`, (): void => {
                      expect.assertions(1);

                      const result = issueIgnoreProcessor.shouldIgnore();

                      expect(result).toBeTrue();
                    });
                  });

                  describe(`when the issue should not ignore any project cards`, (): void => {
                    beforeEach((): void => {
                      hasAnyIgnoredProjectCardsSpy.mockReturnValue(false);
                    });

                    it(`should check if the issue should ignore any milestones`, (): void => {
                      expect.assertions(2);

                      issueIgnoreProcessor.shouldIgnore();

                      expect(hasAnyIgnoredMilestonesSpy).toHaveBeenCalledTimes(1);
                      expect(hasAnyIgnoredMilestonesSpy).toHaveBeenCalledWith();
                    });

                    describe(`when the issue should ignore any project milestones`, (): void => {
                      beforeEach((): void => {
                        hasAnyIgnoredMilestonesSpy.mockReturnValue(true);
                      });

                      it(`should return true`, (): void => {
                        expect.assertions(1);

                        const result = issueIgnoreProcessor.shouldIgnore();

                        expect(result).toBeTrue();
                      });
                    });

                    describe(`when the issue should not ignore any milestones`, (): void => {
                      beforeEach((): void => {
                        hasAnyIgnoredMilestonesSpy.mockReturnValue(false);
                      });

                      it(`should check if the issue should be ignored based on its creation date`, (): void => {
                        expect.assertions(2);

                        issueIgnoreProcessor.shouldIgnore();

                        expect(hasIgnoredCreationDateSpy).toHaveBeenCalledTimes(1);
                        expect(hasIgnoredCreationDateSpy).toHaveBeenCalledWith();
                      });

                      describe(`when the issue should be ignored based on its creation date`, (): void => {
                        beforeEach((): void => {
                          hasIgnoredCreationDateSpy.mockReturnValue(true);
                        });

                        it(`should return true`, (): void => {
                          expect.assertions(1);

                          const result = issueIgnoreProcessor.shouldIgnore();

                          expect(result).toBeTrue();
                        });
                      });

                      describe(`when the issue should not be ignored based on its creation date`, (): void => {
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
          });
        });
      });
    });

    describe(`isLocked$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            locked: false,
          },
        });
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerDebugSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `debug`).mockImplementation();
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
            item: {
              locked: true,
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
          issueProcessorLoggerDebugSpy = jest
            .spyOn(issueIgnoreProcessor.processor.logger, `debug`)
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
            item: {
              locked: false,
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
          issueProcessorLoggerDebugSpy = jest
            .spyOn(issueIgnoreProcessor.processor.logger, `debug`)
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
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
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
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore issue with an assignee is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue has no assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  totalCount: 0,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
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
              item: {
                assignees: {
                  totalCount: 1,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
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

    describe(`hasAllIgnoredProjectCards$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueIgnoreAllProjectCards: false,
          })
        );
      });

      it(`should log about checking if the issue should ignore all the project cards`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAllIgnoredProjectCards$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the project cards on this issue should be ignored...`
        );
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore issue with a project card is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueIgnoreAllProjectCards: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = issueIgnoreProcessor.hasAllIgnoredProjectCards$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-project-cards`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore issue with a project card is enabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueIgnoreAllProjectCards: true,
            })
          );
        });

        it(`should check if the issue has at least one project card`, (): void => {
          expect.assertions(4);

          issueIgnoreProcessor.hasAllIgnoredProjectCards$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-ignore-all-project-cards`,
            `whiteBright-is enabled. Checking...`
          );
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue has no project card`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  totalCount: 0,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredProjectCards$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue has no project card. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has one project card`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  totalCount: 1,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueIgnoreAllProjectCards: true,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = issueIgnoreProcessor.hasAllIgnoredProjectCards$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue has`,
              `value-1`,
              `whiteBright-project card`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasIgnoredCreationDate$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorGetCreatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
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
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the date is not valid`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
            issuesInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IIssuesInputs>({
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
            issuesInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IIssuesInputs>({
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
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
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
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore issue with a label is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
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
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue has no label`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                labels: {
                  nodes: [],
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
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
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
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
              item: {
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
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
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
              item: {
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
              .spyOn(issueIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
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
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
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
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue has one of the ignored labels`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
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

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
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
            item: {
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

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
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
              item: {
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
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-labels attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningIssue.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `issue-ignore-processor.ts`,
                startLine: 212,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(`when the issue has less or just 20 labels`, (totalCount: number): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
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
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should not log a warning about finding too many labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(issueProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });

          it(`should not annotate about finding too many labels on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAnyIgnoredAssignees$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueIgnoreAnyAssignees: [`ignored-assignee`],
          })
        );
      });

      it(`should log about checking if the issue has one of the ignored assignees`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue has one of the ignored assignees...`
        );
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue has one of the ignored assignees`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              assignees: {
                nodes: [
                  createHydratedMock<IGithubApiAssignee>({
                    login: `ignored-assignee`,
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about the ignored assignee`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored assignees`,
            `white-->`,
            `value-ignored-assignee`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue does not have one of the ignored assignees`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              assignees: {
                nodes: [
                  createHydratedMock<IGithubApiAssignee>({
                    login: `not-ignored-assignee`,
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about not containing an ignored assignee`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored assignee. Continuing...`
          );
        });

        describe(`when the issue has more than 20 assignees`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `not-ignored-assignee`,
                    }),
                  ],
                  totalCount: 21,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many assignees on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-assignees attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many assignees on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningIssue.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `issue-ignore-processor.ts`,
                startLine: 259,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(`when the issue has less or just 20 assignees`, (totalCount: number): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `not-ignored-assignee`,
                    }),
                  ],
                  totalCount,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should not log a warning about finding too many assignees on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(issueProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });

          it(`should not annotate about finding too many assignees on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAnyIgnoredProjectCards$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueIgnoreAnyProjectCards: [`ignored-project-card`],
          })
        );
      });

      it(`should log about checking if the issue has one of the ignored project cards`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue has one of the ignored project cards...`
        );
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue has one of the ignored project cards`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              projectCards: {
                nodes: [
                  createHydratedMock<IGithubApiProjectCard>({
                    project: { name: `ignored-project-card` },
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about the ignored project card`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored project cards`,
            `white-->`,
            `value-ignored-project-card`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue does not have one of the ignored proejct cards`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              projectCards: {
                nodes: [
                  createHydratedMock<IGithubApiProjectCard>({
                    project: { name: `not-ignored-project-card` },
                  }),
                ],
              },
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about not containing an ignored project card`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored project card. Continuing...`
          );
        });

        describe(`when the issue has more than 20 project cards`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: { name: `not-ignored-project-card` },
                    }),
                  ],
                  totalCount: 21,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many project cards on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-project cards attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many project cards on this issue since the pagination is not handled`, (): void => {
            expect.assertions(2);

            issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningIssue.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `issue-ignore-processor.ts`,
                startLine: 306,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(`when the issue has less or just 20 project cards`, (totalCount: number): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: { name: `not-ignored-project-card` },
                    }),
                  ],
                  totalCount,
                },
              },
            });
            issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

            issueProcessorLoggerWarningSpy = jest
              .spyOn(issueIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should not log a warning about finding too many project cards on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(issueProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });

          it(`should not annotate about finding too many project cards on this issue since the pagination is not handled`, (): void => {
            expect.assertions(1);

            issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAnyIgnoredMilestones$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueIgnoreAnyMilestones: [`ignored-milestone`],
          })
        );
      });

      it(`should log about checking if the issue has one of the ignored milestones`, (): void => {
        expect.assertions(4);

        issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue has one of the ignored milestones...`
        );
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue has one of the ignored milestones`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              milestone: createHydratedMock<IGithubApiMilestone>({
                title: `ignored-milestone`,
              }),
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about the ignored milestone`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored milestones`,
            `white-->`,
            `value-ignored-milestone`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue does not have one of the ignored milestones`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              milestone: createHydratedMock<IGithubApiMilestone>({
                title: `not-ignored-milestone`,
              }),
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about not containing an ignored milestone`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored milestone. Continuing...`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when the issue does not have a milestone`, (): void => {
        beforeEach((): void => {
          issueProcessor = createHydratedMock<IssueProcessor>({
            item: {
              milestone: undefined,
            },
          });
          issueIgnoreProcessor = new IssueIgnoreProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueIgnoreProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should log about not containing an ignored milestone`, (): void => {
          expect.assertions(2);

          issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored milestone. Continuing...`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeFalse();
        });
      });
    });
  });
});
