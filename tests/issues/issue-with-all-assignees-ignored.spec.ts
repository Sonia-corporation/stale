import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with all assignees ignored`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue should ignore all the assignees`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAllAssignees: true,
      });
    });

    describe(`when there is no assignee on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          assignees: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the issue`, async (): Promise<void> => {
        expect.assertions(9);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount$$).toBe(0);
      });
    });

    describe(`when there is one assignee on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          assignees: {
            nodes: [createHydratedMock<IGithubApiAssignee>()],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the issue`, async (): Promise<void> => {
        expect.assertions(9);

        await issueSut.process();

        expect(IssuesStatisticsService.getInstance().processedIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().ignoredIssuesCount$$).toBe(1);
        expect(IssuesStatisticsService.getInstance().unalteredIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().staleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().closedIssuesCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount$$).toBe(0);
        expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount$$).toBe(0);
      });
    });
  });
});
