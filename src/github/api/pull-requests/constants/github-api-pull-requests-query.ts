export const GITHUB_API_PULL_REQUESTS_QUERY = `
  query GetPullRequests($owner: String!, $repository: String!, $pullRequestsPerPage: Int!, $labelsPerPullRequest: Int!, $assigneesPerPullRequest: Int!, $projectsPerPullRequest: Int!, $afterCursor: String) {
    repository(name: $repository, owner: $owner) {
      pullRequests(orderBy: {field: UPDATED_AT, direction: DESC}, states: OPEN, first: $pullRequestsPerPage, after: $afterCursor) {
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
          isDraft
          labels(first: $labelsPerPullRequest) {
            totalCount
            nodes {
              id
              name
            }
          }
          assignees(first: $assigneesPerPullRequest) {
            totalCount
            nodes {
              login
            }
          }
          projectsV2(first: $projectsPerPullRequest) {
            totalCount
            nodes {
              id
              title
            }
          }
          headRef {
            name
            id
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
