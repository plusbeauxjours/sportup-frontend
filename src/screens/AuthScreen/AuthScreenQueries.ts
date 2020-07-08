import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $username: String!
    $password: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      username: $username
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        id
      }
    }
  }
`;
