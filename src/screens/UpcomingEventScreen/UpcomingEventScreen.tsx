import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { GET_UPCOMING_EVENTS } from "./UpcomingEventQueries";
import EventCard from "../../components/EventCard";
import { GetUpcomingEvents, GetUpcomingEventsVariables } from "../../types/api";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";
import { Appbar } from "react-native-paper";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const UpcomingEvents = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: {
      getUpcomingEvents: { events = null, hasNextPage, pageNum } = {},
    } = {},
    loading: getUpcomingEventsLoading,
    fetchMore: getUpcomingEventsFetchMore,
    networkStatus,
    refetch: getUpcomingEve1ntsRefetch,
  } = useQuery<GetUpcomingEvents, GetUpcomingEventsVariables>(
    GET_UPCOMING_EVENTS,
    {
      variables: { pageNum: 1 },
      fetchPolicy: "network-only",
    }
  );

  if (getUpcomingEventsLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <FlatList
        data={events}
        refreshing={networkStatus === 4}
        onRefresh={() => {
          getUpcomingEve1ntsRefetch({ pageNum: 1 });
        }}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
        renderItem={({ item, index }: any) => (
          <EventCard
            id={item.id}
            name={item.name}
            sport={item.sport}
            owner={item.owner}
            startDate={item.startDate}
            endDate={item.endDate}
            startTime={item.startTime}
            endTime={item.endTime}
          />
        )}
        onEndReached={() => {
          if (!loading && hasNextPage) {
            getUpcomingEventsFetchMore({
              variables: {
                pageNum: pageNum + 1,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (!fetchMoreResult.getUpcomingEvents) return prev;
                return Object.assign({}, prev, {
                  getUpcomingEvents: {
                    ...prev.getUpcomingEvents,
                    pageNum: fetchMoreResult.getUpcomingEvents.pageNum,
                    hasNextPage: fetchMoreResult.getUpcomingEvents.hasNextPage,
                    events: [
                      ...prev.getUpcomingEvents.events,
                      ...fetchMoreResult.getUpcomingEvents.events,
                    ],
                  },
                });
              },
            });
            setLoading(true);
          }
        }}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          setLoading(false);
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(event: any) => event.id.toString()}
      />
    </Container>
  );
};
UpcomingEvents.navigationOptions = ({ navigation }) => ({
  title: "Upcoming Events",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});

export default UpcomingEvents;
