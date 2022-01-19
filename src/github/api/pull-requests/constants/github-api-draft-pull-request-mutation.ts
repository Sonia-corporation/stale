export const GITHUB_API_DRAFT_PULL_REQUEST_MUTATION = `
  mutation PullRequestToDraft($pullRequestId: ID!) {
    __typename
    convertPullRequestToDraft(input: {pullRequestId: $pullRequestId}) {
      clientMutationId
    }
  }
`;
