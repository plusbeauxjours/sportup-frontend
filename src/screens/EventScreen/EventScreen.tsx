import React from "react";
import { ScrollView, Image, Alert, TouchableOpacity } from "react-native";
import { Headline, Caption, Button } from "react-native-paper";
import { useQuery } from "react-apollo";
// import { MapView } from 'expo';

import { MEDIA_URL } from "../../constants/urls";
import { formatDate, formatTime } from "../../utils/time";
import { GET_EVENT } from "./EventScreenQueries";
import RatingChip from "../../components/RatingChip";
import Loader from "../../components/Loader";

const EventScreen = ({ navigation }) => {
  const eventId = navigation.getParam("eventId");
  const {
    data: { getEvent: { event = null } = {} } = {},
    error,
    loading,
  } = useQuery(GET_EVENT, { variables: { eventId } });
  if (loading) {
    return <Loader />;
  }
  if (error) {
    Alert.alert("", error.message);
    return null;
  }
  return (
    <ScrollView>
      {event?.coverImg ? (
        <Image
          style={{ width: "100%", height: 150 }}
          source={{ uri: MEDIA_URL + event.coverImg }}
        />
      ) : null}
      <Headline>{event.name}</Headline>
      <RatingChip {...event.sport} onPress={() => {}} />
      <Caption>{event.description}</Caption>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserProfileScreen", { userId: event.owner.id });
        }}
      >
        <Caption>
          <Caption>Organized by{event.owner.name} </Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {event?.owner.username}
          </Caption>
        </Caption>
      </TouchableOpacity>
      {event?.startDate && (
        <Caption>
          <Caption>Event dates: from </Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {formatDate(event.startDate)}
          </Caption>
          {event.endDate && (
            <React.Fragment>
              <Caption> to </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatDate(event.endDate)}
              </Caption>
            </React.Fragment>
          )}
        </Caption>
      )}
      {event?.startTime && (
        <Caption>
          <Caption>Event day timings: from </Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {formatTime(event.startTime)}
          </Caption>
          {event.endTime && (
            <React.Fragment>
              <Caption> to </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatTime(event.endTime)}
              </Caption>
            </React.Fragment>
          )}
        </Caption>
      )}
      <Caption>
        <Caption style={{ fontWeight: "bold" }}>{event.expectedTeams}</Caption>
        <Caption> teams exptected.</Caption>
      </Caption>
      <Caption>
        <Caption>Minimum members per team: </Caption>
        <Caption style={{ fontWeight: "bold" }}>{event.minimumMembers}</Caption>
      </Caption>
      <Caption>
        <Caption>Maximum members per team: </Caption>
        <Caption style={{ fontWeight: "bold" }}>{event.maximumMembers}</Caption>
      </Caption>
      {/* <View style={StyleSheet.absoluteFillObject}>
        <MapView
          style={{
            ...StyleSheet.absoluteFillObject,
            height: 175,
          }}
          initialRegion={{
            ...groundLatLng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <MapView.Marker coordinate={groundLatLng} />
        </MapView>
        <Button
          icon="directions"
          raised
          color="#4a80f5"
          onPress={() => {}}
          style={{ position: "absolute", top: 145, right: 10 }}
        >
          Directions
        </Button>
      </View> */}
      {event.isOwner ? (
        <Button
          onPress={() => {
            navigation.navigate("RegistrationScreen", { eventId: event.id });
          }}
        >
          Manage registrations
        </Button>
      ) : (
        <Button
          onPress={() => {
            navigation.navigate("RegisterForEventScreen", {
              eventId: event.id,
              maximumMembers: event.maximumMembers,
              minimumMembers: event.minimumMembers,
            });
          }}
        >
          Register team
        </Button>
      )}
    </ScrollView>
  );
};
EventScreen.navigationOptions = ({ navigation }) => ({
  title: "Event",
});
export default EventScreen;
