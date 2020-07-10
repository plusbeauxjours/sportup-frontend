import gql from "graphql-tag";

export const GET_TEAMS_FOR_GAME = gql`
  query GetTeamsForGame($sportIds: [String]!) {
    getTeamsForGame(sportIds: $sportIds) {
      teams {
        id
        teamName
        coverImg
        sport {
          sportId
          name
        }
        rating
      }
    }
  }
`;