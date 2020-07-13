import gql from "graphql-tag";

export const GET_MAIN_FEED = gql`
  query GetMainFeed($pageNum: Int) {
    getMainFeed(pageNum: $pageNum) {
      pageNum
      hasNextPage
      posts {
        id
        text
        postImg
        createdAt
        score
        interaction
        postedBy {
          id
          name
          username
          userImg
        }
      }
    }
  }
`;
