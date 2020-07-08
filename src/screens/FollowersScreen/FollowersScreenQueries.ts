import gql from "graphql-tag";

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($id: String!) {
    getUser(id: $id) {
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
