export const GITHUB_API_CLOSE_PULL_REQUEST_MUTATION = `
  mutation ClosePullRequest($pullRequestId: ID!) {
    __typename
    closePullRequest(input: {pullRequestId: $pullRequestId}) {
      clientMutationId
    }
  }
`;
