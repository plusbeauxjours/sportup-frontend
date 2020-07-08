import gql from "graphql-tag";

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($id: String!) {
    getUser(id: $id) {
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
