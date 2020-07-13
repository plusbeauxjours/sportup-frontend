import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";
import { useMutation } from "react-apollo";
import { useQuery } from "react-apollo-hooks";
import {
  GetRegistrations,
  GetRegistrationsVariables,
  ApproveRegistration,
  DisapproveRegistration,
} from "../../types/api";
import {
  GET_REGISTRATIONS,
  APPROVE_REGISTRATION,
  DISAPPROVE_REGISTRATION,
} from "./RegistrationScreenQueries";

export default ({ navigation }) => {
  const eventId = navigation.getParam("eventId");
  const {
    data: { getRegistrations: { registrations = null } = {} } = {},
    loading: getRegistrationsLoading,
  } = useQuery<GetRegistrations, GetRegistrationsVariables>(GET_REGISTRATIONS, {
    variables: { eventId },
  });
  const [
    approveRegistrationFn,
    { loading: approveRegistrationLoading },
  ] = useMutation<ApproveRegistration>(APPROVE_REGISTRATION, {});
  const [
    disapproveRegistrationFn,
    { loading: disapproveRegistrationLoading },
  ] = useMutation<DisapproveRegistration>(DISAPPROVE_REGISTRATION, {});
  const onPress = (registrationId, index, isApproved) => {
    if (isApproved) {
      disapproveRegistrationFn({
        variables: { registrationId },
        update(cache) {
          try {
            const data = cache.readQuery<
              GetRegistrations,
              GetRegistrationsVariables
            >({
              query: GET_REGISTRATIONS,
              variables: { eventId },
            });
            cache.writeQuery({
              query: GET_REGISTRATIONS,
              variables: {
                eventId: navigation.getParam("eventId"),
              },
              data: {
                ...data,
                getRegistrations: {
                  ...data.getRegistrations,
                  registrations: [
                    ...data.getRegistrations.registrations.slice(0, index),
                    {
                      ...data.getRegistrations.registrations[index],
                      approved: false,
                    },
                    ...data.getRegistrations.registrations.slice(index + 1),
                  ],
                },
              },
            });
          } catch (e) {
            console.log(e);
          }
        },
      });
    } else {
      approveRegistrationFn({
        variables: { registrationId },
        update(cache) {
          try {
            const data = cache.readQuery<
              GetRegistrations,
              GetRegistrationsVariables
            >({
              query: GET_REGISTRATIONS,
              variables: { eventId },
            });
            cache.writeQuery({
              query: GET_REGISTRATIONS,
              variables: {
                eventId: navigation.getParam("eventId"),
              },
              data: {
                ...data,
                getRegistrations: {
                  ...data.getRegistrations,
                  registrations: [
                    ...data.getRegistrations.registrations.slice(0, index),
                    {
                      ...data.getRegistrations.registrations[index],
                      approved: true,
                    },
                    ...data.getRegistrations.registrations.slice(index + 1),
                  ],
                },
              },
            });
          } catch (e) {
            console.log(e);
          }
        },
      });
    }
  };

  if (getRegistrationsLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <FlatList
      data={registrations}
      renderItem={({ item, index }) => (
        <ListItem
          key={item?.id}
          title={item?.name}
          subtitle={`Registered by ${item?.registeredBy.username}`}
          rightIcon={{
            name: "check",
            color: item?.approved ? "green" : "grey",
            onPress: () => onPress(item.id, index, item.approved),
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};