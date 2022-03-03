import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { IGithubApiProjectCardsPagination } from '@github/api/projects/interfaces/github-api-project-cards-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored project card`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue has an ignored project card`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAnyProjectCards: [`ignored-project`],
      }).addIssue({
        locked: false,
        projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
          nodes: [
            createHydratedMock<IGithubApiProjectCard>({
              project: {
                name: `ignored-project`,
              },
            }),
          ],
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
