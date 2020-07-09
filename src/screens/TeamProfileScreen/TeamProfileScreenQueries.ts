import gql from "graphql-tag";

export const GET_TEAM = gql`
  query GetTeam($teamId: String!) {
    getTeam(teamId: $teamId) {
      team {
        id
        teamName
        coverImg
        isAdmin
        sport {
          sportId
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
