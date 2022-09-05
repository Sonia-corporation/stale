export const GITHUB_API_REMOVE_ISSUE_COMMENT_MUTATION = `
  mutation RemoveIssueComment($id: ID!) {
    __typename
    deleteIssueComment(input: {id: $id}) {
      clientMutationId
    }
  }
`;
