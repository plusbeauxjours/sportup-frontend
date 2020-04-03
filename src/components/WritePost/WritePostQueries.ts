import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation CreatePost($text: String!) {
    createPost(text: $text) {
      post {
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
