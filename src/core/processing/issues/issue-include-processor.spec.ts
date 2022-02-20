import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueIncludeProcessor } from '@core/processing/issues/issue-include-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
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
      let shouldIncludeAnyWhiteListedProjectCardSpy: jest.SpyInstance;
      let shouldIncludeAnyWhiteListedMilestoneSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueIncludeProcessor = new IssueIncludeProcessor(issueProcessor);

        shouldIncludeAnyWhiteListedProjectCardSpy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyWhiteListedProjectCard$$`)
          .mockImplementation();
        shouldIncludeAnyWhiteListedMilestoneSpy = jest
          .spyOn(issueIncludeProcessor, `shouldIncludeAnyWhiteListedMilestone$$`)
          .mockImplementation();
      });

      it(`should check if the issue should be processed because she belongs to any of the white-listed project card`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldInclude();

        expect(shouldIncludeAnyWhiteListedProjectCardSpy).toHaveBeenCalledTimes(1);
        expect(shouldIncludeAnyWhiteListedProjectCardSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue belongs to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCardSpy.mockReturnValue(true);
        });

        it(`should check if the issue should be processed because she belongs to any of the white-listed milestone`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldInclude();

          expect(shouldIncludeAnyWhiteListedMilestoneSpy).toHaveBeenCalledTimes(1);
          expect(shouldIncludeAnyWhiteListedMilestoneSpy).toHaveBeenCalledWith();
        });

        describe(`when the issue belongs to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestoneSpy.mockReturnValue(true);
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldInclude();

            expect(result).toBeTrue();
          });
        });

        describe(`when the issue does not belong to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestoneSpy.mockReturnValue(false);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldInclude();

            expect(result).toBeFalse();
          });
        });
      });

      describe(`when the issue does not belong to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCardSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldInclude();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedProjectCard$$()`, (): void => {
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
            issueOnlyAnyProjectCards: [],
          })
        );
      });

      it(`should log about checking the issue-only-any-project-cards input`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this issue should only be processed based on any of the associated project cards...`
        );
      });

      it(`should get the issue inputs`, (): void => {
        expect.assertions(2);

        issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue-only-any-project-cards input is empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyProjectCards: [],
            })
          );
        });

        it(`should log about continuing the processing for this issue (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-project-cards`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the issue-only-any-project-cards input is not empty`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>({
              issueOnlyAnyProjectCards: [`dummy-card`],
            })
          );
        });

        it(`should log about checking if this issue should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-issue-only-any-project-cards`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the issue has no project card`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
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
                  issueOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          it(`should log about not containing any project card (skipping the processing)`, (): void => {
            expect.assertions(2);

            issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project card. Skipping the processing of this issue...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the issue has at least one project card`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project`,
                      },
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
                  issueOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          describe(`when none of the project cards match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjectCards: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the project cards match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  projectCards: {
                    nodes: [
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project`,
                        },
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
                    issueOnlyAnyProjectCards: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many labels on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-project cards attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many labels on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 76,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the project cards match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjectCards: [`dummy-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this issue`,
                `value-dummy-project`
              );
            });

            it(`should log about finding one project card in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project card`,
                `white-->`,
                `value-dummy-project`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeTrue();
            });
          });
        });

        describe(`when the issue has two project cards`, (): void => {
          beforeEach((): void => {
            issueProcessor = createHydratedMock<IssueProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project-1`,
                      },
                    }),
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project-2`,
                      },
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
                  issueOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          describe(`when none of the project cards match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjectCards: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the project cards match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              issueProcessor = createHydratedMock<IssueProcessor>({
                item: {
                  projectCards: {
                    nodes: [
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project-1`,
                        },
                      }),
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project-2`,
                        },
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
                    issueOnlyAnyProjectCards: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many labels on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(issueProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-project cards attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many labels on this issue since the pagination is not handled`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningIssue.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `issue-include-processor.ts`,
                  startLine: 76,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this issue...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the project cards match`, (): void => {
            beforeEach((): void => {
              issuesInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IIssuesInputs>({
                  issueOnlyAnyProjectCards: [`dummy-project-2`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this issue`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about finding one project card in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project card`,
                `white-->`,
                `value-dummy-project-2`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this issue...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = issueIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

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
  });
});
