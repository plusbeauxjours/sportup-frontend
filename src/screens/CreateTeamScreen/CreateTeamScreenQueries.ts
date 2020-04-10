import gql from "graphql-tag";

export const CREATE_TEAM = gql`
  mutation CreateTeam(
    $teamName: String!
    $sportUuid: String!
    $memberUuids: [String]
  ) {
    createTeam(teamName: $teamName, sportUuid: $sportUuid, memberUuids: $memberUuids) {
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
        uuid
        name
        username
        userImg
      }
    }
  }
`;

export const GET_ALL_SPORTS = gql`
  query GetAllSports {
    getAllSports {
      sports {
        sportUuid
        name
      }
    }
  }
`;
