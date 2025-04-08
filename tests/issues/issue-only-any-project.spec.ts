import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue any of the required project`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-any-projects" contains at least one project`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyAnyProjects: [`project-x`],
      });
    });

    describe(`when an issue has no project`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [],
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

    describe(`when an issue has one project which does not match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
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

    describe(`when an issue has one project which does match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: createHydratedMock<IGithubApiProjectsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-x`,
              }),
            ],
          }),
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(12);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });
  });
});
