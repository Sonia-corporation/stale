export const GITHUB_API_DELETE_REFERENCE_MUTATION = `
  mutation DeleteReference($id: ID!) {
    __typename
    deleteRef(input: {refId: $id}) {
      clientMutationId
    }
  }
`;
