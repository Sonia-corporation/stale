export const GITHUB_API_PULL_REQUEST_COMMENTS_QUERY = `
  query GetPullRequestComments($owner: String!, $repository: String!, $pullRequestId: Int!, $commentsPerPullRequest: Int!, $afterCursor: String) {
    repository(name: $repository, owner: $owner) {
      pullRequest(number: $pullRequestId) {
        comments(
          orderBy: {field: UPDATED_AT, direction: DESC}
          first: $commentsPerPullRequest
          after: $afterCursor
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            body
            id
          }
          totalCount
        }
      }
    }
    }
`;
