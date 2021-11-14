import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { GithubApiTimelineItemsService } from '@github/api/timeline-items/github-api-timeline-items.service';
import { IGithubApiTimelineItemsIssueLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-event.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiTimelineItemsService`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiTimelineItemsService(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiTimelineItemsService: GithubApiTimelineItemsService;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`fetchIssueAddedLabels()`, (): void => {
      let issueNumber: IGithubApiIssueNumber;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueNumber = faker.datatype.number();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiTimelineItemsService = new GithubApiTimelineItemsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
      });

      it(`should fetch the added labels events with the given issue number`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Fetching the added labels events on the issue`,
          `value-${issueNumber}`,
          `whiteBright-from GitHub...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY, {
          issueNumber,
          owner: `dummy-owner`,
          repository: `dummy-repo`,
        });
      });

      describe(`when the added labels events failed to be fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to fetch the added labels events on the issue`,
            `value-${issueNumber}`
          );
        });
      });

      describe(`when the added labels events were successfully fetched`, (): void => {
        let githubApiTimelineItemsIssueLabeledEvents: IGithubApiTimelineItemsIssueLabeledEvents;

        beforeEach((): void => {
          githubApiTimelineItemsIssueLabeledEvents = createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>();

          graphqlMock.mockResolvedValue(githubApiTimelineItemsIssueLabeledEvents);
        });

        describe(`when no event was found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsIssueLabeledEvents = createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    pageCount: 0,
                  },
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsIssueLabeledEvents);
          });

          it(`should log about not finding any added labels events and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Could not find a single added label event for the issue ${issueNumber}`)
            );

            expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find a single added label event for the issue`,
              `value-${issueNumber}`
            );
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the added labels events on the issue`,
              `value-${issueNumber}`
            );
          });
        });

        describe(`when a reasonable amount of added labels events matching the search were found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsIssueLabeledEvents = createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    filteredCount: 1,
                    nodes: [createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>()],
                    pageCount: 1,
                  },
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsIssueLabeledEvents);
          });

          it(`should return the added labels events`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await githubApiTimelineItemsService.fetchIssueAddedLabels(issueNumber);

            expect(result).toStrictEqual(githubApiTimelineItemsIssueLabeledEvents);
          });
        });

        describe(`when too much added labels events matching the search were found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsIssueLabeledEvents = createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    filteredCount: 2,
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>(),
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>(),
                    ],
                    pageCount: 1,
                  },
                },
              },
            });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsIssueLabeledEvents);
          });

          it(`should log about not handling the pagination yet for the added labels events and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Reached the maximum number of added label events supported for now`)
            );

            expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            expect(issueProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the added labels events on the issue`,
              `value-${issueNumber}`
            );
          });
        });
      });
    });
  });
});
