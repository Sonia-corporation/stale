import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { IGithubApiProjectCardsPagination } from '@github/api/projects/interfaces/github-api-project-cards-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue any of the required project card`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-any-project-cards" contains at least one project card`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyAnyProjectCards: [`project-x`],
      });
    });

    describe(`when an issue has no project card`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
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

    describe(`when an issue has one project card which does not match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-y`,
                },
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

    describe(`when an issue has one project card which does match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          projectCards: createHydratedMock<IGithubApiProjectCardsPagination>({
            nodes: [
              createHydratedMock<IGithubApiProjectCard>({
                project: {
                  name: `project-x`,
                },
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
