import gql from "graphql-tag";

export const GET_TEAMS_FOR_GAME = gql`
  query GetTeamsForGame($sportIds: [String]!) {
    getTeamsForGame(sportIds: $sportIds) {
      teams {
        id
        teamName
        rating
        coverImg
        sport {
          sportId
          name
        }
        createdBy{
          id
          username
          pushToken
        }
      }
    }
  }
`;
