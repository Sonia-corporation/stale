import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with all projects ignored`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue should ignore all the projects`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAllProjects: true,
      });
    });

    describe(`when there is no project on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [],
            totalCount: 0,
          },
        });
      });

      it(`should not ignore the issue`, async (): Promise<void> => {
        expect.assertions(12);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });

    describe(`when there is one project on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [createHydratedMock<IGithubApiProject>()],
            totalCount: 1,
          },
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
});
