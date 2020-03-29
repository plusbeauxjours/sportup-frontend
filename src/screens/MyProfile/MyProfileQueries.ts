import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      user {
        id
        username
        firstName
        lastName
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
  query MyFeed($pageNum: Int) {
    myFeed(pageNum: $pageNum) {
      posts{
      id
      text
      postImg
      createdAt
      score
      interaction
      postedBy {
        id
        username
        userImg
      }
      }
    }
  }
`;