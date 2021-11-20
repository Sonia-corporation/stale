export const GITHUB_API_CLOSE_ISSUE_MUTATION = `
  mutation CloseIssue($issueId: ID!) {
    __typename
    closeIssue(input: {issueId: $issueId}) {
      clientMutationId
    }
  }
`;
