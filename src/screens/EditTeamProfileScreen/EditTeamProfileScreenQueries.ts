import gql from "graphql-tag";

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $teamId: String!
    $teamName: String!
    $sportId: String!
    $memberIds: [String]
  ) {
    updateTeam(
      teamId: $teamId
      teamName: $teamName
      sportId: $sportId
      memberIds: $memberIds
    ) {
      team {
        id
        teamName
        sport {
          sportId
          sportImgUrl
          name
        }
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
