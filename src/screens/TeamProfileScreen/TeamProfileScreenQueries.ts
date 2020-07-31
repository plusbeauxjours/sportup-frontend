import gql from "graphql-tag";

export const GET_TEAM = gql`
  query GetTeam($teamId: String!) {
    getTeam(teamId: $teamId) {
      team {
        id
        teamName
        isAdmin
        createdBy{
          id
          username
          pushToken
        }
        sport {
          sportId
          sportImgUrl
          name
        }
        rating
        members {
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


export const RATE_TEAM = gql`
  mutation RateTeam($teamId: String!, $rating: Int!) {
    rateTeam(teamId: $teamId, rating: $rating) {
      ok
    }
  }
`;
