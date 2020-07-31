import gql from "graphql-tag";

export const APPLE_CONNECT = gql`
  mutation AppleConnect(
    $firstName: String
    $lastName: String
    $email: String
    $appleId: String!
  ) {
    appleConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      appleId: $appleId
    ) {
      ok
      token
    }
  }
`;
