import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestIgnoreProcessor } from '@core/processing/pull-requests/pull-request-ignore-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningPullRequest } from '@utils/annotations/enums/annotation-warning-pull-request.enum';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestIgnoreProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestIgnoreProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestIgnoreProcessor: PullRequestIgnoreProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldIgnore()`, (): void => {
      let isLockedSpy: jest.SpyInstance;
      let hasAnyIgnoredLabelsSpy: jest.SpyInstance;
      let hasAnyIgnoredMilestonesSpy: jest.SpyInstance;
      let hasAnyIgnoredAssigneesSpy: jest.SpyInstance;
      let hasAnyIgnoredProjectCardsSpy: jest.SpyInstance;
      let hasAllIgnoredLabelsSpy: jest.SpyInstance;
      let hasAllIgnoredAssigneesSpy: jest.SpyInstance;
      let hasAllIgnoredProjectCardsSpy: jest.SpyInstance;
      let hasAllIgnoredMilestonesSpy: jest.SpyInstance;
      let hasIgnoredCreationDateSpy: jest.SpyInstance;
      let isDraftSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        isLockedSpy = jest.spyOn(pullRequestIgnoreProcessor, `isLocked$$`).mockImplementation();
        hasAnyIgnoredLabelsSpy = jest.spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredLabels$$`).mockImplementation();
        hasAnyIgnoredMilestonesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredMilestones$$`)
          .mockImplementation();
        hasAnyIgnoredAssigneesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredAssignees$$`)
          .mockImplementation();
        hasAnyIgnoredProjectCardsSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredProjectCards$$`)
          .mockImplementation();
        hasAllIgnoredLabelsSpy = jest.spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredLabels$$`).mockImplementation();
        hasAllIgnoredAssigneesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredAssignees$$`)
          .mockImplementation();
        hasAllIgnoredProjectCardsSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredProjectCards$$`)
          .mockImplementation();
        hasAllIgnoredMilestonesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredMilestones$$`)
          .mockImplementation();
        hasIgnoredCreationDateSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasIgnoredCreationDate$$`)
          .mockImplementation();
        isDraftSpy = jest.spyOn(pullRequestIgnoreProcessor, `isDraft$$`).mockImplementation();
      });

      it(`should check if the pull request is locked`, (): void => {
        expect.assertions(2);

        pullRequestIgnoreProcessor.shouldIgnore();

        expect(isLockedSpy).toHaveBeenCalledTimes(1);
        expect(isLockedSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request is locked`, (): void => {
        beforeEach((): void => {
          isLockedSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.shouldIgnore();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request is not locked`, (): void => {
        beforeEach((): void => {
          isLockedSpy.mockReturnValue(false);
        });

        it(`should check if the pull request should ignore all labels`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.shouldIgnore();

          expect(hasAllIgnoredLabelsSpy).toHaveBeenCalledTimes(1);
          expect(hasAllIgnoredLabelsSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request should ignore all the labels`, (): void => {
          beforeEach((): void => {
            hasAllIgnoredLabelsSpy.mockReturnValue(true);
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIgnoreProcessor.shouldIgnore();

            expect(result).toBeTrue();
          });
        });

        describe(`when the pull request should not ignore all the labels`, (): void => {
          beforeEach((): void => {
            hasAllIgnoredLabelsSpy.mockReturnValue(false);
          });

          it(`should check if the pull request has one of the ignored labels`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.shouldIgnore();

            expect(hasAnyIgnoredLabelsSpy).toHaveBeenCalledTimes(1);
            expect(hasAnyIgnoredLabelsSpy).toHaveBeenCalledWith();
          });

          describe(`when the pull request has one of the ignored labels`, (): void => {
            beforeEach((): void => {
              hasAnyIgnoredLabelsSpy.mockReturnValue(true);
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIgnoreProcessor.shouldIgnore();

              expect(result).toBeTrue();
            });
          });

          describe(`when the pull request does not have one of the ignored labels`, (): void => {
            beforeEach((): void => {
              hasAnyIgnoredLabelsSpy.mockReturnValue(false);
            });

            it(`should check if the pull request should ignore all assignees`, (): void => {
              expect.assertions(2);

              pullRequestIgnoreProcessor.shouldIgnore();

              expect(hasAllIgnoredAssigneesSpy).toHaveBeenCalledTimes(1);
              expect(hasAllIgnoredAssigneesSpy).toHaveBeenCalledWith();
            });

            describe(`when the pull request should ignore all assignees`, (): void => {
              beforeEach((): void => {
                hasAllIgnoredAssigneesSpy.mockReturnValue(true);
              });

              it(`should return true`, (): void => {
                expect.assertions(1);

                const result = pullRequestIgnoreProcessor.shouldIgnore();

                expect(result).toBeTrue();
              });
            });

            describe(`when the pull request should not ignore all assignees`, (): void => {
              beforeEach((): void => {
                hasAllIgnoredAssigneesSpy.mockReturnValue(false);
              });

              it(`should check if the pull request should ignore any assignees`, (): void => {
                expect.assertions(2);

                pullRequestIgnoreProcessor.shouldIgnore();

                expect(hasAnyIgnoredAssigneesSpy).toHaveBeenCalledTimes(1);
                expect(hasAnyIgnoredAssigneesSpy).toHaveBeenCalledWith();
              });

              describe(`when the pull request should ignore any assignees`, (): void => {
                beforeEach((): void => {
                  hasAnyIgnoredAssigneesSpy.mockReturnValue(true);
                });

                it(`should return true`, (): void => {
                  expect.assertions(1);

                  const result = pullRequestIgnoreProcessor.shouldIgnore();

                  expect(result).toBeTrue();
                });
              });

              describe(`when the pull request should not ignore any assignees`, (): void => {
                beforeEach((): void => {
                  hasAnyIgnoredAssigneesSpy.mockReturnValue(false);
                });

                it(`should check if the pull request should ignore all project cards`, (): void => {
                  expect.assertions(2);

                  pullRequestIgnoreProcessor.shouldIgnore();

                  expect(hasAllIgnoredProjectCardsSpy).toHaveBeenCalledTimes(1);
                  expect(hasAllIgnoredProjectCardsSpy).toHaveBeenCalledWith();
                });

                describe(`when the pull request should ignore all project cards`, (): void => {
                  beforeEach((): void => {
                    hasAllIgnoredProjectCardsSpy.mockReturnValue(true);
                  });

                  it(`should return true`, (): void => {
                    expect.assertions(1);

                    const result = pullRequestIgnoreProcessor.shouldIgnore();

                    expect(result).toBeTrue();
                  });
                });

                describe(`when the pull request should not ignore all project cards`, (): void => {
                  beforeEach((): void => {
                    hasAllIgnoredProjectCardsSpy.mockReturnValue(false);
                  });

                  it(`should check if the pull request should ignore any project cards`, (): void => {
                    expect.assertions(2);

                    pullRequestIgnoreProcessor.shouldIgnore();

                    expect(hasAnyIgnoredProjectCardsSpy).toHaveBeenCalledTimes(1);
                    expect(hasAnyIgnoredProjectCardsSpy).toHaveBeenCalledWith();
                  });

                  describe(`when the pull request should ignore any project cards`, (): void => {
                    beforeEach((): void => {
                      hasAnyIgnoredProjectCardsSpy.mockReturnValue(true);
                    });

                    it(`should return true`, (): void => {
                      expect.assertions(1);

                      const result = pullRequestIgnoreProcessor.shouldIgnore();

                      expect(result).toBeTrue();
                    });
                  });

                  describe(`when the pull request should not ignore any project cards`, (): void => {
                    beforeEach((): void => {
                      hasAnyIgnoredProjectCardsSpy.mockReturnValue(false);
                    });

                    it(`should check if the pull request has one of the ignored milestones`, (): void => {
                      expect.assertions(2);

                      pullRequestIgnoreProcessor.shouldIgnore();

                      expect(hasAnyIgnoredMilestonesSpy).toHaveBeenCalledTimes(1);
                      expect(hasAnyIgnoredMilestonesSpy).toHaveBeenCalledWith();
                    });

                    describe(`when the pull request has one of the ignored milestones`, (): void => {
                      beforeEach((): void => {
                        hasAnyIgnoredMilestonesSpy.mockReturnValue(true);
                      });

                      it(`should return true`, (): void => {
                        expect.assertions(1);

                        const result = pullRequestIgnoreProcessor.shouldIgnore();

                        expect(result).toBeTrue();
                      });
                    });

                    describe(`when the pull request does not have one of the ignored milestones`, (): void => {
                      beforeEach((): void => {
                        hasAnyIgnoredMilestonesSpy.mockReturnValue(false);
                      });

                      it(`should check if the pull request should ignore all milestones`, (): void => {
                        expect.assertions(2);

                        pullRequestIgnoreProcessor.shouldIgnore();

                        expect(hasAllIgnoredMilestonesSpy).toHaveBeenCalledTimes(1);
                        expect(hasAllIgnoredMilestonesSpy).toHaveBeenCalledWith();
                      });

                      describe(`when the pull request should ignore all milestones`, (): void => {
                        beforeEach((): void => {
                          hasAllIgnoredMilestonesSpy.mockReturnValue(true);
                        });

                        it(`should return true`, (): void => {
                          expect.assertions(1);

                          const result = pullRequestIgnoreProcessor.shouldIgnore();

                          expect(result).toBeTrue();
                        });
                      });

                      describe(`when the pull request should not ignore all milestones`, (): void => {
                        beforeEach((): void => {
                          hasAllIgnoredMilestonesSpy.mockReturnValue(false);
                        });

                        it(`should check if the pull request should ignore based on the creation date`, (): void => {
                          expect.assertions(2);

                          pullRequestIgnoreProcessor.shouldIgnore();

                          expect(hasIgnoredCreationDateSpy).toHaveBeenCalledTimes(1);
                          expect(hasIgnoredCreationDateSpy).toHaveBeenCalledWith();
                        });

                        describe(`when the pull request should ignore based on the creation date`, (): void => {
                          beforeEach((): void => {
                            hasIgnoredCreationDateSpy.mockReturnValue(true);
                          });

                          it(`should return true`, (): void => {
                            expect.assertions(1);

                            const result = pullRequestIgnoreProcessor.shouldIgnore();

                            expect(result).toBeTrue();
                          });
                        });

                        describe(`when the pull request should not ignore based on the creation date`, (): void => {
                          beforeEach((): void => {
                            hasIgnoredCreationDateSpy.mockReturnValue(false);
                          });

                          it(`should check if the pull request is a draft`, (): void => {
                            expect.assertions(2);

                            pullRequestIgnoreProcessor.shouldIgnore();

                            expect(isDraftSpy).toHaveBeenCalledTimes(1);
                            expect(isDraftSpy).toHaveBeenCalledWith();
                          });

                          describe(`when the pull request is not a draft`, (): void => {
                            beforeEach((): void => {
                              isDraftSpy.mockReturnValue(false);
                            });

                            it(`should return false`, (): void => {
                              expect.assertions(1);

                              const result = pullRequestIgnoreProcessor.shouldIgnore();

                              expect(result).toBeFalse();
                            });
                          });

                          describe(`when the pull request is a draft`, (): void => {
                            beforeEach((): void => {
                              isDraftSpy.mockReturnValue(true);
                            });

                            it(`should return true`, (): void => {
                              expect.assertions(1);

                              const result = pullRequestIgnoreProcessor.shouldIgnore();

                              expect(result).toBeTrue();
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
      });
    });

    describe(`isLocked$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          item: {
            locked: false,
          },
        });
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerDebugSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `debug`)
          .mockImplementation();
      });

      it(`should log about checking the locked state`, (): void => {
        expect.assertions(2);

        pullRequestIgnoreProcessor.isLocked$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request is locked...`
        );
      });

      describe(`when the pull request is locked`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            item: {
              locked: true,
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
          pullRequestProcessorLoggerDebugSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `debug`)
            .mockImplementation();
        });

        it(`should log about the locked pull request`, (): void => {
          expect.assertions(4);

          pullRequestIgnoreProcessor.isLocked$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `Locked`);
          expect(pullRequestProcessorLoggerDebugSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerDebugSpy).toHaveBeenCalledWith(
            `We do not process locked pull requests; it is in the name: locked`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.isLocked$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request is not locked`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            item: {
              locked: false,
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
          pullRequestProcessorLoggerDebugSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `debug`)
            .mockImplementation();
        });

        it(`should log about being not locked`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.isLocked$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `Not locked. Continuing...`);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.isLocked$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAllIgnoredAssignees$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllAssignees: false,
            })
          );
      });

      it(`should log about checking if the pull request should ignore all the assignees`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAllIgnoredAssignees$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the assignees on this pull request should be ignored...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with an assignee is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllAssignees: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.hasAllIgnoredAssignees$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-assignees`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore pull request with an assignee is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllAssignees: true,
            })
          );
        });

        it(`should check if the pull request has at least one assignee`, (): void => {
          expect.assertions(4);

          pullRequestIgnoreProcessor.hasAllIgnoredAssignees$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-assignees`,
            `whiteBright-is enabled. Checking...`
          );
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  totalCount: 0,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has no assignee. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has one assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  totalCount: 1,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllAssignees: true,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has`,
              `value-1`,
              `whiteBright-assignee`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasAllIgnoredProjectCards$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllProjectCards: false,
            })
          );
      });

      it(`should log about checking if the pull request should ignore all the project cards`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAllIgnoredProjectCards$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the project cards on this pull request should be ignored...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with a project card is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllProjectCards: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.hasAllIgnoredProjectCards$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-project-cards`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore pull request with a project card is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllProjectCards: true,
            })
          );
        });

        it(`should check if the pull request has at least one project card`, (): void => {
          expect.assertions(4);

          pullRequestIgnoreProcessor.hasAllIgnoredProjectCards$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-project-cards`,
            `whiteBright-is enabled. Checking...`
          );
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  totalCount: 0,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredProjectCards$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has no project card. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has one project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  totalCount: 1,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllProjectCards: true,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredProjectCards$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has`,
              `value-1`,
              `whiteBright-project card`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasIgnoredCreationDate$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorGetCreatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreBeforeCreationDate: ``,
            })
          );
        pullRequestProcessorGetCreatedAtSpy = jest
          .spyOn(pullRequestProcessor, `getCreatedAt`)
          .mockReturnValue(DateTime.utc(2020));
      });

      it(`should try to get the pull request ignore before creation date input and parse it`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasIgnoredCreationDate$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should be ignored based on its creation date...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the date is not valid`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreBeforeCreationDate: `dummy`,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.hasIgnoredCreationDate$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-before-creation-date`,
            `whiteBright-is either unset or not convertible to a valid ISO 8601 date. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the date is valid`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                includeOffset: false,
              }),
            })
          );
        });

        it(`should get the creation date of the pull request`, (): void => {
          expect.assertions(5);

          pullRequestIgnoreProcessor.hasIgnoredCreationDate$$();

          expect(pullRequestProcessorGetCreatedAtSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorGetCreatedAtSpy).toHaveBeenCalledWith();
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request was created the`,
            `date-01/01/2020, 00:00:00`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The minimal processing creation date is set to the`,
            `date-01/01/2020, 00:00:00`
          );
        });

        describe(`when the creation date of the pull request is more recent that the creation date input`, (): void => {
          beforeEach((): void => {
            pullRequestProcessorGetCreatedAtSpy.mockReturnValue(DateTime.now());
            pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IPullRequestsInputs>({
                pullRequestIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                  includeOffset: false,
                }),
              })
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasIgnoredCreationDate$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was created after the minimal processing creation date. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the creation date of the pull request is older that the creation date input`, (): void => {
          beforeEach((): void => {
            pullRequestProcessorGetCreatedAtSpy.mockReturnValue(DateTime.utc(2019));
            pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
              createHydratedMock<IPullRequestsInputs>({
                pullRequestIgnoreBeforeCreationDate: DateTime.utc(2020).toISO({
                  includeOffset: false,
                }),
              })
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasIgnoredCreationDate$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was created before the minimal processing creation date`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasAllIgnoredLabels$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllLabels: false,
            })
          );
      });

      it(`should log about checking if the pull request should ignore all the labels`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the labels on this pull request should be ignored...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with a label is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllLabels: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-labels`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore pull request with a label is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllLabels: true,
            })
          );
        });

        it(`should check if the pull request has at least one label (except the stale one)`, (): void => {
          expect.assertions(4);

          pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-labels`,
            `whiteBright-is enabled. Checking...`
          );
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no label`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                labels: {
                  nodes: [],
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has no label. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has one label which is the stale one`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllLabels: true,
                  pullRequestStaleLabel: `stale`,
                })
              );
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has no label. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has one label which is not the stale one`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllLabels: true,
                  pullRequestStaleLabel: `stale`,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has`,
              `value-1`,
              `whiteBright-label`
            );
            expect(result).toBeTrue();
          });
        });

        describe(`when the pull request has three labels which are not the stale one`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllLabels: true,
                  pullRequestStaleLabel: `stale`,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredLabels$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has`,
              `value-3`,
              `whiteBright-labels`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasAnyIgnoredLabels$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAnyLabels: [`ignored-label`],
            })
          );
      });

      it(`should log about checking if the pull request has one of the ignored labels`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request has one of the ignored labels...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored labels`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about the ignored label`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored labels`,
            `white-->`,
            `value-ignored-label`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not have one of the ignored labels`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored label`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored label. Continuing...`
          );
        });

        describe(`when the pull request has more than 20 labels`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerWarningSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-labels attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningPullRequest.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `pull-request-ignore-processor.ts`,
                startLine: 218,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(`when the pull request has less or just 20 labels`, (totalCount: number): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerWarningSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should not log a warning about finding too many labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(pullRequestProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });

          it(`should not annotate about finding too many labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAnyIgnoredAssignees$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAnyAssignees: [`ignored-assignee`],
            })
          );
      });

      it(`should log about checking if the pull request has one of the ignored assignees`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request has one of the ignored assignees...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored assignees`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about the ignored assignee`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored assignees`,
            `white-->`,
            `value-ignored-assignee`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not have one of the ignored assignees`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored assignee`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored assignee. Continuing...`
          );
        });

        describe(`when the pull request has more than 20 assignees`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerWarningSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-assignees attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningPullRequest.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `pull-request-ignore-processor.ts`,
                startLine: 265,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(`when the pull request has less or just 20 assignees`, (totalCount: number): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerWarningSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should not log a warning about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });

          it(`should not annotate about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAnyIgnoredProjectCards$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAnyProjectCards: [`ignored-project-card`],
            })
          );
      });

      it(`should log about checking if the pull request has one of the ignored project cards`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request has one of the ignored project cards...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored project cards`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about the ignored project card`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored project cards`,
            `white-->`,
            `value-ignored-project-card`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not have one of the ignored project cards`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored project card`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored project card. Continuing...`
          );
        });

        describe(`when the pull request has more than 20 project cards`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerWarningSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
              .mockImplementation();
            annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
          });

          it(`should log a warning about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-project cards attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });

          it(`should annotate about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

            expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
              EAnnotationWarningPullRequest.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `pull-request-ignore-processor.ts`,
                startLine: 312,
                title: `Warning`,
              }
            );
          });
        });

        describe.each([19, 20])(
          `when the pull request has less or just 20 project cards`,
          (totalCount: number): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
              pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIgnoreProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
            });

            it(`should not log a warning about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(1);

              pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

              expect(pullRequestProcessorLoggerWarningSpy).not.toHaveBeenCalled();
            });

            it(`should not annotate about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(1);

              pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

              expect(annotationsServiceWarningSpy).not.toHaveBeenCalled();
            });
          }
        );

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredProjectCards$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`isDraft$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreDraft: false,
            })
          );
      });

      it(`should log about checking the draft ignore state`, (): void => {
        expect.assertions(2);

        pullRequestIgnoreProcessor.isDraft$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request is a draft...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIgnoreProcessor.isDraft$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore draft pull request is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreDraft: false,
            })
          );
        });

        it(`should log about it and return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.isDraft$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-draft`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore draft pull request is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreDraft: true,
            })
          );
        });

        it(`should log about having the ignore draft pull request input enabled`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.isDraft$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-draft`,
            `whiteBright-is enabled. Checking...`
          );
          expect(result).toBeFalse();
        });

        describe(`when the pull request is not a draft`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                isDraft: false,
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreDraft: true,
                })
              );
          });

          it(`should log about it and return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.isDraft$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `Not a draft. Continuing...`);
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request is a draft`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                isDraft: true,
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreDraft: true,
                })
              );
          });

          it(`should log about it and return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.isDraft$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The pull request is a draft`);
            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`hasAnyIgnoredMilestones$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAnyMilestones: [`ignored-milestone`],
            })
          );
      });

      it(`should log about checking if the pull request has one of the ignored milestones`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request has one of the ignored milestones...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored milestones`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            item: {
              milestone: createHydratedMock<IGithubApiMilestone>({
                title: `ignored-milestone`,
              }),
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about the ignored milestone`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Containing one of the ignored milestones`,
            `white-->`,
            `value-ignored-milestone`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not have one of the ignored milestones`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            item: {
              milestone: createHydratedMock<IGithubApiMilestone>({
                title: `not-ignored-milestone`,
              }),
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored milestone`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored milestone. Continuing...`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeFalse();
        });
      });

      describe(`when the pull request does not have a milestone`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            item: {
              milestone: undefined,
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
            .mockImplementation();
        });

        it(`should log about not containing an ignored milestone`, (): void => {
          expect.assertions(2);

          pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `Not containing an ignored milestone. Continuing...`
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredMilestones$$();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`hasAllIgnoredMilestones$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllMilestones: false,
            })
          );
      });

      it(`should log about checking if the pull request should ignore all the milestones`, (): void => {
        expect.assertions(4);

        pullRequestIgnoreProcessor.hasAllIgnoredMilestones$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if all the milestones on this pull request should be ignored...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with a milestone is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllMilestones: false,
            })
          );
        });

        it(`should return false`, (): void => {
          expect.assertions(3);

          const result = pullRequestIgnoreProcessor.hasAllIgnoredMilestones$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-milestones`,
            `whiteBright-is disabled. Continuing...`
          );
          expect(result).toBeFalse();
        });
      });

      describe(`when the input to ignore pull request with a milestone is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestIgnoreAllMilestones: true,
            })
          );
        });

        it(`should check if the pull request has a milestone`, (): void => {
          expect.assertions(4);

          pullRequestIgnoreProcessor.hasAllIgnoredMilestones$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-ignore-all-milestones`,
            `whiteBright-is enabled. Checking...`
          );
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: undefined,
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredMilestones$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has no milestone. Continuing...`
            );
            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has a milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: createHydratedMock<IGithubApiMilestone>({
                  title: `dummy-milestone`,
                }),
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestIgnoreAllMilestones: true,
                })
              );
          });

          it(`should return true`, (): void => {
            expect.assertions(3);

            const result = pullRequestIgnoreProcessor.hasAllIgnoredMilestones$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request has a milestone`,
              `white-->`,
              `value-dummy-milestone`
            );
            expect(result).toBeTrue();
          });
        });
      });
    });
  });
});
