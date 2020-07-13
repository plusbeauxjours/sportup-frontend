import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      user {
        id
        name
        firstName
        lastName
        username
        bio
        userImg
        isFollowing
        sports {
          sportId
          name
          rating
        }
        teamsCount
        followersCount
        followingCount
      }
    }
  }
`;

export const GET_USER_FEED = gql`
  query GetUserFeed($userId: String!, $pageNum: Int) {
    getUserFeed(userId: $userId, pageNum: $pageNum) {
      pageNum
      hasNextPage
      posts {
        id
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
  mutation RateUserSport($userId: String!, $sportId: String!, $rating: Int!) {
    rateUserSport(userId: $userId, sportId: $sportId, rating: $rating) {
      ok
    }
  }
`;
