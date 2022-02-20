import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue any of the required milestone`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the input "issue-only-any-milestones" contains at least one milestone`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueOnlyAnyMilestones: [`milestone-x`],
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

    describe(`when an issue has one milestone which does not match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            title: `milestone-y`,
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

    describe(`when an issue has one milestone which does match`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>({
            title: `milestone-x`,
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
