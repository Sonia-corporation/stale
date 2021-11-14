export const GITHUB_API_REMOVE_LABEL_MUTATION = `
  mutation MyMutation($issueId: ID!, $labelId: ID!) {
    __typename
    removeLabelsFromLabelable(input: {labelableId: $issueId, labelIds: [$labelId]}) {
      clientMutationId
    }
  }
`;
