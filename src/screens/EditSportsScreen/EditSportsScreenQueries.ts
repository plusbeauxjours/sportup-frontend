import gql from "graphql-tag";

export const UPDATE_SPORTS = gql`
  mutation UpdateSports($sportIds: [String]!) {
    updateSports(sportIds: $sportIds) {
      user {
        sports {
          sportId
          name
          rating
        }
      }
    }
  }
`;
