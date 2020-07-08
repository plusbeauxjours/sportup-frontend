import gql from "graphql-tag";

export const FOLLOW_USER = gql`
  mutation FollowUser($id: String!) {
    followUser(id: $id) {
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
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: String!) {
    unfollowUser(id: $id) {
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
`;
