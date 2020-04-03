import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($uuid: String) {
    getUser(uuid: $uuid) {
      user {
        uuid
        name
        username
        bio
        userImg
        isFollowing
        sports {
          sportUuid
          name
        }
        teamsCount
        followersCount
        followingCount
      }
    }
  }
`;
