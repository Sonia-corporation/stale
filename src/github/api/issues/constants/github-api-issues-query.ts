export const GITHUB_API_ISSUES_QUERY = `
  query GetIssues($owner: String!, $repository: String!, $issuesPerPage: Int!, $labelsPerIssue: Int!, $afterCursor: String) {
    repository(name: $repository, owner: $owner) {
      issues(orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN, first: $issuesPerPage, after: $afterCursor) {
        pageInfo {
          hasNextPage
        }
        totalCount
        nodes {
          locked
          createdAt
          number
          updatedAt
          url
          id
          labels(first: $labelsPerIssue) {
            totalCount
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`;
