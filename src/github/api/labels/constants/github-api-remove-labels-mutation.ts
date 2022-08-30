export const GITHUB_API_REMOVE_LABELS_MUTATION = `
  mutation RemoveLabels($id: ID!, $labelsId: [ID!]!) {
    __typename
    removeLabelsFromLabelable(input: {labelableId: $id, labelIds: $labelsId}) {
      clientMutationId
    }
  }
`;
