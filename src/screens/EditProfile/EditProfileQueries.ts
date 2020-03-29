import gql from 'graphql-tag';

export const UPDATE_USER = gql`
mutation UpdateUser(
  $firstName: String!
  $lastName: String!
  $bio: String!
  $password: String!
  $userImg: Upload
) {
  updateUser(
    firstName: $firstName
    lastName: $lastName
    bio: $bio
    password: $password
    userImg: $userImg
  ) {
    user {
        firstName
        lastName
        bio
        userImg
    }
  }
}
`;
