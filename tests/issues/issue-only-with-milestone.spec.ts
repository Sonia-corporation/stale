import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue only with milestone`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-with-milestones" is set to true`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithMilestones: true,
      });
    });

    describe(`when an issue has no milestone`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: undefined,
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

    describe(`when an issue has one milestone`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            id: `milestone-y`,
          }),
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

  describe(`when the input "issue-only-with-milestones" is set to false`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyWithMilestones: false,
      });
    });

    describe(`when an issue has no milestone`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: undefined,
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

    describe(`when an issue has one milestone`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            id: `milestone-y`,
          }),
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
