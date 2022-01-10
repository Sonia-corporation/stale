export const GITHUB_API_ADD_LABELS_MUTATION = `
  mutation AddLabels($id: ID!, $labelsId: [ID!]!) {
    __typename
    addLabelsToLabelable(input: {labelableId: $id, labelIds: $labelsId}) {
      clientMutationId
    }
  }
`;
