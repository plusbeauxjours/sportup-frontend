import gql from 'graphql-tag';

export const UPDATE_USER = gql`
mutation UpdateUser(
  $firstName: String!
  $lastName: String!
  $bio: String!
  $password: String!
) {
  updateUser(
    firstName: $firstName
    lastName: $lastName
    bio: $bio
    password: $password
  ) {
    user {
        firstName
        lastName
        bio
    }
  }
}
`;
