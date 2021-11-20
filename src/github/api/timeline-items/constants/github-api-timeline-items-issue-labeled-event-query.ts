export const GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY = `
  query GetIssueLabelEvents($owner: String!, $repository: String!, $issueNumber: Int!) {
    __typename
    repository(name: $repository, owner: $owner) {
      issue(number: $issueNumber) {
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
