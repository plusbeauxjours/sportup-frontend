import React from "react";
import { FlatList } from "react-native";
import { useQuery } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./UpcomingEventQueries";
import EventCard from "../../components/EventCard";
import { GetUpcomingEvents } from "../../types/api";
import Loader from "../../components/Loader";

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
    <FlatList
      data={events}
      renderItem={({ item }: any) => (
        <EventCard
          id={item.id}
          cover={item.coverImg}
          name={item.name}
          sport={item.sport}
          owner={item.owner}
          startDate={item.startDate}
          endDate={item.endDate}
          startTime={item.startTime}
          endTime={item.endTime}
        />
      )}
      keyExtractor={(item: any) => item.id.toString()}
    />
  );
};
UpcomingEvents.navigationOptions = ({ navigation }) => ({
  title: "Upcoming Events",
});
export default UpcomingEvents;
