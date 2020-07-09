import gql from "graphql-tag";

export const UPVOTE_POST = gql`
  mutation UpvotePost($postId: String!) {
    upvotePost(postId: $postId) {
      ok
    }
  }
`;

export const DOWNVOTE_POST = gql`
  mutation DownvotePost($postId: String!) {
    downvotePost(postId: $postId) {
      ok
    }
  }
`;

export const REMOVE_POST_INTERACTION = gql`
  mutation RemovePostInteraction($postId: String!) {
    removePostInteraction(postId: $postId) {
      ok
    }
  }
`;