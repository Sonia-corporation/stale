import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueStaleProcessor } from '@core/issues/issue-stale-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IUuid } from '@utils/dates/uuid';
import { LoggerService } from '@utils/loggers/logger.service';
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
  });

  describe(`after creation`, (): void => {
    let issueStaleProcessor: IssueStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldStale()`, (): void => {
      let isStaleByUpdateDateSpy: jest.SpyInstance;
      let loggerServiceInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleProcessor = new IssueStaleProcessor(issueProcessor);

        isStaleByUpdateDateSpy = jest.spyOn(issueStaleProcessor, `isStaleByUpdateDate$$`).mockImplementation();
        loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      });

      it(`should check if the issue is stale based on the update date`, (): void => {
        expect.assertions(4);

        issueStaleProcessor.shouldStale();

        expect(isStaleByUpdateDateSpy).toHaveBeenCalledTimes(1);
        expect(isStaleByUpdateDateSpy).toHaveBeenCalledWith();
        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`Checking if the issue should be stale...`);
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
      let loggerServiceInfoSpy: jest.SpyInstance;
      let loggerServiceNoticeSpy: jest.SpyInstance;

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
          .spyOn(GithubApiLabelsService, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiGetLabel>({
              repository: {
                labels: {
                  nodes: [
                    createHydratedMock<IGithubApiLabel>({
                      id: staleLabelId,
                    }),
                  ],
                },
              },
            })
          );
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueStaleLabel,
          })
        );
        githubApiLabelsServiceAddLabelToIssueSpy = jest
          .spyOn(GithubApiLabelsService, `addLabelToIssue`)
          .mockImplementation();
        loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
        loggerServiceNoticeSpy = jest.spyOn(LoggerService, `notice`).mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(9);

        await issueStaleProcessor.stale();

        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(issueStaleLabel);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Adding the stale state to this issue...`);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `cyan-${issueStaleLabel}`,
          `whiteBright-to add on this issue...`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Adding the stale label to this issue...`);
      });

      it(`should add the stale label on the issue`, async (): Promise<void> => {
        expect.assertions(6);

        await issueStaleProcessor.stale();

        expect(githubApiLabelsServiceAddLabelToIssueSpy).toHaveBeenCalledTimes(1);
        expect(githubApiLabelsServiceAddLabelToIssueSpy).toHaveBeenCalledWith(issueId, staleLabelId);
        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(5);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was added`);
        expect(loggerServiceNoticeSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceNoticeSpy).toHaveBeenCalledWith(`The issue is now stale`);
      });
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      let issueProcessorGetUpdatedAtMock: jest.Mock;

      let loggerServiceInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      });

      describe(`when the issue was updated more than 30 days ago`, (): void => {
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
        });

        it(`should return true`, (): void => {
          expect.assertions(5);

          const result = issueStaleProcessor.isStaleByUpdateDate$$();

          expect(result).toBeTrue();
          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            1,
            `Checking if the issue should be stale based on the update date...`
          );
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was updated for the last time the`,
            `cyan-${issueProcessorGetUpdatedAtMock().toLocaleString(DateTime.DATETIME_SHORT)}`
          );
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The issue should be stale since it was not updated in the last`,
            `cyan-30`,
            `whiteBright-days`
          );
        });
      });

      describe.each([30, 29, 0])(`when the issue was updated less than 30 days ago`, (day): void => {
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
        });

        it(`should return false`, (): void => {
          expect.assertions(5);

          const result = issueStaleProcessor.isStaleByUpdateDate$$();

          expect(result).toBeFalse();
          expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            1,
            `Checking if the issue should be stale based on the update date...`
          );
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The issue was updated for the last time the`,
            `cyan-${issueProcessorGetUpdatedAtMock().toLocaleString(DateTime.DATETIME_SHORT)}`
          );
          expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The issue should not be stale since it was updated in the last`,
            `cyan-30`,
            `whiteBright-days`
          );
        });
      });
    });
  });
});
