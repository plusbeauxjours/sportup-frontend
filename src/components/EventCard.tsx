import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import RatingChip from "./RatingChip";
import { formatDate, formatTime } from "../utils/time";
import { Card, Headline, Caption } from "react-native-paper";

const EventCard = ({
  id,
  cover,
  name,
  sport,
  owner,
  startDate,
  endDate,
  startTime,
  endTime,
  navigation,
}) => {
  const data = ["", "", ""];
  return (
    // <View style={styles.container}>
    //   {data.map((item, index) => (
    //     <View style={[styles.item, { zIndex: data.length - index }]}>
    //       <Text>jijiji</Text>
    //     </View>
    //   ))}
    // </View>
    <Card>
      {cover ? <Card.Cover source={{ uri: cover }} /> : null}
      <Card.Content>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventScreen", { eventId: id });
          }}
        >
          <Headline>{name}</Headline>
        </TouchableOpacity>
        <RatingChip
          sportId={sport.sportId}
          name={sport.name}
          onChipPress={() => {}}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserProfileScreent", { userId: owner.id });
          }}
        >
          <Caption>
            <Caption>Organized by </Caption>
            <Caption style={{ fontWeight: "bold" }}>{owner.name}</Caption>
          </Caption>
        </TouchableOpacity>
        <Caption>
          {startDate && (
            <React.Fragment>
              <Caption>from </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatDate(startDate)}
              </Caption>
            </React.Fragment>
          )}
          {endDate && (
            <React.Fragment>
              <Caption> to </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatDate(endDate)}
              </Caption>
            </React.Fragment>
          )}
          <Caption> | </Caption>
          {startTime && (
            <React.Fragment>
              <Caption>from </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatTime(startTime)}
              </Caption>
            </React.Fragment>
          )}
          {endTime && (
            <React.Fragment>
              <Caption> to </Caption>
              <Caption style={{ fontWeight: "bold" }}>
                {formatTime(endTime)}
              </Caption>
            </React.Fragment>
          )}
        </Caption>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  item: {
    height: 250,
    borderBottomLeftRadius: 100, // logic goes here
    marginTop: -100, // move container
    paddingTop: 100, // move inner item down
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
  },
});

export default withNavigation(EventCard);
