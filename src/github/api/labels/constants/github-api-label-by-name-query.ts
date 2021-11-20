export const GITHUB_API_LABEL_BY_NAME_QUERY = `
  query GetLabelByName($owner: String!, $repository: String!, $labelName: String!) {
    repository(name: $repository, owner: $owner) {
      label(name: $labelName) {
        name
        id
      }
    }
  }
`;
