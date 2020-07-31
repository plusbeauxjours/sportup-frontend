import gql from "graphql-tag";

export const GET_TEAMS_FOR_GAME = gql`
  query GetTeamsForGame($sportIds: [String]!, $pageNum: Int) {
    getTeamsForGame(sportIds: $sportIds, pageNum: $pageNum) {
      pageNum
      hasNextPage
      teams {
        id
        teamName
        rating
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
