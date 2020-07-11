import gql from "graphql-tag";

export const GET_UPCOMING_EVENTS = gql`
  mutation getUpcomingEvents {
    getUpcomingEvents {
      events {
        id
        name
        coverImg
        sport {
          id
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
