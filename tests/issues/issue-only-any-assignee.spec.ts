import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue any of the required assignee`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-any-assignees" contains at least one assignee`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyAnyAssignees: [`assignee-x`],
      });
    });

    describe(`when an issue has no assignee`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          assignees: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
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

    describe(`when an issue has one assignee which does not match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          assignees: {
            nodes: [
              createHydratedMock<IGithubApiAssignee>({
                login: `assignee-y`,
              }),
            ],
            totalCount: 1,
          },
          locked: false,
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

    describe(`when an issue has one assignee which does match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          assignees: {
            nodes: [
              createHydratedMock<IGithubApiAssignee>({
                login: `assignee-x`,
              }),
            ],
            totalCount: 1,
          },
          locked: false,
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
