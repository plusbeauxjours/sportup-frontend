import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./UpcomingEventQueries";
import EventCard from "../../components/EventCard";

const UpcomingEvents = () => {
  return (
    <Query query={GET_UPCOMING_EVENTS} fetchPolicy="network-only">
      {({
        data: { getUpcomingEvents: { events = null } = {} } = {},
        loading,
      }) => {
        if (loading) {
          return <ActivityIndicator size="large" />;
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
      }}
    </Query>
  );
};

export default UpcomingEvents;
