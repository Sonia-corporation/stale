import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request with all assignees ignored`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when a pull request should ignore all the assignees`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestIgnoreAllAssignees: true,
      });
    });

    describe(`when there is no assignee on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          assignees: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should not ignore the pull request`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });

    describe(`when there is one assignee on the pull request`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          assignees: {
            nodes: [createHydratedMock<IGithubApiAssignee>()],
            totalCount: 1,
          },
          locked: false,
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(14);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });
});
