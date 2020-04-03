import gql from "graphql-tag";

export const GET_MAIN_FEED = gql`
  query GetMainFeed($pageNum: Int) {
    getMainFeed(pageNum: $pageNum) {
      posts {
        uuid
        text
        postImg
        createdAt
        score
        interaction
        postedBy {
          uuid
          name
          username
          userImg
        }
      }
    }
  }
`;
