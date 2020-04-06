import gql from "graphql-tag";

export const FOLLOW_USER = gql`
  mutation FollowUser($uuid: String!) {
    followUser(uuid: $uuid) {
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
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($uuid: String!) {
    unfollowUser(uuid: $uuid) {
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
`;
