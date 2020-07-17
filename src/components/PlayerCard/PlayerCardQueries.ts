import gql from "graphql-tag";

export const GET_TEAMS_FOR_PLAYER = gql`
  query GetTeamsForPlayer($sportIds: [String]!, $userId: String!) {
    getTeamsForPlayer(sportIds: $sportIds, userId: $userId) {
      teams {
        id
        teamName
        coverImg
        sport {
          sportId
          name
        }
        rating
        createdBy{
          id
          username
          pushToken
        }
      }
    }
  }
`;
