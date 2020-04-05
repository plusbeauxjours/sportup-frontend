import gql from 'graphql-tag';

export const FOLLOW_USER = gql`
  mutation FollowUser($uuid: String!) {
    followUser(uuid: $uuid) {
      ok
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($uuid: String!) {
    unfollowUser(uuid: $uuid) {
      ok
    }
  }
`;