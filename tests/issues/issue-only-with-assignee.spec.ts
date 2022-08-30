import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue only with assignee`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-with-assignees" is set to true`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithAssignees: true,
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

    describe(`when an issue has one assignee`, (): void => {
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

  describe(`when the input "issue-only-with-assignees" is set to false`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithAssignees: false,
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

    describe(`when an issue has one assignee`, (): void => {
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
