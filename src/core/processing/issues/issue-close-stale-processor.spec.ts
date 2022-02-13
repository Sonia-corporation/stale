import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueCloseStaleProcessor } from '@core/processing/issues/issue-close-stale-processor';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueCloseStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiIssuesService`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.githubApiIssuesService$$).toBeInstanceOf(GithubApiIssuesService);
    });

    it(`should create the IssueCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.issueCommentsProcessor$$).toBeInstanceOf(IssueCommentsProcessor);
    });

    it(`should create the GithubApiIssueLabelsService`, (): void => {
      expect.assertions(1);

      const result = new IssueCloseStaleProcessor(issueProcessor);

      expect(result.githubApiIssueLabelsService$$).toBeInstanceOf(GithubApiIssueLabelsService);
    });
  });

  describe(`after creation`, (): void => {
    let issueCloseStaleProcessor: IssueCloseStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`close()`, (): void => {
      let issueId: IUuid;

      let githubApiIssuesServiceCloseIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let issueCommentsProcessorProcessCloseCommentSpy: jest.SpyInstance;
      let processToAddExtraLabelsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueCloseStaleProcessor = new IssueCloseStaleProcessor(issueProcessor);

        githubApiIssuesServiceCloseIssueSpy = jest
          .spyOn(issueCloseStaleProcessor.githubApiIssuesService$$, `closeIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueCloseStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: true,
          })
        );
        issueCommentsProcessorProcessCloseCommentSpy = jest
          .spyOn(issueCloseStaleProcessor.issueCommentsProcessor$$, `processCloseComment`)
          .mockImplementation();
        processToAddExtraLabelsSpy = jest
          .spyOn(issueCloseStaleProcessor, `processToAddExtraLabels$$`)
          .mockImplementation();
      });

      it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
        expect.assertions(4);

        await issueCloseStaleProcessor.close();

        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Closing this issue...`);
      });

      describe(`when the dry-run mode is disabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: false,
            })
          );
        });

        it(`should close the issue`, async (): Promise<void> => {
          expect.assertions(5);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledTimes(1);
          expect(githubApiIssuesServiceCloseIssueSpy).toHaveBeenCalledWith(issueId);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `The issue was closed`);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The issue is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });

        it(`should try to add some extra labels`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
        });
      });

      describe(`when the dry-run mode is enabled`, (): void => {
        beforeEach((): void => {
          commonInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<ICommonInputs>({
              dryRun: true,
            })
          );
        });

        it(`should not close the issue`, async (): Promise<void> => {
          expect.assertions(4);

          await issueCloseStaleProcessor.close();

          expect(githubApiIssuesServiceCloseIssueSpy).not.toHaveBeenCalled();
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was not closed due to the dry-run mode`
          );
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The issue is now closed`);
        });

        it(`should try to add a close comment`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledTimes(1);
          expect(issueCommentsProcessorProcessCloseCommentSpy).toHaveBeenCalledWith();
        });

        it(`should try to add some extra labels`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.close();

          expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
          expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
        });
      });
    });

    describe(`processToAddExtraLabels$$()`, (): void => {
      let issueId: IUuid;

      let processorLoggerInfoSpy: jest.SpyInstance;
      let processorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiIssueLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let githubApiIssueLabelsServiceAddLabelsSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueCloseStaleProcessor = new IssueCloseStaleProcessor(issueProcessor);

        processorLoggerInfoSpy = jest.spyOn(issueCloseStaleProcessor.processor.logger, `info`).mockImplementation();
        processorLoggerErrorSpy = jest.spyOn(issueCloseStaleProcessor.processor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
            issueAddLabelsAfterStale: [],
          })
        );
        commonInputsServiceGetInputsSpy = jest
          .spyOn(CommonInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<ICommonInputs>());
        githubApiIssueLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(issueCloseStaleProcessor.githubApiIssueLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(null);
        githubApiIssueLabelsServiceAddLabelsSpy = jest
          .spyOn(issueCloseStaleProcessor.githubApiIssueLabelsService$$, `addLabels`)
          .mockImplementation();
        issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseAddedIssuesLabelsCount`)
          .mockImplementation();
      });

      it(`should log about the processing of adding extra labels`, async (): Promise<void> => {
        expect.assertions(2);

        await issueCloseStaleProcessor.processToAddExtraLabels$$();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if more labels should be added...`);
      });

      it(`should get the extra labels to add from the input`, async (): Promise<void> => {
        expect.assertions(2);

        await issueCloseStaleProcessor.processToAddExtraLabels$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when there is no extra labels to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterClose: [],
            })
          );
        });

        it(`should log and stop the processing`, async (): Promise<void> => {
          expect.assertions(2);

          await issueCloseStaleProcessor.processToAddExtraLabels$$();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `No extra label to add. Continuing...`);
        });

        it(`should not add the extra label on the issue`, async (): Promise<void> => {
          expect.assertions(1);

          await issueCloseStaleProcessor.processToAddExtraLabels$$();

          expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
        });

        it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
          expect.assertions(1);

          await issueCloseStaleProcessor.processToAddExtraLabels$$();

          expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when there is one extra label to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterClose: [`extra-label`],
            })
          );
        });

        it(`should log the extra label name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-1`, `whiteBright-label should be added`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra label`,
            `value-extra-label`,
            `whiteBright-to add on this issue...`
          );
        });

        it(`should fetch the label`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label`)
          );

          expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
          expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(`extra-label`);
        });

        describe(`when the label could not be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiIssueLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
          });

          it(`should log about the missing label error and throw an error`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerErrorSpy).toHaveBeenCalledWith(`Could not find the label`, `value-extra-label`);
          });

          it(`should annotate about the missing label error and throw an error`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationError.NOT_FOUND_LABEL, {
              file: `abstract-extra-labels-processor.ts`,
              startLine: 72,
              title: `Error`,
            });
          });

          it(`should not add the extra label on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the label could be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiIssueLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
              createHydratedMock<IGithubApiLabel>({
                id: `dummy-extra-label-id`,
              })
            );
          });

          it(`should log about finding successfully the label`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCloseStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The label`,
              `value-extra-label`,
              `whiteBright-was fetched`
            );
          });

          it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCloseStaleProcessor.processToAddExtraLabels$$();

            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
          });

          describe(`when the dry-run mode is enabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: true,
                })
              );
            });

            it(`should log about doing nothing due to the dry-run mode`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `The extra label was not added due to the dry-run mode`
              );
            });

            it(`should not add the extra label on the issue`, async (): Promise<void> => {
              expect.assertions(1);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledWith(1);
            });
          });

          describe(`when the dry-run mode is disabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: false,
                })
              );
            });

            it(`should add the extra label on the issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(issueId, [`dummy-extra-label-id`]);
            });

            it(`should increase the number of added labels count statistic by 1`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledWith(1);
            });

            it(`should log about successfully adding the extra label on this issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `value-1`, `whiteBright-extra label added`);
            });
          });
        });
      });

      describe(`when there is two extra labels to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterClose: [`extra-label-1`, `extra-label-2`],
            })
          );
        });

        it(`should log the extra labels name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label-1`)
          );

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `value-2`, `whiteBright-labels should be added`);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `Fetching the extra labels`,
            `value-extra-label-1, extra-label-2`,
            `whiteBright-to add on this issue...`
          );
        });

        it(`should fetch the labels`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
            new Error(`Could not find the label extra-label-1`)
          );

          expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(2);
          expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenNthCalledWith(1, `extra-label-1`);
          expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenNthCalledWith(2, `extra-label-2`);
        });

        describe(`when the labels could not be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiIssueLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
          });

          it(`should log about the missing label errors and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(processorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find the label`,
              `value-extra-label-1`
            );
            expect(processorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Could not find the label`,
              `value-extra-label-2`
            );
          });

          it(`should annotate about the missing label errors and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(1, EAnnotationError.NOT_FOUND_LABEL, {
              file: `abstract-extra-labels-processor.ts`,
              startLine: 72,
              title: `Error`,
            });
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(2, EAnnotationError.NOT_FOUND_LABEL, {
              file: `abstract-extra-labels-processor.ts`,
              startLine: 72,
              title: `Error`,
            });
          });

          it(`should not add the extra labels on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
          });

          it(`should not increase the number of added labels count statistic`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueCloseStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the labels could be found in the repository`, (): void => {
          beforeEach((): void => {
            githubApiIssueLabelsServiceFetchLabelByNameSpy
              .mockResolvedValueOnce(
                createHydratedMock<IGithubApiLabel>({
                  id: `dummy-extra-label-id-1`,
                })
              )
              .mockResolvedValueOnce(
                createHydratedMock<IGithubApiLabel>({
                  id: `dummy-extra-label-id-2`,
                })
              );
          });

          it(`should log about finding successfully the labels`, async (): Promise<void> => {
            expect.assertions(3);

            await issueCloseStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The label`,
              `value-extra-label-1`,
              `whiteBright-was fetched`
            );
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The label`,
              `value-extra-label-2`,
              `whiteBright-was fetched`
            );
          });

          it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
            expect.assertions(2);

            await issueCloseStaleProcessor.processToAddExtraLabels$$();

            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
            expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
          });

          describe(`when the dry-run mode is enabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: true,
                })
              );
            });

            it(`should log about doing nothing due to the dry-run mode`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                6,
                `The extra labels were not added due to the dry-run mode`
              );
            });

            it(`should not add the extra labels on the issue`, async (): Promise<void> => {
              expect.assertions(1);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledWith(2);
            });
          });

          describe(`when the dry-run mode is disabled`, (): void => {
            beforeEach((): void => {
              commonInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<ICommonInputs>(<Partial<ICommonInputs>>{
                  dryRun: false,
                })
              );
            });

            it(`should add the extra labels on the issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(issueId, [
                `dummy-extra-label-id-1`,
                `dummy-extra-label-id-2`,
              ]);
            });

            it(`should increase the number of added labels count statistic by 2`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledTimes(1);
              expect(issuesStatisticsServiceIncreaseAddedIssuesLabelsCountSpy).toHaveBeenCalledWith(2);
            });

            it(`should log about successfully adding the extra labels on this issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueCloseStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `value-2`, `whiteBright-extra labels added`);
            });
          });
        });
      });
    });
  });
});
