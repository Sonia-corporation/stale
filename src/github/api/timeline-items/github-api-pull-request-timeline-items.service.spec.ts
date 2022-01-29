import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { GithubApiPullRequestTimelineItemsService } from '@github/api/timeline-items/github-api-pull-request-timeline-items.service';
import { IGithubApiTimelineItemsPullRequestLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-event.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiPullRequestTimelineItemsService`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiPullRequestTimelineItemsService(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiPullRequestTimelineItemsService: GithubApiPullRequestTimelineItemsService;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`fetchPullRequestAddedLabels()`, (): void => {
      let pullRequestNumber: IGithubApiPullRequestNumber;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestNumber = faker.datatype.number();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestTimelineItemsService = new GithubApiPullRequestTimelineItemsService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsQueriesCount`)
          .mockImplementation();
      });

      it(`should fetch the added labels events with the given pull request number`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(
          githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
        ).rejects.toThrow(new Error(`graphql error`));

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Fetching the added labels events on the pull request`,
          `value-${pullRequestNumber}`,
          `whiteBright-from GitHub...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY, {
          owner: `dummy-owner`,
          pullRequestNumber,
          repository: `dummy-repo`,
        });
      });

      describe(`when the added labels events failed to be fetched`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error and rethrow it`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(
            githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
          ).rejects.toThrow(new Error(`graphql error`));

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to fetch the added labels events on the pull request`,
            `value-${pullRequestNumber}`
          );
        });

        it(`should not increase the statistic regarding the API pull requests queries calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
          ).rejects.toThrow(new Error(`graphql error`));

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the added labels events were successfully fetched`, (): void => {
        let githubApiTimelineItemsPullRequestLabeledEvents: IGithubApiTimelineItemsPullRequestLabeledEvents;

        beforeEach((): void => {
          githubApiTimelineItemsPullRequestLabeledEvents =
            createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>();

          graphqlMock.mockResolvedValue(githubApiTimelineItemsPullRequestLabeledEvents);
        });

        describe(`when no event was found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsPullRequestLabeledEvents =
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      pageCount: 0,
                    },
                  },
                },
              });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsPullRequestLabeledEvents);
          });

          it(`should log about not finding any added labels events and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(
              githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
            ).rejects.toThrow(
              new Error(`Could not find a single added label event for the pull request ${pullRequestNumber}`)
            );

            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Could not find a single added label event for the pull request`,
              `value-${pullRequestNumber}`
            );
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the added labels events on the pull request`,
              `value-${pullRequestNumber}`
            );
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(
              githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
            ).rejects.toThrow(
              new Error(`Could not find a single added label event for the pull request ${pullRequestNumber}`)
            );

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when a reasonable amount of added labels events matching the search were found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsPullRequestLabeledEvents =
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>()],
                      pageCount: 1,
                    },
                  },
                },
              });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsPullRequestLabeledEvents);
          });

          it(`should return the added labels events`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(
              pullRequestNumber
            );

            expect(result).toStrictEqual(githubApiTimelineItemsPullRequestLabeledEvents);
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber);

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
          });
        });

        describe(`when too much added labels events matching the search were found`, (): void => {
          beforeEach((): void => {
            githubApiTimelineItemsPullRequestLabeledEvents =
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 2,
                      nodes: [
                        createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>(),
                        createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>(),
                      ],
                      pageCount: 1,
                    },
                  },
                },
              });

            graphqlMock.mockResolvedValue(githubApiTimelineItemsPullRequestLabeledEvents);
          });

          it(`should log about not handling the pagination yet for the added labels events and throw an error`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(
              githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
            ).rejects.toThrow(new Error(`Reached the maximum number of added label events supported for now`));

            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(2);
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              1,
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenNthCalledWith(
              2,
              `Failed to fetch the added labels events on the pull request`,
              `value-${pullRequestNumber}`
            );
          });

          it(`should increase the statistic regarding the API pull requests queries calls by 1`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(
              githubApiPullRequestTimelineItemsService.fetchPullRequestAddedLabels(pullRequestNumber)
            ).rejects.toThrow(new Error(`Reached the maximum number of added label events supported for now`));

            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsQueriesCountSpy).toHaveBeenCalledWith();
          });
        });
      });
    });
  });
});
