import gql from 'graphql-tag';

export const UPVOTE_POST = gql`
  mutation UpvotePost($postUuid: String!) {
    upvotePost(postUuid: $postUuid) {
      ok
    }
  }
`;

export const DOWNVOTE_POST = gql`
  mutation DownvotePost($postUuid: String!) {
    downvotePost(postUuid: $postUuid) {
      ok
    }
  }
`;

export const REMOVE_POST_INTERACTION = gql`
  mutation RemovePostInteraction($postUuid: String!) {
    removePostInteraction(postUuid: $postUuid) {
      ok
    }
  }
`;