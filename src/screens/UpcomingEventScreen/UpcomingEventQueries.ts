import gql from "graphql-tag";

export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    getUpcomingEvents {
      events {
        id
        name
        coverImg
        sport {
          sportId
          name
        }
        owner {
          id
          name
        }
        startDate
        endDate
        startTime
        endTime
      }
    }
  }
`;
