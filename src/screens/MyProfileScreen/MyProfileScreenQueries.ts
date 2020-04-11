import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      user {
        uuid
        username
        firstName
        lastName
        bio
        userImg
        sports {
          sportUuid
          name
        }
        teamsCount
        followersCount
        followingCount
      }
    }
  }
`;


export const MY_FEED = gql`
  query GetMyFeed($pageNum: Int) {
    getMyFeed(pageNum: $pageNum) {
      posts{
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