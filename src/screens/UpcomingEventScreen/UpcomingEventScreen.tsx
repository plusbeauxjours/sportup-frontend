import React from "react";
import { FlatList } from "react-native";
import { useQuery } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./UpcomingEventQueries";
import EventCard from "../../components/EventCard";
import { GetUpcomingEvents } from "../../types/api";
import Loader from "../../components/Loader";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: white;
`;

const UpcomingEvents = () => {
  const {
    data: { getUpcomingEvents: { events = null } = {} } = {},
    loading,
  } = useQuery<GetUpcomingEvents>(GET_UPCOMING_EVENTS, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <EventCard events={events} />
    </Container>
  );
};
UpcomingEvents.navigationOptions = ({ navigation }) => ({
  title: "Upcoming Events",
});
export default UpcomingEvents;
