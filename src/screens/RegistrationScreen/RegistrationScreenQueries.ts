import gql from 'graphql-tag';

export const GET_REGISTRATIONS = gql`
  query GetRegistrations($eventId: String!) {
    getRegistrations(eventId: $eventId) {
      registrations{
      id
      name
      registeredBy {
          id
          username
      }
      approved
      }
    }
  }
`;


export const APPROVE_REGISTRATION = gql`
  mutation ApproveRegistration($registrationId: String!) {
    approveRegistration(registrationId: $registrationId) {
      ok
    }
  }
`;

export const DISAPPROVE_REGISTRATION = gql`
  mutation DisapproveRegistration($registrationId: String!) {
    disapproveRegistration(registrationId: $registrationId) {
      ok
    }
  }
`;