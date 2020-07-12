import gql from "graphql-tag";

export const GET_USERS_FOR_GAME = gql`
  query GetUsersForGame($sportIds: [String]!) {
    getUsersForGame(sportIds: $sportIds) {
      users {
        id
        name
        username
        userImg
        bio
        isFollowing
        sports {
          sportId
          name
          rating
        }
      }
    }
  }
`;
