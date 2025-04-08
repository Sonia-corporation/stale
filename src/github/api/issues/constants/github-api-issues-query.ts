export const GITHUB_API_ISSUES_QUERY = `
  query GetIssues($owner: String!, $repository: String!, $issuesPerPage: Int!, $labelsPerIssue: Int!, $assigneesPerIssue: Int!, $projectsPerIssue: Int!, $afterCursor: String) {
    repository(name: $repository, owner: $owner) {
      issues(orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN, first: $issuesPerPage, after: $afterCursor) {
        pageInfo {
          endCursor
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
          assignees(first: $assigneesPerIssue) {
            totalCount
            nodes {
              login
            }
          }
          projectsV2(first: $projectsPerIssue) {
            totalCount
            nodes {
              id
              title
            }
          }
          milestone {
            id
            number
            state
            title
          }
        }
      }
    }
  }
`;
