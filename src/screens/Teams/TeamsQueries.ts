import gql from "graphql-tag";

export const GET_USER_TEAMS = gql`
  query GetUserTeams($uuid: String!) {
    getUser(uuid: $uuid) {
      user {
        uuid
        teamSet {
          uuid
          teamName
          coverImg
          sport {
            sportUuid
            name
          }
        }
      }
    }
  }
`;
