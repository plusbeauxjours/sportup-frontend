import React from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { useQuery } from "react-apollo";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { MEDIA_URL } from "../../constants/urls";
import { formatDate, formatTime } from "../../utils/time";
import { GET_EVENT } from "./EventScreenQueries";
import RatingChip from "../../components/RatingChip";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";
import { PRIMARY_COLOR } from "../../constants/colors";
import utils from "../..//utils/utils";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 12px;
`;

const DateRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const DateBox = styled.View`
  flex-direction: column;
`;

const WhiteSpace = styled.View`
  height: 40px;
`;

const Description = styled.Text`
  width: 300px;
  text-align: center;
`;

const ContextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EventScreen = ({ navigation }) => {
  const isAndroid = utils.isAndroid();

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
    <Container>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
            height: "100%",
          }}
          source={require("../../../assets/roomDefault.jpeg")}
          // source={{ uri: MEDIA_URL + event.sport.sportImgUrl }}
          resizeMode="cover"
        />
      </BlurView>
      <ContextContainer>
        <NameText style={{ textTransform: "capitalize" }}>
          {event.name}
        </NameText>
        <WhiteSpace />
        <DateRow>
          <RatingChip
            sportId={event.sport.sportId}
            name={event.sport.name}
            onPress={() => {}}
          />
        </DateRow>
        <WhiteSpace />
        <Description>{event.description}</Description>
        <WhiteSpace />
        <DateBox>
          <DateRow>
            <Ionicons
              name={isAndroid ? "md-person" : "ios-person"}
              size={16}
              color={PRIMARY_COLOR}
              style={{ marginRight: 10 }}
            />
            <Caption>Organized by </Caption>
            <Caption>{event.owner.name}</Caption>
          </DateRow>
          <DateRow>
            {event?.startDate && (
              <>
                <Ionicons
                  name={isAndroid ? "md-calendar" : "ios-calendar"}
                  size={16}
                  color={PRIMARY_COLOR}
                  style={{ marginRight: 10 }}
                />
                <Caption>From </Caption>
                <Caption>{formatDate(event.startDate)}</Caption>
              </>
            )}
            {event?.endDate && (
              <>
                <Caption> To </Caption>
                <Caption>{formatDate(event.endDate)}</Caption>
              </>
            )}
          </DateRow>
          <DateRow>
            {event?.startTime && (
              <>
                <Ionicons
                  name={isAndroid ? "md-clock" : "ios-clock"}
                  size={16}
                  color={PRIMARY_COLOR}
                  style={{ marginRight: 10 }}
                />
                <Caption>From </Caption>
                <Caption>{formatTime(event.startTime)}</Caption>
              </>
            )}
            {event?.endTime && (
              <>
                <Caption> To </Caption>
                <Caption>{formatTime(event.endTime)}</Caption>
              </>
            )}
          </DateRow>
        </DateBox>
        <WhiteSpace />
        <Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {event.expectedTeams}
          </Caption>
          <Caption> teams exptected.</Caption>
        </Caption>
        <Caption>
          <Caption>Minimum members per team: </Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {event.minimumMembers}
          </Caption>
        </Caption>
        <Caption>
          <Caption>Maximum members per team: </Caption>
          <Caption style={{ fontWeight: "bold" }}>
            {event.maximumMembers}
          </Caption>
        </Caption>
        <WhiteSpace />
        {event.isOwner ? (
          <Button
            onPress={() => {
              navigation.navigate("RegistrationScreen", {
                eventId: event.id,
              });
            }}
            text={"Manage registrations"}
          />
        ) : (
          <Button
            onPress={() => {
              navigation.navigate("RegisterForEventScreen", {
                eventId: event.id,
                maximumMembers: event.maximumMembers,
                minimumMembers: event.minimumMembers,
              });
            }}
            text={"Register team"}
          />
        )}
      </ContextContainer>
    </Container>
  );
};
EventScreen.navigationOptions = () => ({
  title: "Event",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
  headerTransparent: true,
  headerBackground: () => (
    <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
  ),
});

export default EventScreen;
