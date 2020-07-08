import gql from "graphql-tag";

export const GET_USER_TEAMS = gql`
  query GetUserTeams($id: String!) {
    getUser(id: $id) {
      user {
        id
        teamSet {
          id
          teamName
          coverImg
          sport {
            sportId
            name
          }
        }
      }
    }
  }
`;
