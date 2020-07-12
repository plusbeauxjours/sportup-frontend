import gql from "graphql-tag";

export const GET_USER_TEAMS = gql`
  query GetUserTeams($userId: String!) {
    getUser(userId: $userId) {
      user {
        id
        teamSet {
          id
          teamName
          rating
          coverImg
          sport {
            sportId
            name
            rating
          }
        }
      }
    }
  }
`;
