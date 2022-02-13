import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { GithubApiIssueTimelineItemsService } from '@github/api/timeline-items/github-api-issue-timeline-items.service';
import { IGithubApiTimelineItemsIssueLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-event.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorIssue } from '@utils/annotations/enums/annotation-error-issue.enum';
import { context } from '@actions/github';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiIssueTimelineItemsService`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiIssueTimelineItemsService(issueProcessor);

      expect(result.processor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiIssueTimelineItemsService: GithubApiIssueTimelineItemsService;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`fetchIssueAddedLabels()`, (): void => {
      let issueNumber: IGithubApiIssueNumber;
      let graphqlMock: jest.Mock;

      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueNumber = faker.datatype.number();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiIssueTimelineItemsService = new GithubApiIssueTimelineItemsService(issueProcessor);

        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        jest.spyOn(context, `repo`, `get`).mockReturnValue({
          owner: `dummy-owner`,
          repo: `dummy-repo`,
        });
        issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy = jest
          .spyOn(IssuesStatisticsService.getInstance(), `increaseCalledApiIssuesQueriesCount`)
          .mockImplementation();
      });

      it(`should fetch the added labels events with the given issue number`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
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

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to fetch the added labels events on the issue`,
            `value-${issueNumber}`
          );
        });

        it(`should annotate the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(
            EAnnotationErrorIssue.FAILED_FETCHING_ADDED_LABELS_EVENTS,
            {
              file: `github-api-issue-timeline-items.service.ts`,
              startLine: 77,
              title: `Error`,
            }
          );
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });

        it(`should not increase the statistic regarding the API issues queries calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).not.toHaveBeenCalled();
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

          it(`should log about not finding any added labels events`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
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

          it(`should annotate about not finding any added labels events`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Could not find a single added label event for the issue ${issueNumber}`)
            );

            expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(1, EAnnotationErrorIssue.NO_LABEL_EVENT_FOUND, {
              file: `github-api-issue-timeline-items.service.ts`,
              startLine: 38,
              title: `Error`,
            });
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(
              2,
              EAnnotationErrorIssue.FAILED_FETCHING_ADDED_LABELS_EVENTS,
              {
                file: `github-api-issue-timeline-items.service.ts`,
                startLine: 77,
                title: `Error`,
              }
            );
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Could not find a single added label event for the issue ${issueNumber}`)
            );
          });

          it(`should increase the statistic regarding the API issues queries calls by 1`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Could not find a single added label event for the issue ${issueNumber}`)
            );

            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledWith();
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

            const result = await githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber);

            expect(result).toStrictEqual(githubApiTimelineItemsIssueLabeledEvents);
          });

          it(`should increase the statistic regarding the API issues queries calls by 1`, async (): Promise<void> => {
            expect.assertions(2);

            await githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber);

            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledWith();
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

          it(`should log about not handling the pagination yet for the added labels events`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
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

          it(`should annotate about not handling the pagination yet for the added labels events`, async (): Promise<void> => {
            expect.assertions(4);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Reached the maximum number of added label events supported for now`)
            );

            expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(
              1,
              EAnnotationErrorIssue.TOO_MANY_ADDED_LABELS_EVENTS_PAGINATION_NOT_IMPLEMENTED,
              {
                file: `github-api-issue-timeline-items.service.ts`,
                startLine: 38,
                title: `Error`,
              }
            );
            expect(annotationsServiceErrorSpy).toHaveBeenNthCalledWith(
              2,
              EAnnotationErrorIssue.FAILED_FETCHING_ADDED_LABELS_EVENTS,
              {
                file: `github-api-issue-timeline-items.service.ts`,
                startLine: 77,
                title: `Error`,
              }
            );
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Reached the maximum number of added label events supported for now`)
            );
          });

          it(`should increase the statistic regarding the API issues queries calls by 1`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(githubApiIssueTimelineItemsService.fetchIssueAddedLabels(issueNumber)).rejects.toThrow(
              new Error(`Reached the maximum number of added label events supported for now`)
            );

            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledTimes(1);
            expect(issuesStatisticsServiceIncreaseCalledApiIssuesQueriesCountSpy).toHaveBeenCalledWith();
          });
        });
      });
    });
  });
});
