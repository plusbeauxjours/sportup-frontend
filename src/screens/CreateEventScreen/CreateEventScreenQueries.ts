import gql from "graphql-tag";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String
    $sportId: String!
    $startDate: Date
    $endDate: Date
    $startTime: Time
    $endTime: Time
    $maximumMembers: Int!
    $minimumMembers: Int!
    $expectedTeams: Int
  ) {
    createEvent(
      name: $name
      description: $description
      sportId: $sportId
      startDate: $startDate
      endDate: $endDate
      startTime: $startTime
      endTime: $endTime
      maximumMembers: $maximumMembers
      minimumMembers: $minimumMembers
      expectedTeams: $expectedTeams
    ) {
      event {
        id
        name
        description
        sport {
          sportId
          name
        }
        maximumMembers
        minimumMembers
        expectedTeams
        startDate
        endDate
        startTime
        endTime
        owner {
          id
          name
        }
      }
    }
  }
`;
