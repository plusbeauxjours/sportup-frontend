import gql from 'graphql-tag';

export const REGISTER_TEAM = gql`
  mutation RegisterTeam(
    $eventId: String!
    $teamName: String!
    $captainName: String!
    $captainCnic: String!
    $captainContact: String!
    $playerNames: [String]
  ) {
    registerTeam(
      eventId: $eventId
      teamName: $teamName
      captainName: $captainName
      captainCnic: $captainCnic
      captainContact: $captainContact
      playerNames: $playerNames
    ) {
      ok
    }
  }
`;