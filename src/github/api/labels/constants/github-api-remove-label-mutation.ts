export const GITHUB_API_REMOVE_LABEL_MUTATION = `
  mutation RemoveLabel($id: ID!, $labelId: ID!) {
    __typename
    removeLabelsFromLabelable(input: {labelableId: $id, labelIds: [$labelId]}) {
      clientMutationId
    }
  }
`;
