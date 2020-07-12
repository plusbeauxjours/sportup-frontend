import gql from "graphql-tag";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String
    $sportId: String!
    $maximumMembers: Int!
    $minimumMembers: Int!
    $expectedTeams: Int
    $startDate: Date
    $endDate: Date
    $startTime: Time
    $endTime: Time
  ) {
    createEvent(
      name: $name
      description: $description
      sportId: $sportId
      maximumMembers: $maximumMembers
      minimumMembers: $minimumMembers
      expectedTeams: $expectedTeams
      startDate: $startDate
      endDate: $endDate
      startTime: $startTime
      endTime: $endTime
    ) {
      event {
        id
        name
        description
        sport {
          sportId
          name
          rating
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
