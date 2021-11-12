export const GITHUB_API_ADD_LABEL_TO_ISSUE_MUTATION = `
  mutation MyMutation($issueId: ID!, $labelId: ID!) {
    __typename
    addLabelsToLabelable(input: {labelableId: $issueId, labelIds: [$labelId]}) {
      clientMutationId
    }
  }
`;
