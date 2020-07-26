import gql from "graphql-tag";

export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents($pageNum: Int) {
    getUpcomingEvents(pageNum: $pageNum) {
      pageNum
      hasNextPage
      events {
        id
        name
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
