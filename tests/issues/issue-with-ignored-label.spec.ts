import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored label`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue has an ignored label`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAnyLabels: [`ignored-label`],
      }).addIssue({
        labels: createHydratedMock<IGithubApiLabelsPagination>({
          nodes: [
            createHydratedMock<IGithubApiLabel>({
              name: `ignored-label`,
            }),
          ],
        }),
        locked: false,
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
