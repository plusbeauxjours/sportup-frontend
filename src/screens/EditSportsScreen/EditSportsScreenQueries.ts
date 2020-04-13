import gql from "graphql-tag";

export const UPDATE_SPORTS = gql`
  mutation UpdateSports($sportUuids: [String]!) {
    updateSports(sportUuids: $sportUuids) {
      user {
        sports {
          sportUuid
          name
          rating
        }
      }
    }
  }
`;
