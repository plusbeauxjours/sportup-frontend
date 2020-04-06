import gql from "graphql-tag";

export const GET_USER_TEAMS = gql`
  query GetUserTeams($uuid: String!) {
    getUser(uuid: $uuid) {
      user {
        uuid
        teamSet {
          id
          name
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
