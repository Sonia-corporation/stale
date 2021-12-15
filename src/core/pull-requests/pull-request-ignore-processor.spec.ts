import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestIgnoreProcessor } from '@core/pull-requests/pull-request-ignore-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
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

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
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
      let hasAnyIgnoredAsigneesSpy: jest.SpyInstance;
      let hasAllIgnoredLabelsSpy: jest.SpyInstance;
      let hasAllIgnoredAssigneesSpy: jest.SpyInstance;
      let hasAllIgnoredProjectCardsSpy: jest.SpyInstance;
      let hasIgnoredCreationDateSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        isLockedSpy = jest.spyOn(pullRequestIgnoreProcessor, `isLocked$$`).mockImplementation();
        hasAnyIgnoredLabelsSpy = jest.spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredLabels$$`).mockImplementation();
        hasAnyIgnoredAsigneesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAnyIgnoredAssignees$$`)
          .mockImplementation();
        hasAllIgnoredLabelsSpy = jest.spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredLabels$$`).mockImplementation();
        hasAllIgnoredAssigneesSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredAssignees$$`)
          .mockImplementation();
        hasAllIgnoredProjectCardsSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasAllIgnoredProjectCards$$`)
          .mockImplementation();
        hasIgnoredCreationDateSpy = jest
          .spyOn(pullRequestIgnoreProcessor, `hasIgnoredCreationDate$$`)
          .mockImplementation();
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

                it(`should check if the pull request has one of the ignored assignees`, (): void => {
                  expect.assertions(2);

                  pullRequestIgnoreProcessor.shouldIgnore();

                  expect(hasIgnoredCreationDateSpy).toHaveBeenCalledTimes(1);
                  expect(hasIgnoredCreationDateSpy).toHaveBeenCalledWith();
                });

                describe(`when the pull request does not have one of the ignored assignees`, (): void => {
                  beforeEach((): void => {
                    hasAnyIgnoredAsigneesSpy.mockReturnValue(false);
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

                    it(`should return false`, (): void => {
                      expect.assertions(1);

                      const result = pullRequestIgnoreProcessor.shouldIgnore();

                      expect(result).toBeFalse();
                    });
                  });
                });

                describe(`when the pull request has one of the ignored assignees`, (): void => {
                  beforeEach((): void => {
                    hasAnyIgnoredAsigneesSpy.mockReturnValue(true);
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

    describe(`isLocked$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerDebugSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            locked: false,
          },
        });
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerDebugSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `debug`)
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
            githubPullRequest: {
              locked: true,
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
            .mockImplementation();
          pullRequestProcessorLoggerDebugSpy = jest
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `debug`)
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
            githubPullRequest: {
              locked: false,
            },
          });
          pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
            .mockImplementation();
          pullRequestProcessorLoggerDebugSpy = jest
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `debug`)
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
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
              githubPullRequest: {
                assignees: {
                  totalCount: 0,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
              githubPullRequest: {
                assignees: {
                  totalCount: 1,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
      let pullRequestsInputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with a project card is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
          expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              githubPullRequest: {
                projectCards: {
                  totalCount: 0,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
              githubPullRequest: {
                projectCards: {
                  totalCount: 1,
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
      let pullRequestsInputsServiceGetInputs: jest.SpyInstance;
      let pullRequestProcessorGetCreatedAtSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the date is not valid`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
            pullRequestsInputsServiceGetInputs.mockReturnValue(
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
            pullRequestsInputsServiceGetInputs.mockReturnValue(
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
      let pullRequestsInputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the input to ignore pull request with a label is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
          pullRequestsInputsServiceGetInputs.mockReturnValue(
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
          expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
          expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
        });

        describe(`when the pull request has no label`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              githubPullRequest: {
                labels: {
                  nodes: [],
                },
              },
            });
            pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
      let pullRequestsInputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored labels`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            githubPullRequest: {
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
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
            githubPullRequest: {
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
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should log a warning about finding too much labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-labels attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });
        });

        describe.each([19, 20])(`when the pull request has less or just 20 labels`, (totalCount: number): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should not log a warning about finding too much labels on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredLabels$$();

            expect(pullRequestProcessorLoggerWarningSpy).not.toHaveBeenCalled();
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
      let pullRequestsInputsServiceGetInputs: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIgnoreProcessor = new PullRequestIgnoreProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputs = jest.spyOn(PullRequestsInputsService, `getInputs`).mockReturnValue(
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
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputs).toHaveBeenCalledWith();
      });

      describe(`when the pull request has one of the ignored assignees`, (): void => {
        beforeEach((): void => {
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            githubPullRequest: {
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
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
            githubPullRequest: {
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
            .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `info`)
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
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should log a warning about finding too much assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(2);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
              `Found`,
              `value-21`,
              `whiteBright-assignees attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
            );
          });
        });

        describe.each([19, 20])(`when the pull request has less or just 20 assignees`, (totalCount: number): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              githubPullRequest: {
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
              .spyOn(pullRequestIgnoreProcessor.pullRequestProcessor.logger, `warning`)
              .mockImplementation();
          });

          it(`should not log a warning about finding too much assignees on this pull request since the pagination is not handled`, (): void => {
            expect.assertions(1);

            pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

            expect(pullRequestProcessorLoggerWarningSpy).not.toHaveBeenCalled();
          });
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIgnoreProcessor.hasAnyIgnoredAssignees$$();

          expect(result).toBeFalse();
        });
      });
    });
  });
});
