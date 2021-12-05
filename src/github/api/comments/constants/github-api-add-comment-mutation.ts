export const GITHUB_API_ADD_COMMENT_MUTATION = `
  mutation AddComment($id: ID!, $comment: String!) {
    __typename
    addComment(input: {subjectId: $id, body: $comment}) {
      clientMutationId
    }
  }
`;
