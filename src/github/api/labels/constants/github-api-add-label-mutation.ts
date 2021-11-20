export const GITHUB_API_ADD_LABEL_MUTATION = `
  mutation AddLabel($id: ID!, $labelId: ID!) {
    __typename
    addLabelsToLabelable(input: {labelableId: $id, labelIds: [$labelId]}) {
      clientMutationId
    }
  }
`;
