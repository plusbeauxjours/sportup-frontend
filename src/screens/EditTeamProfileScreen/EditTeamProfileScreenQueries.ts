import gql from "graphql-tag";

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $teamUuid: String!
    $teamName: String!
    $sportUuid: String!
    $memberUuids: [String]
  ) {
    updateTeam(
      teamUuid: $teamUuid
      teamName: $teamName
      sportUuid: $sportUuid
      memberUuids: $memberUuids
    ) {
      team {
        uuid
        teamName
        coverImg
        sport {
          sportUuid
          name
        }
        members {
          uuid
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
