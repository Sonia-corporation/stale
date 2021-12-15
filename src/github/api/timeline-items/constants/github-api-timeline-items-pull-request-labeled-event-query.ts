export const GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY = `
  query GetPullRequestLabelEvents($owner: String!, $repository: String!, $pullRequestNumber: Int!) {
    __typename
    repository(name: $repository, owner: $owner) {
      pullRequest(number: $pullRequestNumber) {
        timelineItems(itemTypes: LABELED_EVENT, first: 100) {
          nodes {
            ... on LabeledEvent {
              createdAt
              label {
                id
                name
              }
            }
          }
          filteredCount
          pageCount
        }
      }
    }
  }
`;
