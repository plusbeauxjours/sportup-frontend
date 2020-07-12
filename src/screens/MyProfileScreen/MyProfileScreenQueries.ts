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
      }
    }
  }
`;


export const MY_FEED = gql`
  query GetMyFeed($pageNum: Int) {
    getMyFeed(pageNum: $pageNum) {
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