import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiProjectCard } from '@github/api/labels/interfaces/github-api-project-card.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with all project cards ignored`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue should ignore all the project cards`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAllProjectCards: true,
      });
    });

    describe(`when there is no project card on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [],
            totalCount: 0,
          },
        });
      });

      it(`should not ignore the issue`, async (): Promise<void> => {
        expect.assertions(8);

        await issueSut.process();

        expect(IssuesStatisticsService.processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
      });
    });

    describe(`when there is one project card on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [createHydratedMock<IGithubApiProjectCard>()],
            totalCount: 1,
          },
        });
      });

      it(`should ignore the issue`, async (): Promise<void> => {
        expect.assertions(8);

        await issueSut.process();

        expect(IssuesStatisticsService.processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.ignoredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.unalteredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.addedIssuesCommentsCount$$).toBe(0);
      });
    });
  });
});
