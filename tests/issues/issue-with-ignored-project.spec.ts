import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored project`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue has an ignored project`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAnyProjects: [`ignored-project`],
      }).addIssue({
        locked: false,
        projects: createHydratedMock<IGithubApiProjectsPagination>({
          nodes: [
            createHydratedMock<IGithubApiProject>({
              title: `ignored-project`,
            }),
          ],
        }),
      });
    });

    it(`should ignore the issue`, async (): Promise<void> => {
      expect.assertions(12);

      await issueSut.process();

      issueSut.expect({
        calledApiIssuesQueriesCount: 1,
        ignoredIssuesCount: 1,
        processedIssuesCount: 1,
      });
    });
  });
});
