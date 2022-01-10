import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueCommentsProcessor } from '@core/processing/issues/issue-comments-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssueStaleProcessor } from '@core/processing/issues/issue-stale-processor';
import { GithubApiIssueLabelsService } from '@github/api/labels/github-api-issue-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { MOCK_DATE_FORMAT } from '@utils/loggers/mock-date-format';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueStaleProcessor(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiIssueLabelsService`, (): void => {
      expect.assertions(1);

      const result = new IssueStaleProcessor(issueProcessor);

      expect(result.githubApiIssueLabelsService$$).toBeInstanceOf(GithubApiIssueLabelsService);
    });

    it(`should create the IssueCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new IssueStaleProcessor(issueProcessor);

      expect(result.issueCommentsProcessor$$).toBeInstanceOf(IssueCommentsProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueStaleProcessor: IssueStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldStale()`, (): void => {
      let isStaleByUpdateDateSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

        isStaleByUpdateDateSpy = jest.spyOn(issueStaleProcessor, `isStaleByUpdateDate$$`).mockImplementation();
        issueProcessorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
      });

      it(`should check if the issue is stale based on the update date`, (): void => {
        expect.assertions(4);

        issueStaleProcessor.shouldStale();

        expect(isStaleByUpdateDateSpy).toHaveBeenCalledTimes(1);
        expect(isStaleByUpdateDateSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(`Checking if the issue should be stale...`);
      });

      describe(`when the issue should not be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = issueStaleProcessor.shouldStale();

          expect(result).toBeFalse();
        });
      });

      describe(`when the issue should be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = issueStaleProcessor.shouldStale();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`stale()`, (): void => {
      let issueStaleLabel: string;
      let staleLabelId: IUuid;
      let issueId: IUuid;

      let githubApiIssueLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiIssueLabelsServiceAddLabelSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let issueCommentsProcessorProcessStaleCommentSpy: jest.SpyInstance;
      let processToAddExtraLabelsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

        githubApiIssueLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(issueStaleProcessor.githubApiIssueLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueStaleLabel,
          })
        );
        githubApiIssueLabelsServiceAddLabelSpy = jest
          .spyOn(issueStaleProcessor.githubApiIssueLabelsService$$, `addLabel`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
        issueProcessorLoggerNoticeSpy = jest.spyOn(issueStaleProcessor.processor.logger, `notice`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueStaleProcessor.processor.logger, `error`).mockImplementation();
        issueCommentsProcessorProcessStaleCommentSpy = jest
          .spyOn(issueStaleProcessor.issueCommentsProcessor$$, `processStaleComment`)
          .mockImplementation();
        processToAddExtraLabelsSpy = jest.spyOn(issueStaleProcessor, `processToAddExtraLabels$$`).mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(11);

        await issueStaleProcessor.stale();

        expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiIssueLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(issueStaleLabel);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Adding the stale state to this issue...`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${issueStaleLabel}`,
          `whiteBright-to add on this issue...`
        );
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Adding the stale label to this issue...`);
      });

      describe(`when the label could not be found`, (): void => {
        beforeEach((): void => {
          githubApiIssueLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log and throw an error`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${issueStaleLabel}`
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${issueStaleLabel}`
          );
          expect(issueCommentsProcessorProcessStaleCommentSpy).not.toHaveBeenCalled();
        });

        it(`should not try to add a stale comment on the issue`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(issueStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${issueStaleLabel}`
          );

          expect(issueCommentsProcessorProcessStaleCommentSpy).not.toHaveBeenCalled();
        });

        it(`should not try to add extra labels`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(issueStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${issueStaleLabel}`
          );

          expect(processToAddExtraLabelsSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiIssueLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: false,
                })
              );
          });

          it(`should add the stale label on the issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueStaleProcessor.stale();

            expect(githubApiIssueLabelsServiceAddLabelSpy).toHaveBeenCalledTimes(1);
            expect(githubApiIssueLabelsServiceAddLabelSpy).toHaveBeenCalledWith(issueId, staleLabelId);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was added`);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now stale`);
          });

          it(`should try to add a stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await issueStaleProcessor.stale();

            expect(issueCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(issueCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
          });

          it(`should try to add extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await issueStaleProcessor.stale();

            expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: true,
                })
              );
          });

          it(`should not add the stale label on the issue`, async (): Promise<void> => {
            expect.assertions(5);

            await issueStaleProcessor.stale();

            expect(githubApiIssueLabelsServiceAddLabelSpy).not.toHaveBeenCalled();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not added due to the dry-run mode`
            );
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now stale`);
          });

          it(`should try to add a stale comment on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await issueStaleProcessor.stale();

            expect(issueCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(issueCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
          });

          it(`should try to add extra labels`, async (): Promise<void> => {
            expect.assertions(2);

            await issueStaleProcessor.stale();

            expect(processToAddExtraLabelsSpy).toHaveBeenCalledTimes(1);
            expect(processToAddExtraLabelsSpy).toHaveBeenCalledWith();
          });
        });
      });
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      let issueProcessorGetUpdatedAtMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>({
            issueDaysBeforeStale: 30,
          })
        );
      });

      it(`should get the number of days before the issue should be stale`, (): void => {
        expect.assertions(4);

        issueStaleProcessor.isStaleByUpdateDate$$();

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the issue should be stale based on the update date...`
        );
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the issue last updated is older than the number of days before the issue should be stale`, (): void => {
        beforeEach((): void => {
          issueProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
            (): DateTime =>
              DateTime.now().minus({
                day: 31,
              })
          );
          issueProcessor = createHydratedMock<IssueProcessor>({
            getUpdatedAt: issueProcessorGetUpdatedAtMock,
          });
          issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

          issueProcessorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
        });

        it(`should return true`, (): void => {
          expect.assertions(4);

          const result = issueStaleProcessor.isStaleByUpdateDate$$();

          expect(result).toBeTrue();
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was updated for the last time the`,
            `date-${issueProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
          );
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The issue should be stale since it was not updated in the last`,
            `value-30`,
            `whiteBright-days`
          );
        });
      });

      describe.each([30, 29, 0])(
        `when the issue last updated is younger than the number of days before the issue should be stale`,
        (day): void => {
          beforeEach((): void => {
            issueProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
              (): DateTime =>
                DateTime.now().minus({
                  day,
                })
            );
            issueProcessor = createHydratedMock<IssueProcessor>({
              getUpdatedAt: issueProcessorGetUpdatedAtMock,
            });
            issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

            issueProcessorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(4);

            const result = issueStaleProcessor.isStaleByUpdateDate$$();

            expect(result).toBeFalse();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The issue was updated for the last time the`,
              `date-${issueProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The issue should not be stale since it was updated in the last`,
              `value-30`,
              `whiteBright-days`
            );
          });
        }
      );
    });

    describe(`processToAddExtraLabels$$()`, (): void => {
      let issueId: IUuid;

      let processorLoggerInfoSpy: jest.SpyInstance;
      let processorLoggerErrorSpy: jest.SpyInstance;
      let processorLoggerNoticeSpy: jest.SpyInstance;
      let issuesInputsServiceGetInputsSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiIssueLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let githubApiIssueLabelsServiceAddLabelsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          item: {
            id: issueId,
          },
        });
        issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

        processorLoggerInfoSpy = jest.spyOn(issueStaleProcessor.processor.logger, `info`).mockImplementation();
        processorLoggerErrorSpy = jest.spyOn(issueStaleProcessor.processor.logger, `error`).mockImplementation();
        processorLoggerNoticeSpy = jest.spyOn(issueStaleProcessor.processor.logger, `notice`).mockImplementation();
        issuesInputsServiceGetInputsSpy = jest.spyOn(IssuesInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
            issueAddLabelsAfterStale: [],
          })
        );
        commonInputsServiceGetInputsSpy = jest
          .spyOn(CommonInputsService.getInstance(), `getInputs`)
          .mockReturnValue(createHydratedMock<ICommonInputs>());
        githubApiIssueLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(issueStaleProcessor.githubApiIssueLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(null);
        githubApiIssueLabelsServiceAddLabelsSpy = jest
          .spyOn(issueStaleProcessor.githubApiIssueLabelsService$$, `addLabels`)
          .mockImplementation();
      });

      it(`should log about the processing of adding extra labels`, async (): Promise<void> => {
        expect.assertions(2);

        await issueStaleProcessor.processToAddExtraLabels$$();

        expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Checking if more labels should be added...`);
      });

      it(`should get the extra labels to add from the input`, async (): Promise<void> => {
        expect.assertions(2);

        await issueStaleProcessor.processToAddExtraLabels$$();

        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(issuesInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when there is no extra labels to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterStale: [],
            })
          );
        });

        it(`should log and stop the processing`, async (): Promise<void> => {
          expect.assertions(2);

          await issueStaleProcessor.processToAddExtraLabels$$();

          expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(2, `No extra label to add. Continuing...`);
        });

        it(`should not add the extra label on the issue`, async (): Promise<void> => {
          expect.assertions(1);

          await issueStaleProcessor.processToAddExtraLabels$$();

          expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when there is one extra label to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterStale: [`extra-label`],
            })
          );
        });

        it(`should log the extra label name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

          await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(processorLoggerErrorSpy).toHaveBeenCalledTimes(1);
            expect(processorLoggerErrorSpy).toHaveBeenCalledWith(`Could not find the label`, `value-extra-label`);
          });

          it(`should not add the extra label on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label`)
            );

            expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
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

            await issueStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The label`,
              `value-extra-label`,
              `whiteBright-was fetched`
            );
          });

          it(`should check if the dry-run mode is enabled`, async (): Promise<void> => {
            expect.assertions(2);

            await issueStaleProcessor.processToAddExtraLabels$$();

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

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `The extra label was not added due to the dry-run mode`
              );
            });

            it(`should not add the extra label on the issue`, async (): Promise<void> => {
              expect.assertions(1);

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
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

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(issueId, [`dummy-extra-label-id`]);
            });

            it(`should log about successfully adding the extra label on this issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
              expect(processorLoggerNoticeSpy).toHaveBeenCalledWith(`value-1`, `whiteBright-extra label added`);
            });
          });
        });
      });

      describe(`when there is two extra labels to add`, (): void => {
        beforeEach((): void => {
          issuesInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IIssuesInputs>(<Partial<IIssuesInputs>>{
              issueAddLabelsAfterStale: [`extra-label-1`, `extra-label-2`],
            })
          );
        });

        it(`should log the extra labels name`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

          await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

            await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
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

          it(`should not add the extra labels on the issue`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(issueStaleProcessor.processToAddExtraLabels$$()).rejects.toThrow(
              new Error(`Could not find the label extra-label-1`)
            );

            expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
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

            await issueStaleProcessor.processToAddExtraLabels$$();

            expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(5);
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

            await issueStaleProcessor.processToAddExtraLabels$$();

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

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerInfoSpy).toHaveBeenCalledTimes(6);
              expect(processorLoggerInfoSpy).toHaveBeenNthCalledWith(
                6,
                `The extra labels were not added due to the dry-run mode`
              );
            });

            it(`should not add the extra labels on the issue`, async (): Promise<void> => {
              expect.assertions(1);

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).not.toHaveBeenCalled();
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

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledTimes(1);
              expect(githubApiIssueLabelsServiceAddLabelsSpy).toHaveBeenCalledWith(issueId, [
                `dummy-extra-label-id-1`,
                `dummy-extra-label-id-2`,
              ]);
            });

            it(`should log about successfully adding the extra labels on this issue`, async (): Promise<void> => {
              expect.assertions(2);

              await issueStaleProcessor.processToAddExtraLabels$$();

              expect(processorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
              expect(processorLoggerNoticeSpy).toHaveBeenCalledWith(`value-2`, `whiteBright-extra labels added`);
            });
          });
        });
      });
    });
  });
});
