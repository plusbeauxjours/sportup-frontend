import gql from "graphql-tag";

export const CREATE_TEAM = gql`
  mutation CreateTeam(
    $teamName: String!
    $sportId: String!
    $memberIds: [String]
  ) {
    createTeam(teamName: $teamName, sportId: $sportId, memberIds: $memberIds) {
      user {
        teamsCount
      }
    }
  }
`;

export const GET_USER_FROM_USERNAME = gql`
  query GetUserFromUsername($username: String!) {
    getUserFromUsername(username: $username) {
      user {
        id
        name
        username
        userImg
      }
    }
  }
`;
