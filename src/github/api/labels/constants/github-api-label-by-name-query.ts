export const GITHUB_API_LABEL_BY_NAME_QUERY = `
  query MyQuery($owner: String!, $repository: String!, $labelName: String!) {
    repository(name: $repository, owner: $owner) {
      labels(query: $labelName, first: 1) {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`;
