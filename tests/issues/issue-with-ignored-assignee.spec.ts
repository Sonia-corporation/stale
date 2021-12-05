import { StatisticsService } from '@core/statistics/statistics.service';
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
