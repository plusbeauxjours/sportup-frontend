import gql from "graphql-tag";

export const GET_EVENT = gql`
  query GetEvent($eventId: String!) {
    getEvent(eventId: $eventId) {
      event {
        id
        name
        description
        sport {
          sportId
          name
          sportImgUrl
        }
        coverImg
        startDate
        endDate
        startTime
        endTime
        expectedTeams
        owner {
          id
          name
          username
        }
        isOwner
        minimumMembers
        maximumMembers
      }
    }
  }
`;
