import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue only with project`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-with-projects" is set to true`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithProjects: true,
      });
    });

    describe(`when an issue has no project`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [],
            totalCount: 0,
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

    describe(`when an issue has one project`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
              }),
            ],
            totalCount: 1,
          },
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

  describe(`when the input "issue-only-with-projects" is set to false`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithProjects: false,
      });
    });

    describe(`when an issue has no project`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [],
            totalCount: 0,
          },
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

    describe(`when an issue has one project`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectsV2: {
            nodes: [
              createHydratedMock<IGithubApiProject>({
                title: `project-y`,
              }),
            ],
            totalCount: 1,
          },
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
