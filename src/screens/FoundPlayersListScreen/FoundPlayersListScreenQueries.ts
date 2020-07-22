import gql from "graphql-tag";

export const GET_USERS_FOR_GAME = gql`
  query GetUsersForGame($sportIds: [String]!, $pageNum: Int) {
    getUsersForGame(sportIds: $sportIds, pageNum: $pageNum) {
      pageNum
      hasNextPage
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
        }
      }
    }
  }
`;
