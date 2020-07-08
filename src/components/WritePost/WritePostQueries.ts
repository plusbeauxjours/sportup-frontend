import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation CreatePost($text: String!) {
    createPost(text: $text) {
      post {
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
