import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IGithubApiProjectCard } from '@github/api/labels/interfaces/github-api-project-card.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all project cards ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the project cards`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllProjectCards: true,
      });
    });

    describe(`when there is no project card on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
            nodes: [],
            totalCount: 0,
          },
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
      });
    });

    describe(`when there is one project card on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          locked: false,
          projectCards: {
            nodes: [createHydratedMock<IGithubApiProjectCard>()],
            totalCount: 1,
          },
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(8);

        await pullRequestSut.process();

        expect(PullRequestsStatisticsService.processedPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.ignoredPullRequestsCount$$).toBe(1);
        expect(PullRequestsStatisticsService.unalteredPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.stalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.alreadyStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.removeStalePullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.closedPullRequestsCount$$).toBe(0);
        expect(PullRequestsStatisticsService.addedPullRequestsCommentsCount$$).toBe(0);
      });
    });
  });
});
