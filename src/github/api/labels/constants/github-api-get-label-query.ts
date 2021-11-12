export const GITHUB_API_GET_LABEL_QUERY = `
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
