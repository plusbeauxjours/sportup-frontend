import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      user {
        id
        name
        firstName
        lastName
        username
        bio
        userImg
        sports {
          sportId
          name
        }
        teamsCount
        followersCount
        followingCount
        pushToken
        fbId
        appleId
      }
    }
  }
`;


export const MY_FEED = gql`
  query GetMyFeed($pageNum: Int) {
    getMyFeed(pageNum: $pageNum) {
      pageNum
      hasNextPage
      posts{
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

export const REGISTER_PUSH = gql`
  mutation RegisterPush($pushToken: String!) {
    registerPush(pushToken: $pushToken) {
      ok
    }
  }
`;