import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestCommentsProcessor } from '@core/pull-requests/pull-request-comments-processor';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { PullRequestStaleProcessor } from '@core/pull-requests/pull-request-stale-processor';
import { GithubApiPullRequestLabelsService } from '@github/api/labels/github-api-pull-request-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { MOCK_DATE_FORMAT } from '@utils/loggers/mock-date-format';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestStaleProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.pullRequestProcessor).toStrictEqual(pullRequestProcessor);
    });

    it(`should create the GithubApiPullRequestLabelsService`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.githubApiPullRequestLabelsService$$).toBeInstanceOf(GithubApiPullRequestLabelsService);
    });

    it(`should create the PullRequestCommentsProcessor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestStaleProcessor(pullRequestProcessor);

      expect(result.pullRequestCommentsProcessor$$).toBeInstanceOf(PullRequestCommentsProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestStaleProcessor: PullRequestStaleProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldStale()`, (): void => {
      let isStaleByUpdateDateSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        isStaleByUpdateDateSpy = jest.spyOn(pullRequestStaleProcessor, `isStaleByUpdateDate$$`).mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
      });

      it(`should check if the pull request is stale based on the update date`, (): void => {
        expect.assertions(4);

        pullRequestStaleProcessor.shouldStale();

        expect(isStaleByUpdateDateSpy).toHaveBeenCalledTimes(1);
        expect(isStaleByUpdateDateSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Checking if the pull request should be stale...`
        );
      });

      describe(`when the pull request should not be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestStaleProcessor.shouldStale();

          expect(result).toBeFalse();
        });
      });

      describe(`when the pull request should be stale`, (): void => {
        beforeEach((): void => {
          isStaleByUpdateDateSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestStaleProcessor.shouldStale();

          expect(result).toBeTrue();
        });
      });
    });

    describe(`stale()`, (): void => {
      let pullRequestStaleLabel: string;
      let staleLabelId: IUuid;
      let pullRequestId: IUuid;

      let githubApiPullRequestLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceAddLabelToPullRequestSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let pullRequestCommentsProcessorProcessStaleCommentSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            id: pullRequestId,
          },
        });
        pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
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
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleLabel,
            })
          );
        githubApiPullRequestLabelsServiceAddLabelToPullRequestSpy = jest
          .spyOn(pullRequestStaleProcessor.githubApiPullRequestLabelsService$$, `addLabelToPullRequest`)
          .mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `notice`)
          .mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `error`)
          .mockImplementation();
        pullRequestCommentsProcessorProcessStaleCommentSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestCommentsProcessor$$, `processStaleComment`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestStaleProcessor.stale();

        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(pullRequestStaleLabel);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Adding the stale state to this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${pullRequestStaleLabel}`,
          `whiteBright-to add on this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          4,
          `Adding the stale label to this pull request...`
        );
      });

      describe(`when the label could not be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log and throw an error`, async (): Promise<void> => {
          expect.assertions(4);

          await expect(pullRequestStaleProcessor.stale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${pullRequestStaleLabel}`
          );
          expect(pullRequestCommentsProcessorProcessStaleCommentSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
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

          it(`should add the stale label on the pull request`, async (): Promise<void> => {
            expect.assertions(6);

            await pullRequestStaleProcessor.stale();

            expect(githubApiPullRequestLabelsServiceAddLabelToPullRequestSpy).toHaveBeenCalledTimes(1);
            expect(githubApiPullRequestLabelsServiceAddLabelToPullRequestSpy).toHaveBeenCalledWith(
              pullRequestId,
              staleLabelId
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was added`);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is now stale`);
          });

          it(`should try to add a stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
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

          it(`should not add the stale label on the pull request`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestStaleProcessor.stale();

            expect(githubApiPullRequestLabelsServiceAddLabelToPullRequestSpy).not.toHaveBeenCalled();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not added due to the dry-run mode`
            );
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is now stale`);
          });

          it(`should try to add a stale comment on the pull request`, async (): Promise<void> => {
            expect.assertions(2);

            await pullRequestStaleProcessor.stale();

            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestCommentsProcessorProcessStaleCommentSpy).toHaveBeenCalledWith();
          });
        });
      });
    });

    describe(`isStaleByUpdateDate$$()`, (): void => {
      let pullRequestProcessorGetUpdatedAtMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestDaysBeforeStale: 30,
            })
          );
      });

      it(`should get the number of days before the pull request should be stale`, (): void => {
        expect.assertions(4);

        pullRequestStaleProcessor.isStaleByUpdateDate$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the pull request should be stale based on the update date...`
        );
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request last updated is older than the number of days before the pull request should be stale`, (): void => {
        beforeEach((): void => {
          pullRequestProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
            (): DateTime =>
              DateTime.now().minus({
                day: 31,
              })
          );
          pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
            getUpdatedAt: pullRequestProcessorGetUpdatedAtMock,
          });
          pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

          pullRequestProcessorLoggerInfoSpy = jest
            .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `info`)
            .mockImplementation();
        });

        it(`should return true`, (): void => {
          expect.assertions(4);

          const result = pullRequestStaleProcessor.isStaleByUpdateDate$$();

          expect(result).toBeTrue();
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The pull request was updated for the last time the`,
            `date-${pullRequestProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
          );
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            3,
            `The pull request should be stale since it was not updated in the last`,
            `value-30`,
            `whiteBright-days`
          );
        });
      });

      describe.each([30, 29, 0])(
        `when the pull request last updated is younger than the number of days before the pull request should be stale`,
        (day): void => {
          beforeEach((): void => {
            pullRequestProcessorGetUpdatedAtMock = jest.fn().mockImplementation(
              (): DateTime =>
                DateTime.now().minus({
                  day,
                })
            );
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              getUpdatedAt: pullRequestProcessorGetUpdatedAtMock,
            });
            pullRequestStaleProcessor = new PullRequestStaleProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestStaleProcessor.pullRequestProcessor.logger, `info`)
              .mockImplementation();
          });

          it(`should return false`, (): void => {
            expect.assertions(4);

            const result = pullRequestStaleProcessor.isStaleByUpdateDate$$();

            expect(result).toBeFalse();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `The pull request was updated for the last time the`,
              `date-${pullRequestProcessorGetUpdatedAtMock().toFormat(MOCK_DATE_FORMAT)}`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The pull request should not be stale since it was updated in the last`,
              `value-30`,
              `whiteBright-days`
            );
          });
        }
      );
    });
  });
});
