import gql from "graphql-tag";

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($userId: String!) {
    getUser(userId: $userId) {
      user {
        id
        following {
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
