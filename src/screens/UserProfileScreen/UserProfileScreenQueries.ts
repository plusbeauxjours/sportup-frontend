import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($uuid: String!) {
    getUser(uuid: $uuid) {
      user {
        uuid
        name
        firstName
        lastName
        username
        bio
        userImg
        isFollowing
        sports {
          sportUuid
          name
        }
        teamsCount
        followersCount
        followingCount
      }
    }
  }
`;

export const GET_USER_FEED = gql`
  query GetUserFeed($uuid: String!, $pageNum: Int) {
    getUserFeed(uuid: $uuid, pageNum: $pageNum) {
      posts {
        uuid
        text
        postImg
        createdAt
        score
        interaction
        postedBy {
          id
          name
          username
          userImg
        }
      }
    }
  }
`;

export const RATE_USER_SPORT = gql`
  mutation RateUserSport($uuid: String!, $sportUuid: String!, $rating: Int!) {
    rateUserSport(uuid: $uuid, sportUuid: $sportUuid, rating: $rating) {
      ok
    }
  }
`;
