import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request any of the required assignee`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;

  describe(`when the input "pull-request-only-any-assignees" contains at least one assignee`, (): void => {
    beforeEach((): void => {
      pullRequestSut = new FakePullRequestsProcessor({
        pullRequestOnlyAnyAssignees: [`assignee-x`],
      });
    });

    describe(`when a pull request has no assignee`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
          assignees: {
            nodes: [],
            totalCount: 0,
          },
          locked: false,
        });
      });

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when a pull request has one assignee which does not match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
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

      it(`should ignore the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          ignoredPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });

    describe(`when a pull request has one assignee which does match`, (): void => {
      beforeEach((): void => {
        pullRequestSut.addPullRequest({
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

      it(`should process the pull request`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          calledApiPullRequestsQueriesCount: 1,
          processedPullRequestsCount: 1,
          unalteredPullRequestsCount: 1,
        });
      });
    });
  });
});
