import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all labels ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the labels`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllLabels: true,
        pullRequestStaleLabel: `stale`,
      });
    });

    describe(`when there is no label on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          labels: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when there is one label on the pull request which is identical to the stale label`, (): void => {
      beforeEach((): void => {
        pullRequestSut
          .addPullRequest({
            labels: {
              nodes: [
                createHydratedMock<IGithubApiLabel>({
                  name: `stale`,
                }),
              ],
              totalCount: 1,
            },
            locked: false,
            updatedAt: DateTime.now().toISO({
              includeOffset: false,
            }),
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
                            createdAt: DateTime.now().toISO({
                              includeOffset: false,
                            }), // Last stale
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

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsQueriesCount: 2,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when there is one label on the pull request which is different than the stale label`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `not-stale`,
              }),
            ],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });
});
