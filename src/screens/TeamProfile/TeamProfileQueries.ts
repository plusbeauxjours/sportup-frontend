import gql from "graphql-tag";

export const GET_TEAM = gql`
  query GetTeam($uuid: String!) {
    getTeam(uuid: $uuid) {
      team {
        uuid
        teamName
        coverImg
        isAdmin
        sport {
          sportUuid
          name
        }
        rating
        members {
          uuid
          name
          username
          userImg
          bio
          isFollowing
        }
      }
    }
  }
`;
