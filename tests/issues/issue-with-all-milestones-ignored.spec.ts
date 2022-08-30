import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with all milestones ignored`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when an issue should ignore all the milestones`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueIgnoreAllMilestones: true,
      });
    });

    describe(`when there is no milestone on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: undefined,
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

    describe(`when there is one milestone on the issue`, (): void => {
      beforeEach((): void => {
        issueSut.addIssue({
          locked: false,
          milestone: createHydratedMock<IGithubApiMilestone>(),
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
