import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestIncludeProcessor } from '@core/processing/pull-requests/pull-request-include-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiProjectCard } from '@github/api/labels/interfaces/github-api-project-card.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningPullRequest } from '@utils/annotations/enums/annotation-warning-pull-request.enum';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestIncludeProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestIncludeProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestIncludeProcessor: PullRequestIncludeProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldInclude()`, (): void => {
      let shouldIncludeAnyWhiteListedProjectCardSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        shouldIncludeAnyWhiteListedProjectCardSpy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyWhiteListedProjectCard$$`)
          .mockImplementation();
      });

      it(`should check if the pull request should be processed because she belongs to any of the white-listed project card`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldInclude();

        expect(shouldIncludeAnyWhiteListedProjectCardSpy).toHaveBeenCalledTimes(1);
        expect(shouldIncludeAnyWhiteListedProjectCardSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request belongs to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCardSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldInclude();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull request does not belong to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCardSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldInclude();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedProjectCard$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [],
            })
          );
      });

      it(`should log about checking the pull-request-only-any-project-cards input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed based on any of the associated project cards...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request-only-any-project-cards input is empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [],
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-project-cards`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-any-project-cards input is not empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [`dummy-card`],
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-project-cards`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the pull request has no project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          it(`should log about not containing any project card (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project card. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          describe(`when none of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                })
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the project cards match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
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
              pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerInfoSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              pullRequestsInputsServiceGetInputsSpy = jest
                .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IPullRequestsInputs>({
                    pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many labels on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-project cards attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many labels on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningPullRequest.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `pull-request-include-processor.ts`,
                  startLine: 76,
                  title: `Warning`,
                }
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-project`],
                })
              );
            });

            it(`should log about finding one project card in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Containing one of the required project card`,
                `white-->`,
                `value-dummy-project`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });
  });
});
