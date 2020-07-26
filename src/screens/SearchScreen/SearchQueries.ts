import gql from "graphql-tag";

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($searchText: String!) {
    getSearchUsers(searchText: $searchText) {
      users {
        id
        name
        username
        userImg
        isFollowing
      }
    }
    getSearchTeams(searchText: $searchText) {
      teams {
        id
        teamName
        rating
        sport {
          sportId
          name
        }
        createdBy {
          id
          name
          username
          pushToken
        }
      }
    }
    getSearchEvents(searchText: $searchText) {
      events {
        id
        name
        sport {
          sportId
          name
        }
        owner {
          id
          name
          username
        }
      }
    }
  }
`;
