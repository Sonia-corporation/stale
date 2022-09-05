export const GITHUB_API_REMOVE_PULL_REQUEST_COMMENT_MUTATION = `
  mutation RemovePullRequestComment($id: ID!) {
    __typename
    deletePullRequestReviewComment(input: {id: $id}) {
      clientMutationId
    }
  }
`;
