import { StatisticsService } from '@core/statistics/statistics.service';
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

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(1);
        expect(StatisticsService.staleIssuesCount$$).toBe(0);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closedIssuesCount$$).toBe(0);
        expect(StatisticsService.addedIssuesCommentsCount$$).toBe(0);
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

        expect(StatisticsService.processedIssuesCount$$).toBe(1);
        expect(StatisticsService.ignoredIssuesCount$$).toBe(1);
        expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
        expect(StatisticsService.staleIssuesCount$$).toBe(0);
        expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
        expect(StatisticsService.closedIssuesCount$$).toBe(0);
        expect(StatisticsService.addedIssuesCommentsCount$$).toBe(0);
      });
    });
  });
});