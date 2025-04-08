import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with branch to delete`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the pull request branch should be deleted when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
        pullRequestDeleteBranchAfterClose: true,
      })
        .addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
        })
        .mockTimelineItemsPullRequestLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    describe(`when the dry-run is enabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.dryRun();
      });

      it(`should close the pull request without deleting the related branch`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsQueriesCount: 2,
          closedPullRequestsCount: 1,
          deletedPullRequestsBranchesCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when the dry-run is disabled`, (): void => {
      beforeEach((): void => {
        pullRequestSut.normalRun();
      });

      it(`should close the pull request and delete the related branch`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsMutationsCount: 3,
          calledApiPullRequestsQueriesCount: 2,
          closedPullRequestsCount: 1,
          deletedPullRequestsBranchesCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });

  describe(`when the pull request branch should not be deleted when closed`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestDaysBeforeClose: 10,
        pullRequestDaysBeforeStale: 30,
        pullRequestDeleteBranchAfterClose: false,
      })
        .addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt:
            DateTime.utc(2021).toISO({
              includeOffset: false,
            }) ?? ``, // No update since last stale
        })
        .mockTimelineItemsPullRequestLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                repository: {
                  pullRequest: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt:
                            DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }) ?? ``, // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    it(`should close the pull request without deleting the related branch`, async (): Promise<void> => {
      expect.assertions(14);

      await pullRequestSut.process();

      pullRequestSut.expect({
        addedPullRequestsCommentsCount: 1,
        alreadyStalePullRequestsCount: 1,
        calledApiPullRequestsMutationsCount: 2,
        calledApiPullRequestsQueriesCount: 2,
        closedPullRequestsCount: 1,
        processedPullRequestsCount: 1,
      });
    });
  });
});
