import gql from "graphql-tag";

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($uuid: String!) {
    getUser(uuid: $uuid) {
      user {
        uuid
        following {
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
