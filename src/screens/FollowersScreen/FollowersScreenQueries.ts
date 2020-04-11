import gql from "graphql-tag";

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($uuid: String!) {
    getUser(uuid: $uuid) {
      user {
        uuid
        followers {
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
