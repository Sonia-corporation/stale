import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueStaleProcessor } from '@core/issues/issue-stale-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
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

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });

    it(`should create the GithubApiLabelsService`, (): void => {
      expect.assertions(1);

      const result = new IssueStaleProcessor(issueProcessor);

      expect(result.githubApiLabelsService$$).toBeInstanceOf(GithubApiLabelsService);
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
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
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

      let githubApiLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiLabelsServiceAddLabelToIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

        githubApiLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(issueStaleProcessor.githubApiLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            dryRun: false,
            issueStaleLabel,
          })
        );
        githubApiLabelsServiceAddLabelToIssueSpy = jest
          .spyOn(issueStaleProcessor.githubApiLabelsService$$, `addLabelToIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueStaleProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
        issueProcessorLoggerErrorSpy = jest
          .spyOn(issueStaleProcessor.issueProcessor.logger, `error`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(9);

        await issueStaleProcessor.stale();

        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(issueStaleLabel);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(2);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
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
          githubApiLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log and throw an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(issueStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${issueStaleLabel}`
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${issueStaleLabel}`
          );
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: false,
                issueStaleLabel,
              })
            );
          });

          it(`should add the stale label on the issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueStaleProcessor.stale();

            expect(githubApiLabelsServiceAddLabelToIssueSpy).toHaveBeenCalledTimes(1);
            expect(githubApiLabelsServiceAddLabelToIssueSpy).toHaveBeenCalledWith(issueId, staleLabelId);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was added`);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now stale`);
          });
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: true,
                issueStaleLabel,
              })
            );
          });

          it(`should not add the stale label on the issue`, async (): Promise<void> => {
            expect.assertions(5);

            await issueStaleProcessor.stale();

            expect(githubApiLabelsServiceAddLabelToIssueSpy).not.toHaveBeenCalled();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not added due to the dry-run mode`
            );
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is now stale`);
          });
        });
      });
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      let issueProcessorGetUpdatedAtMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
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
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
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

          issueProcessorLoggerInfoSpy = jest
            .spyOn(issueStaleProcessor.issueProcessor.logger, `info`)
            .mockImplementation();
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

            issueProcessorLoggerInfoSpy = jest
              .spyOn(issueStaleProcessor.issueProcessor.logger, `info`)
              .mockImplementation();
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
