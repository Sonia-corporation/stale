import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue only with project card`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-with-project-cards" is set to true`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithProjectCards: true,
      });
    });

    describe(`when an issue has no project card`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [],
            totalCount: 0,
          },
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

    describe(`when an issue has one project card`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-y`,
                },
              }),
            ],
            totalCount: 1,
          },
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });
  });

  describe(`when the input "issue-only-with-project-cards" is set to false`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithProjectCards: false,
      });
    });

    describe(`when an issue has no project card`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [],
            totalCount: 0,
          },
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(11);

        await issueSut.process();

        issueSut.expect({
          calledApiIssuesQueriesCount: 1,
          processedIssuesCount: 1,
          unalteredIssuesCount: 1,
        });
      });
    });

    describe(`when an issue has one project card`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: {
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-y`,
                },
              }),
            ],
            totalCount: 1,
          },
        });
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(11);

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
