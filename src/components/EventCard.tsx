import React from "react";
import { TouchableOpacity } from "react-native";
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
  return (
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

export default withNavigation(EventCard);
