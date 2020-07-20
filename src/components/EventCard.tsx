import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import RatingChip from "./RatingChip";
import { formatDate, formatTime } from "../utils/time";
import { Headline, Caption } from "react-native-paper";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  z-index: 1;
`;

const Event = styled.View<ITheme>`
  height: 250px;
  border-bottom-left-radius: 100px;
  margin-top: -100px;
  padding-top: 100px;
  overflow: hidden;
  border-width: 1px;
  border-color: red;
  background-color: white;
  z-index: ${(props) => props.length - props.index};
`;

interface ITheme {
  length: any;
  index: any;
}

const EventCard = ({ events, navigation }) => {
  console.log(events);
  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
        keyboardShouldPersistTaps="handled"
      >
        {events?.map((event, index) => (
          <Event length={events.length} index={index} key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EventScreen", { eventId: event.id });
              }}
            >
              <Headline>{event.name}</Headline>
            </TouchableOpacity>
            <RatingChip
              sportId={event.sport.sportId}
              name={event.sport.name}
              onChipPress={() => {}}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserProfileScreent", {
                  userId: event.owner.id,
                });
              }}
            >
              <Caption>
                <Caption>Organized by </Caption>
                <Caption style={{ fontWeight: "bold" }}>
                  {event.owner.name}
                </Caption>
              </Caption>
            </TouchableOpacity>
            <Caption>
              {event.startDate && (
                <React.Fragment>
                  <Caption>from </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatDate(event.startDate)}
                  </Caption>
                </React.Fragment>
              )}
              {event.endDate && (
                <React.Fragment>
                  <Caption> to </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatDate(event.endDate)}
                  </Caption>
                </React.Fragment>
              )}
              <Caption> | </Caption>
              {event.startTime && (
                <React.Fragment>
                  <Caption>from </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatTime(event.startTime)}
                  </Caption>
                </React.Fragment>
              )}
              {event.endTime && (
                <React.Fragment>
                  <Caption> to </Caption>
                  <Caption style={{ fontWeight: "bold" }}>
                    {formatTime(event.endTime)}
                  </Caption>
                </React.Fragment>
              )}
            </Caption>
          </Event>
        ))}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default withNavigation(EventCard);
