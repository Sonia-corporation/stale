import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueRemoveStaleProcessor } from '@core/issues/issue-remove-stale-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiLabels } from '@github/api/labels/interfaces/github-api-labels.interface';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueRemoveStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueRemoveStaleProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueRemoveStaleProcessor: IssueRemoveStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>({});
    });

    describe(`removeStale()`, (): void => {
      let issueStaleLabel: string;
      let staleLabelId: IUuid;
      let issueId: IUuid;

      let githubApiLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiLabelsServiceRemoveLabelFromIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

        githubApiLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(GithubApiLabelsService, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabels>({
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
            dryRun: false,
            issueStaleLabel,
          })
        );
        githubApiLabelsServiceRemoveLabelFromIssueSpy = jest
          .spyOn(GithubApiLabelsService, `removeLabelFromIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueRemoveStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueRemoveStaleProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(9);

        await issueRemoveStaleProcessor.removeStale();

        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(issueStaleLabel);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(2);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Removing the stale state from this issue...`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${issueStaleLabel}`,
          `whiteBright-to remove from this issue...`
        );
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Removing the stale label from this issue...`);
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

        it(`should remove the stale label from this issue`, async (): Promise<void> => {
          expect.assertions(6);

          await issueRemoveStaleProcessor.removeStale();

          expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).toHaveBeenCalledTimes(1);
          expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).toHaveBeenCalledWith(issueId, staleLabelId);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was removed`);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is no longer stale`);
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

        it(`should not remove the stale label from this issue`, async (): Promise<void> => {
          expect.assertions(5);

          await issueRemoveStaleProcessor.removeStale();

          expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).not.toHaveBeenCalled();
          expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
          expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            5,
            `The stale label was not removed due to the dry-run mode`
          );
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is no longer stale`);
        });
      });
    });
  });
});
