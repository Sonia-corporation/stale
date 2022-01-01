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

      beforeEach((): void => {
        issueStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
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
  });
});
