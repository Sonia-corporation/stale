import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiAssigneesPagination } from '@github/api/labels/interfaces/github-api-assignees-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored assignee`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue has an ignored assignee`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAnyAssignees: [`ignored-assignee`],
      }).addIssue({
        assignees: createHydratedMock<IGithubApiAssigneesPagination>({
          nodes: [
            createHydratedMock<IGithubApiAssignee>({
              login: `ignored-assignee`,
            }),
          ],
        }),
        locked: false,
      });
    });

    it(`should ignore the issue`, async (): Promise<void> => {
      expect.assertions(9);

      await issueSut.process();

      expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(1);
      expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(0);
      expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(0);
    });
  });
});
