import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored milestone`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue has an ignored milestone`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAnyMilestones: [`ignored-milestone`],
      }).addIssue({
        locked: false,
        milestone: createHydratedMock<IGithubApiMilestone>({
          title: `ignored-milestone`,
        }),
      });
    });

    it(`should ignore the issue`, async (): Promise<void> => {
      expect.assertions(11);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        ignoredIssuesCount: 1,
        processedIssuesCount: 1,
      });
    });
  });
});
