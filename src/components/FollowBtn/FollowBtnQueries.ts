import gql from "graphql-tag";

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
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
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId) {
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
