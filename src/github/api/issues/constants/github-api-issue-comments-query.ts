export const GITHUB_API_ISSUE_COMMENTS_QUERY = `
  query GetIssueComments($owner: String!, $repository: String!, $issueId: Int!, $commentsPerIssue: Int!, $afterCursor: String) {
    repository(name: $repository, owner: $owner) {
      issue(number: $issueId) {
        comments(
          orderBy: {field: UPDATED_AT, direction: DESC}
          first: $commentsPerIssue
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
