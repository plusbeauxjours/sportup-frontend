import gql from "graphql-tag";

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($userId: String!) {
    getUser(userId: $userId) {
      user {
        id
        followers {
          id
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
