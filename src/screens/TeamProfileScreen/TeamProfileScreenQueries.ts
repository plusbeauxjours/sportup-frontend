import gql from "graphql-tag";

export const GET_TEAM = gql`
  query GetTeam($id: String!) {
    getTeam(id: $id) {
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
