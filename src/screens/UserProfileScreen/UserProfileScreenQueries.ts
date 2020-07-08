import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
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
        }
        teamsCount
        followersCount
        followingCount
      }
    }
  }
`;

export const GET_USER_FEED = gql`
  query GetUserFeed($id: String!, $pageNum: Int) {
    getUserFeed(id: $id, pageNum: $pageNum) {
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
  mutation RateUserSport($id: String!, $sportId: String!, $rating: Int!) {
    rateUserSport(id: $id, sportId: $sportId, rating: $rating) {
      ok
    }
  }
`;
