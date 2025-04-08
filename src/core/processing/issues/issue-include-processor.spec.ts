import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueIncludeProcessor } from '@core/processing/issues/issue-include-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueIncludeProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueIncludeProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueIncludeProcessor: IssueIncludeProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldInclude()`, (): void => {
      let shouldIncludeAnyWhiteListedProject$$Spy: jest.SpyInstance;
      let shouldIncludeAnyWhiteListedMilestone$$Spy: jest.SpyInstance;
      let shouldIncludeAnyWhiteListedAssignee$$Spy: jest.SpyInstance;
      let shouldIncludeAnyAssignee$$Spy: jest.SpyInstance;
      let shouldIncludeAnyMilestone$$Spy: jest.SpyInstance;
      let shouldIncludeAnyProject$$Spy: jest.SpyInstance;

      beforeEach((): void => {
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        shouldIncludeAnyWhiteListedProject$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyWhiteListedProject$$`)
          .mockImplementation();
        shouldIncludeAnyWhiteListedMilestone$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyWhiteListedMilestone$$`)
          .mockImplementation();
        shouldIncludeAnyWhiteListedAssignee$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyWhiteListedAssignee$$`)
          .mockImplementation();
        shouldIncludeAnyAssignee$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyAssignee$$`)
          .mockImplementation();
        shouldIncludeAnyMilestone$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyMilestone$$`)
          .mockImplementation();
        shouldIncludeAnyProject$$Spy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyProject$$`)
          .mockImplementation();
      });

      it(`should check if the issue should be processed because she belongs to any of the white-listed project`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldInclude();

        expect(shouldIncludeAnyWhiteListedProject$$Spy).toHaveBeenCalledTimes(1);
        expect(shouldIncludeAnyWhiteListedProject$$Spy).toHaveBeenCalledWith();
      });

      describe(`when the issue belongs to any of the white-listed project`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProject$$Spy.mockReturnValue(true);
        });

        it(`should check if the issue should be processed because she belongs to any of the white-listed milestone`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldInclude();

          expect(shouldIncludeAnyWhiteListedMilestone$$Spy).toHaveBeenCalledTimes(1);
          expect(shouldIncludeAnyWhiteListedMilestone$$Spy).toHaveBeenCalledWith();
        });

        describe(`when the issue belongs to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestone$$Spy.mockReturnValue(true);
          });

          it(`should check if the issue should be processed because she belongs to any of the white-listed assignee`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldInclude();

            expect(shouldIncludeAnyWhiteListedAssignee$$Spy).toHaveBeenCalledTimes(1);
            expect(shouldIncludeAnyWhiteListedAssignee$$Spy).toHaveBeenCalledWith();
          });

          describe(`when the issue belongs to any of the white-listed assignee`, (): void => {
            beforeEach((): void => {
              shouldIncludeAnyWhiteListedAssignee$$Spy.mockReturnValue(true);
            });

            it(`should check if the issue should be processed because she has at least one of assignee`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldInclude();

              expect(shouldIncludeAnyAssignee$$Spy).toHaveBeenCalledTimes(1);
              expect(shouldIncludeAnyAssignee$$Spy).toHaveBeenCalledWith();
            });

            describe(`when the issue has at least one assignee`, (): void => {
              beforeEach((): void => {
                shouldIncludeAnyAssignee$$Spy.mockReturnValue(true);
              });

              it(`should check if the issue should be processed because she has at least one of milestone`, (): void => {
                expect.assertions(2);

                issueIncludeProcessor.shouldInclude();

                expect(shouldIncludeAnyMilestone$$Spy).toHaveBeenCalledTimes(1);
                expect(shouldIncludeAnyMilestone$$Spy).toHaveBeenCalledWith();
              });

              describe(`when the issue has at least one milestone`, (): void => {
                beforeEach((): void => {
                  shouldIncludeAnyMilestone$$Spy.mockReturnValue(true);
                });

                it(`should check if the issue should be processed because she has at least one of project`, (): void => {
                  expect.assertions(2);

                  issueIncludeProcessor.shouldInclude();

                  expect(shouldIncludeAnyProject$$Spy).toHaveBeenCalledTimes(1);
                  expect(shouldIncludeAnyProject$$Spy).toHaveBeenCalledWith();
                });

                describe(`when the issue has at least one project`, (): void => {
                  beforeEach((): void => {
                    shouldIncludeAnyProject$$Spy.mockReturnValue(true);
                  });

                  it(`should return true`, (): void => {
                    expect.assertions(1);

                    const result = issueIncludeProcessor.shouldInclude();

                    expect(result).toBeTrue();
                  });
                });

                describe(`when the issue has no project`, (): void => {
                  beforeEach((): void => {
                    shouldIncludeAnyProject$$Spy.mockReturnValue(false);
                  });

                  it(`should return false`, (): void => {
                    expect.assertions(1);

                    const result = issueIncludeProcessor.shouldInclude();

                    expect(result).toBeFalse();
                  });
                });
              });

              describe(`when the issue has no milestone`, (): void => {
                beforeEach((): void => {
                  shouldIncludeAnyMilestone$$Spy.mockReturnValue(false);
                });

                it(`should return false`, (): void => {
                  expect.assertions(1);

                  const result = issueIncludeProcessor.shouldInclude();

                  expect(result).toBeFalse();
                });
              });
            });

            describe(`when the issue has no assignee`, (): void => {
              beforeEach((): void => {
                shouldIncludeAnyAssignee$$Spy.mockReturnValue(false);
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = issueIncludeProcessor.shouldInclude();

                expect(result).toBeFalse();
              });
            });
          });

          describe(`when the issue does not belong to any of the white-listed assignee`, (): void => {
            beforeEach((): void => {
              shouldIncludeAnyWhiteListedAssignee$$Spy.mockReturnValue(false);
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldInclude();

              expect(result).toBeFalse();
            });
          });
        });

        describe(`when the issue does not belong to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestone$$Spy.mockReturnValue(false);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldInclude();

            expect(result).toBeFalse();
          });
        });
      });

      describe(`when the issue does not belong to any of the white-listed project`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProject$$Spy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldInclude();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedProject$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIncludeProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyAnyProjects: [],
          })
        );
      });

      it(`should log about checking the issue-only-any-projects input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed based on any of the associated projects...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-any-projects input is empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyProjects: [],
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-projects`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-any-projects input is not empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyProjects: [`dummy-project`],
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-projects`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the issue has no project`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-project`],
                })
              );
          });

          it(`should log about not containing any project (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one project`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-project`],
                })
              );
          });

          describe(`when none of the projects match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the projects match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  projectsV2: {
                    nodes: [
                      createHydratedMock<IGithubApiProject>({
                        title: `dummy-project`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

              issueProcessorLoggerInfoSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              issueProcessorLoggerWarningSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              issuesInputsServiceGetInputsSpy = jest
                .spyOn(IssuesInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IIssuesInputs>({
                    issueOnlyAnyProjects: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many projects on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-projects attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many projects on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_PROJECTS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 87,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the projects match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about finding one project in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project`,
                `white-->`,
                `value-dummy-project`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeTrue();
            });
          });
        });

        describe(`when the issue has two projects`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project-1`,
                    }),
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-project`],
                })
              );
          });

          describe(`when none of the projects match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-projects on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the projects match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  projectsV2: {
                    nodes: [
                      createHydratedMock<IGithubApiProject>({
                        title: `dummy-project-1`,
                      }),
                      createHydratedMock<IGithubApiProject>({
                        title: `dummy-project-2`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

              issueProcessorLoggerInfoSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              issueProcessorLoggerWarningSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              issuesInputsServiceGetInputsSpy = jest
                .spyOn(IssuesInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IIssuesInputs>({
                    issueOnlyAnyProjects: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many projects on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-projects attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many projects on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_PROJECTS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 87,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-projects on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the projects match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjects: [`dummy-project-2`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-projects on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about finding one project in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project`,
                `white-->`,
                `value-dummy-project-2`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProject$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedMilestone$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyAnyMilestones: [],
          })
        );
      });

      it(`should log about checking the issue-only-any-milestones input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed based on any of the associated milestones...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-any-milestones input is empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyMilestones: [],
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-milestones`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-any-milestones input is not empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyMilestones: [`dummy-milestone`],
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-milestones`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the issue has no milestone`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                milestone: undefined,
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
          });

          it(`should log about not containing any milestone (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing a milestone. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has a milestone`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                milestone: createHydratedMock<IGithubApiMilestone>({
                  title: `dummy-milestone`,
                }),
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
          });

          describe(`when none of the milestones match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyMilestones: [`dummy-other-milestone`],
                })
              );
            });

            it(`should log the milestone name`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found the milestone`,
                `value-dummy-milestone`,
                `whiteBright-on this issue`
              );
            });

            it(`should log about not containing any white-listed milestone (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required milestone. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the milestones match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
            });

            it(`should log the milestone name`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found the milestone`,
                `value-dummy-milestone`,
                `whiteBright-on this issue`
              );
            });

            it(`should log about finding one milestone in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required milestone`,
                `white-->`,
                `value-dummy-milestone`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedAssignee$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerWarningSpy = jest
          .spyOn(issueIncludeProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyAnyAssignees: [],
          })
        );
      });

      it(`should log about checking the issue-only-any-assignees input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed based on any of the associated assignees...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-any-assignees input is empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyAssignees: [],
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-assignees`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-any-assignees input is not empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyAssignees: [`dummy-assignee`],
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-assignees`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the issue has no assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-assignee`],
                })
              );
          });

          it(`should log about not containing any assignee (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any assignee. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-assignee`],
                })
              );
          });

          describe(`when none of the assignees match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-other-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this issue`,
                `value-dummy-assignee`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the assignees match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  assignees: {
                    nodes: [
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

              issueProcessorLoggerInfoSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              issueProcessorLoggerWarningSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              issuesInputsServiceGetInputsSpy = jest
                .spyOn(IssuesInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IIssuesInputs>({
                    issueOnlyAnyAssignees: [`dummy-other-assignee`],
                  })
                );
            });

            it(`should log a warning about finding too many assignees on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-assignees attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many assignees on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 233,
                  title: `Warning`,
                }
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this issue`,
                `value-dummy-assignee`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the assignees match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this issue`,
                `value-dummy-assignee`
              );
            });

            it(`should log about finding one assignee in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required assignee`,
                `white-->`,
                `value-dummy-assignee`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeTrue();
            });
          });
        });

        describe(`when the issue has two assignees`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-1`,
                    }),
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            issuesInputsServiceGetInputsSpy = jest
              .spyOn(IssuesInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-assignee`],
                })
              );
          });

          describe(`when none of the assignees match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-other-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this issue`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the assignees match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  assignees: {
                    nodes: [
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee-1`,
                      }),
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee-2`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

              issueProcessorLoggerInfoSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              issueProcessorLoggerWarningSpy = jest
                .spyOn(issueIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              issuesInputsServiceGetInputsSpy = jest
                .spyOn(IssuesInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IIssuesInputs>({
                    issueOnlyAnyAssignees: [`dummy-other-assignee`],
                  })
                );
            });

            it(`should log a warning about finding too many assignees on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-assignees attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many assignees on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 233,
                  title: `Warning`,
                }
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this issue`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the assignees match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyAssignees: [`dummy-assignee-2`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this issue`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about finding one assignee in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required assignee`,
                `white-->`,
                `value-dummy-assignee-2`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyAssignee$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyWithAssignees: false,
          })
        );
      });

      it(`should log about checking the issue-only-with-assignees input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyAssignee$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed when having at least one associated assignee...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyAssignee$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-with-assignees input is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithAssignees: false,
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-assignees`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-with-assignees input is enabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithAssignees: true,
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-assignees`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the issue has no assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any assignee (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any assignee. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one assignee`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some assignees (continuing the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-1`,
              `whiteBright-assignee on this issue`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this issue...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeTrue();
          });
        });

        describe(`when the issue has two assignees`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-1`,
                    }),
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some assignees (continuing the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-2`,
              `whiteBright-assignees on this issue`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this issue...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`shouldIncludeAnyMilestone$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyWithMilestones: false,
          })
        );
      });

      it(`should log about checking the issue-only-with-milestones input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyMilestone$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed when having at least one associated milestone...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyMilestone$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-with-milestones input is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithMilestones: false,
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-milestones`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-with-milestones input is enabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithMilestones: true,
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-milestones`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the issue has no milestone`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                milestone: undefined,
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any milestone (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any milestone. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one milestone`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                milestone: createHydratedMock<IGithubApiMilestone>({
                  id: `dummy-milestone`,
                }),
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding a milestone (continuing the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Found a milestone on this issue`);
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this issue...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`shouldIncludeAnyProject$$()`, (): void => {
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>();
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueIncludeProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueOnlyWithProjects: false,
          })
        );
      });

      it(`should log about checking the issue-only-with-projects input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyProject$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed when having at least one associated project...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyProject$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-with-projects input is disabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithProjects: false,
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyProject$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-projects`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyProject$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-with-projects input is enabled`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyWithProjects: true,
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyProject$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-with-projects`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the issue has no project`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any project (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one project`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some projects (continuing the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-1`,
              `whiteBright-project on this issue`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this issue...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(result).toBeTrue();
          });
        });

        describe(`when the issue has two projects`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectsV2: {
                  nodes: [
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project-1`,
                    }),
                    createHydratedMock<IGithubApiProject>({
                      title: `dummy-project-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some projects (continuing the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-2`,
              `whiteBright-projects on this issue`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this issue...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyProject$$();

            expect(result).toBeTrue();
          });
        });
      });
    });
  });
});
