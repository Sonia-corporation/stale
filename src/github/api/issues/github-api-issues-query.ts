export const GITHUB_API_ISSUES_QUERY = `
  query MyQuery($owner: String!, $repository: String!, $issuesPerPage: Int!, $afterCursor: String) {
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
          labels(first: 20) {
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
