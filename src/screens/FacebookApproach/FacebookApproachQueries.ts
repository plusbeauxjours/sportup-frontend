import gql from "graphql-tag";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $firstName: String
    $lastName: String
    $email: String
    $fbId: String!
  ) {
    facebookConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      fbId: $fbId
    ) {
      token
    }
  }
`;
