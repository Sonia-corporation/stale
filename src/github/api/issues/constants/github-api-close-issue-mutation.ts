export const GITHUB_API_CLOSE_ISSUE_MUTATION = `
  mutation CloseIssue($issueId: ID!, $reason: IssueClosedStateReason!) {
    __typename
    closeIssue(input: {issueId: $issueId, stateReason: $reason}) {
      clientMutationId
    }
  }
`;
