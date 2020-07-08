import gql from "graphql-tag";

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($searchText: String!) {
    getSearchUsers(searchText: $searchText) {
      users {
        id
        name
        username
        userImg
      }
    }
    getSearchTeams(searchText: $searchText) {
      teams {
        id
        teamName
        createdBy {
          id
          name
          username
        }
      }
    }
    getSearchEvents(searchText: $searchText) {
      events {
        id
        name
        owner {
          id
          name
          username
        }
      }
    }
  }
`;
